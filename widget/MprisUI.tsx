import { astalify, Gtk } from "astal/gtk4";
import { bind, Gio } from "astal";
import { Mpris } from "../Services/Mpris";
import { GioAppIcon } from "../utils/Helpers/GioAppIcon";

// Astalify Picture component for easier usage
const Picture = astalify(Gtk.Picture);

// #---------------------#
// # Mpris UI Components #
// #---------------------#
function formatTime(seconds: number): string {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec.toString().padStart(2, '0')}`;
}

export const MprisUI = {
  // #---------------------#
  // # Track Information UI #
  // #---------------------#

  Title: (props) => bind(Mpris).as(mp => (
    <label label={mp.title} {...props} />
  )),

  Artist: (props) => bind(Mpris).as(mp => (
    <label label={mp.artist} {...props} />
  )),

  Cover: (props) => bind(Mpris).as(mp => (
    <image file={mp.coverArt} {...props} />
  )),

  // #------------------------#
  // # Playback Control UI    #
  // #------------------------#

  PlayPause: (props) => bind(Mpris).as(mp => (
    <button sensitive={mp.canControl} onClicked={mp.playPause} {...props}>
      <image iconName={mp.playbackStatus.as(p => p ? "media-playback-pause-symbolic" : "media-playback-start-symbolic")} />
    </button>
  )),

  Prev: (props) => bind(Mpris).as(mp => (
    <button sensitive={mp.canGoPrevious} onClicked={mp.previousTrack} {...props}>
      <image iconName="media-skip-backward-symbolic" />
    </button>
  )),

  Next: (props) => bind(Mpris).as(mp => (
    <button sensitive={mp.canGoNext} onClicked={mp.nextTrack} {...props}>
      <image iconName="media-skip-forward-symbolic" />
    </button>
  )),

  SeekBack: (props) => bind(Mpris).as(mp => (
    <button sensitive={mp.canSeek} onClicked={() => mp.seek(mp.player?.get_position() - 10)} {...props}>
      <image iconName="media-seek-backward-symbolic" />
    </button>
  )),

  SeekForw: (props) => bind(Mpris).as(mp => (
    <button sensitive={mp.canSeek} onClicked={() => mp.seek(mp.player?.get_position() + 10)} {...props}>
      <image iconName="media-seek-forward-symbolic" />
    </button>
  )),

  // #------------------------#
  // # Playback Settings UI   #
  // #------------------------#

  Slider: (props) => bind(Mpris).as(mp => (
    <slider widthRequest={100} sensitive={mp.canSeek} value={mp.position} max={mp.length} onButtonReleased={self => mp.seek(self.value)} {...props}/>
  )),

  TrackTimePosition: (props) => bind(Mpris).as(mp => (
    <label label={mp.position.as(formatTime)} {...props}/>
  )),


  TrackTimeLenght: (props) => bind(Mpris).as(mp => (
    <label label={mp.length.as(formatTime)} {...props}/>
  )), 

  // Shuffle control UI
  Shuffle: (props) => bind(Mpris).as(mp => (
    <button 
      // 
      onClicked={mp.toggleShuffle} 
      sensitive={mp.shuffleStatus.as(s => s === 0 ? false : true)} 
      cssClasses={mp.shuffleStatus.as(s => s === 1 ? ["shuffle-ON"] : ["shuffle-OFF"])}
      {...props}
    >
      <image iconName="media-playlist-shuffle-symbolic" />
      {/* <label label={mp.shuffleStatus.as(s => s === 1 ? "ON" : "OFF")} /> */}
    </button>
  )),

  // Loop control UI
  Loop: (props) => bind(Mpris).as(mp => (
    <button 
      // 
      onClicked={mp.toggleLoop} 
      sensitive={mp.loopStatus.as(l => l === 0 ? false : true)} 
      cssClasses={mp.loopStatus.as(l => {
        if (l === 0) return ["loop-None"]
        if (l === 1) return ["loop-None"]
        if (l === 2) return ["loop-Track"]
        if (l === 3) return ["loop-Playlist"]
      })}
      {...props}
    >
      <image iconName={mp.loopStatus.as(l => l == 2 ? "media-playlist-repeat-song-symbolic" : "media-playlist-repeat-symbolic")} />
    </button>
  )),

  // #------------------------#
  // # Player Selection UI    #
  // #------------------------#
  SelectPlayer: (props) => bind(Mpris).as(mp => (
    <menubutton direction={1} iconName={mp.identity} {...props} tooltipText={mp.identity}>
      <popover hasArrow={false}>
        <box vertical>
          {mp.playersList.map((p, i) => (
            <button
            onClicked={() => mp.selectPlayer(i)}
            tooltipText={p.identity}
            >
              <image iconName={p.identity} />
            </button>
          ))}
        </box>
      </popover>
    </menubutton>
  )),

  // Volume
  Volume: (props) => bind(Mpris).as(mp => (
    <menubutton direction={1} iconName="audio-speakers-symbolic" {...props} >
      <popover hasArrow={false}>
        <box vertical>
          <slider 
            setup={self => self.set_format_value_func((_, value) => `${Math.round(value * 100)}%`)}
            drawValue 
            valuePos={3} 
            inverted 
            orientation={1} 
            sensitive={mp.isAvailable} 
            value={mp.volume} 
            onMotion={self => mp.setVolume(self.value)} 
            heightRequest={150} 
            />
        </box>
      </popover>
    </menubutton>
  )),

};
