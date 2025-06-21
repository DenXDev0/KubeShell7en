import { exec, execAsync, subprocess } from "astal/process";
import { GLib, Gio, Variable } from "astal";

const recordDir = `${GLib.get_home_dir()}/Videos/ScreenRecord/`;

const getTimestamp = () => GLib.DateTime.new_now_local().format("%Y-%m-%d_%H-%M-%S");

const formatDurationDynamic = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const min = Math.floor((seconds % 3600) / 60);
    const sec = seconds % 60;

    const pad = (n) => String(n).padStart(2, "0");

    return hrs > 0
        ? `${pad(hrs)}:${pad(min)}:${pad(sec)}`
        : `${pad(min)}:${pad(sec)}`;
};

export const ScreenRecord = {
    recordStatus: Variable(false),
    audio: Variable(false),
    modeSelection: Variable(false),
    elapsedTime: Variable("00:00"),

    format: Variable("mkv"),
    _formatList: ["mkv", "mp4", "webm"],
    _formatCurrentIndex: 0,

    _process: null,
    _timerId: null,

    _startRecordingInterval() {
        const startTime = GLib.get_monotonic_time(); 

        this._timerId = setInterval(() => {
            const elapsed = Math.floor((GLib.get_monotonic_time() - startTime) / 1000000);
            this.elapsedTime.set(formatDurationDynamic(elapsed));
        }, 1000);
    },

    _stopRecordingInterval() {
        clearInterval(this._timerId);
        this._timerId = null;
    },

    _stopProcess() {
        this._process.signal(2);
        this._stopRecordingInterval();
        this._process = null;
        this.elapsedTime.set("00:00");
    },

    async Record(btn) {
        if (btn.active) {
            const filePath = `${recordDir}Record_${getTimestamp()}.${this.format.get()}`;

            const args = ["wf-recorder", "-f", filePath];
            if (this.audio.get()) {
                args.push("-a");
            }

            if (this.modeSelection.get()) {
                try {
                    const geometry = await execAsync("slurp");
                    args.push("-g", geometry);
                } catch {
                    console.error("Selection Cancelled");
                    btn.set_active(false);
                    return;
                }
            }

            this._process = subprocess(args);
            this.recordStatus.set(true);
            this._startRecordingInterval();

            console.log("▶️ Mulai merekam:", filePath);
        } else if (this._process) {
            this._stopProcess();
            this.recordStatus.set(false);
            console.log("⏹ Rekaman dihentikan.");
        }
    },

    AudioModeToggle(btn) {
        if (btn.active) {
            this.audio.set(true);
        } else {
            this.audio.set(false);
        }
    },

    formatSelect() {
        this._formatCurrentIndex = (this._formatCurrentIndex + 1) % this._formatList.length;
        const nextFormat = this._formatList[this._formatCurrentIndex];
        this.format.set(nextFormat);
    }
};
