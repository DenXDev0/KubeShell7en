// #-------------------#
// #  Network Stats   #
// #-------------------#
import { Variable, GLib, bind } from "astal";

const IGNORED_INTERFACES = /^(lo|ifb\d+|lxdbr\d+|virbr\d+|br\d+|vnet\d+|tun\d+|tap\d+)$/;

let lastStats = {
  downBytes: 0,
  upBytes: 0,
  timestamp: GLib.get_monotonic_time()
};

// #---------------------------#
// #  Parse Network Statistics #
// #---------------------------#
const parseNetworkStats = (content: string) => {
  const now = GLib.get_monotonic_time();
  const elapsedSec = (now - lastStats.timestamp) / 1_000_000;
  lastStats.timestamp = now;

  let currentDown = 0;
  let currentUp = 0;

  content.split("\n").forEach(line => {
    const fields = line.trim().split(/\s+/);
    if (fields.length < 10) return;

    const down = Number(fields[1]);
    const up = Number(fields[9]);

    if (!isNaN(down)) currentDown += down;
    if (!isNaN(up)) currentUp += up;
  });

  const downSpeed = (currentDown - lastStats.downBytes) / elapsedSec;
  const upSpeed = (currentUp - lastStats.upBytes) / elapsedSec;

  lastStats = { 
    downBytes: currentDown, 
    upBytes: currentUp, 
    timestamp: now 
  };

  return { 
    download: downSpeed, 
    upload: upSpeed 
  };
};

// #-----------------#
// #  Network Poll  #
// #-----------------#
const networkSpeed = Variable({ download: 0, upload: 0 })
.poll(1000, ["cat", "/proc/net/dev"], parseNetworkStats);

// #-----------------#
// #  Format Speed  #
// #-----------------#
const formatSpeed = (bytesPerSec: number): string => {
  const units = ["B/s", "kB/s", "MB/s", "GB/s"];
  let speed = bytesPerSec;
  let unitIndex = 0;

  while (speed >= 1024 && unitIndex < units.length - 1) {
    speed /= 1024;
    unitIndex++;
  }

  return `${speed.toFixed(1)} ${units[unitIndex]}`;
};

// #---------------------#
// #  Reactive Binding   #
// #---------------------#
export const speedLabel = bind(networkSpeed).as(({ download, upload }) => {
  const isDownload = download >= upload;
  const speed = isDownload ? download : upload;
  const symbol = isDownload ? "↓" : "↑";

  return `${formatSpeed(speed)} ${symbol}`;
});
