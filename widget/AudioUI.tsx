// #-------------------#
// #  Audio Control    #
// #-------------------#
import { Gtk, Gdk } from "astal/gtk4";
import { bind, Variable, Gio } from "astal";
import Wp from "gi://AstalWp";

// #----------------------#
// #  Speaker & Volume    #
// #----------------------#
const speaker = Wp.get_default().audio.defaultSpeaker!;

const isHovered = Variable(false);

// #------------------------#
// #  Audio UI Components  #
// #------------------------#
export const AudioUI = {
  // #-----------------------#
  // #  Scroll Volume Logic  #
  // #-----------------------#
  handleScrollVolume: (_, dx, dy) => {
    const step = 0.01;
    const delta = dy < 0 ? step : -step;
    speaker.volume = Math.max(0, Math.min(1, speaker.volume + delta));
    return true;
  },

  // #-----------------------#
  // #  Volume Button        #
  // #-----------------------#
  VolumeButton: (props) => (
    <button onScroll={AudioUI.handleScrollVolume} {...props}>
      <image
        iconName={bind(speaker, "volumeIcon")}
        tooltipText={bind(speaker, "volume").as(String)}
      />
    </button>
  ),

  // #-----------------------#
  // #  Volume Slider        #
  // #-----------------------#
  VolumeSlider: (props) => (
    <slider
      widthRequest={100}
      onMotion={({ value }) => speaker.volume = value}
      value={bind(speaker, "volume")}
      onScroll={AudioUI.handleScrollVolume}
      {...props}
    />
  ),

  // #-----------------------#
  // #  Volume Revealer      #
  // #-----------------------#
  VolumeRevealer: ({ child }) => (
    <box
      onHoverEnter={() => isHovered.set(true)}
      onHoverLeave={() => isHovered.set(false)}
    >
      {AudioUI.VolumeButton()}
      <revealer
        revealChild={bind(isHovered)}
        transitionDuration={500}
        transitionType={Gtk.RevealerTransitionType.SLIDE_RIGHT}
      >
        {AudioUI.VolumeSlider()}
      </revealer>
    </box>
  )
};
