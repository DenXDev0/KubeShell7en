// #-------------------#
// #  Battery Control  #
// #-------------------#
import { Gtk, Gdk } from "astal/gtk3";
import { bind, Variable, Gio } from "astal";

import Battery from "gi://AstalBattery";

// #-------------------#
// #  Battery Data     #
// #-------------------#
const bat = Battery.get_default();

const batteryIconName = bind(bat, "batteryIconName");

const percentValue = bind(bat, "percentage");
const percentText = percentValue.as((p) => `${Math.floor(p * 100)} %`);

function formatTime(sec) {
  if (sec <= 0) return ".......";
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  return `${h}h ${m}m`;
}

const timeToFull = bind(bat, "timeToFull").as(formatTime);
const timeToEmpty = bind(bat, "timeToEmpty").as(formatTime);

const state = bind(bat, "state");

// #--------------------#
// #  Battery UI Export#
// #--------------------#
// #--------------------#
// # Battery Components #
// #--------------------#
export const BatteryUI = {

  Percent: (props) => <label label={percentText} {...props} />,

  TimeToFull: (props) => (
    <label visible={state.as((e) => e === 1 ? true : false)} label={timeToFull} {...props} />
  ),

  TimeToEmpty: (props) => (
    <label visible={state.as((e) => e === 2 ? true : false)} label={timeToEmpty} {...props} />
  ),

  StatusFull: (props) => (
    <label visible={state.as((e) => e === 4 ? true : false)} label="Bat.Full" {...props} />
  ),

  ButtonIcon: (props) => (
    <button {...props}>
      <image iconName={batteryIconName} />
    </button>
  ),
};
