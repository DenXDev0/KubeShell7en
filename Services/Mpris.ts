import { Variable, bind } from "astal";
import AstalMpris from "gi://AstalMpris";

// ============================
// # Mpris Player Initialization
// ============================

const mpris = AstalMpris.get_default();
const players = bind(mpris, "players");
const playerSelect = Variable(0);

// ============================
// # Constants & Defaults
// ============================

const DEFAULT_COVER_ART = `background-color: #444`;
const UNKNOWN_TITLE = "Unknown Title";
const UNKNOWN_ARTIST = "Unknown Artist";
const NOTHING_PLAYING = "Nothing Playing";
const NO_ARTIST = "No Artist";

// ============================
// # Null Player Defaults
// ============================

// ============================
// # Null Player Defaults
// ============================

const nullPlayer = {
    // Player & Player List Information
    player: null,
    playersList: [],
    isAvailable: false,
    
    // Track Information (Title, Artist, Cover Art)
    title: NOTHING_PLAYING,
    artist: NO_ARTIST,
    coverArt: DEFAULT_COVER_ART,
    
    // Control Flags
    canControl: false,
    canGoPrevious: false,
    canGoNext: false,
    playIcon: "media-playback-start-symbolic",  // Icon for play/pause

    // Playback Status & Controls
    playbackStatus: bind(Variable(false)),
    playPause: () => {},
    nextTrack: () => {},
    previousTrack: () => {},

    // Shuffle & Loop Controls
    shuffleStatus: bind(Variable(0)),
    toggleShuffle: () => {},
    loopStatus: bind(Variable(0)),
    toggleLoop: () => {},
    
    // Seek & Position Controls
    canSeek: false,
    position: bind(Variable(0)),
    length: bind(Variable(0)),
    seek: (value: number) => {},

    // Volume
    volume: bind(Variable(0)),
    setVolume: (index: number) => {},
    
    // Player Selection Function
    identity: "application-x-executable-symbolic",
    selectPlayer: (index: number) => {},
};


// ============================
// # Utility Functions
// ============================

const shuffle = (player: AstalMpris.Player) => {
    const current = player.get_shuffle_status();
    player.set_shuffle_status(
      current === AstalMpris.Shuffle.ON
        ? AstalMpris.Shuffle.OFF
        : AstalMpris.Shuffle.ON
    );
};

const loop = (player: AstalMpris.Player) => {
    const current = player.get_loop_status();
    player.set_loop_status({
      [AstalMpris.Loop.NONE]: AstalMpris.Loop.TRACK,
      [AstalMpris.Loop.TRACK]: AstalMpris.Loop.PLAYLIST,
      [AstalMpris.Loop.PLAYLIST]: AstalMpris.Loop.NONE,
    }[current] ?? AstalMpris.Loop.NONE);
};

// ============================
// # Player Binding Logic
// ============================

export const Mpris = Variable.derive([players, playerSelect], (playersList, plySel) => {
    if (playersList.length === 0) return nullPlayer;

    const player = playersList[plySel];

    return {
        player,
        playersList,
        isAvailable: true,
        
        // Title & Artist Information
        title: bind(player, "title").as(t => t?.trim() || UNKNOWN_TITLE),
        artist: bind(player, "artist").as(a => a?.trim() || UNKNOWN_ARTIST),
        coverArt: bind(player, "coverArt").as(c => c?.trim() || DEFAULT_COVER_ART),
        
        // Control Flags
        canControl: bind(player, "canControl"),
        canGoPrevious: bind(player, "canGoPrevious"),
        canGoNext: bind(player, "canGoNext"),

        // Playback Control
        playbackStatus: bind(player, "playbackStatus").as(status => status === AstalMpris.PlaybackStatus.PLAYING),
        playPause: () => player.play_pause(),
        nextTrack: () => player.next(),
        previousTrack: () => player.previous(),
        
        // 🎵 Shuffle & Loop Control
        shuffleStatus: bind(player, "shuffleStatus"),
        toggleShuffle: () => shuffle(player),

        loopStatus: bind(player, "loopStatus"),
        toggleLoop: () => loop(player),

        // Slider/Seek Control
        canSeek: bind(player, "canSeek"),
        position: bind(player, "position"),
        length: bind(player, "length"),
        seek: (value: number) => player.set_position(value),

        // Volume
        volume: bind(player, "volume"),
        setVolume: (value: number) => player.set_volume(value),

        // Player Identity & Selection
        identity: bind(player, "identity"),
        selectPlayer: (index: number) => playerSelect.set(index),
    };
});
