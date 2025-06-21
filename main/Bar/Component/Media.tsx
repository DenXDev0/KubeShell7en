
import { Gtk } from "astal/gtk4"
import { MprisUI } from "../../../widget/MprisUI"
import { CavaUI } from "../../../widget/CavaUI"

// #-----------------------#
// # Media Function        #
// #-----------------------#

const maxWidthChars = 25

// #-----------------------#
// # Content Box for Popover #
// #-----------------------#

const content = (
    <box vertical cssClasses={["ContentBox", "MediaPlayer"]} widthRequest={260}>
      <MprisUI.Cover cssName="CoverMpris" />
      <box vertical valign={3} spacing={2}>
        <MprisUI.Artist cssName="ArtistMpris" maxWidthChars={maxWidthChars} ellipsize={3} />
        <MprisUI.Title cssName="TitleMpris" maxWidthChars={maxWidthChars} ellipsize={3} />
      </box>
      <MprisUI.Slider />
      <centerbox marginBottom={10}>
        <box>
            <MprisUI.SeekBack />
            <MprisUI.SeekForw />
        </box>
        <box>
            <MprisUI.TrackTimePosition />
            <label label=" / " />
            <MprisUI.TrackTimeLenght />
        </box>
        <box>
            <MprisUI.Shuffle />
            <MprisUI.Loop />
        </box>
      </centerbox>
      <centerbox cssName="ControlMpris" spacing={5}>
        <box>
            <MprisUI.Volume />
        </box>
        <box>
            <MprisUI.Prev />
            <MprisUI.PlayPause />
            <MprisUI.Next />
        </box>
        <box>
            <MprisUI.SelectPlayer />
        </box>
      </centerbox>
    </box>
)  

let ref: Gtk.Widget

// #-----------------------#
// # Handle Popover Toggling #
// #-----------------------#

const handlePopover = () => {
    PopoverStore.toggle(ref, content)
}

// #-----------------------#
// # Media Function for UI  #
// #-----------------------#

export function Media() {
    return (
        <box setup={self => ref = self} cssName="BoxWidget" cssClasses={["Media"]} spacing={5}>
            <box onButtonReleased={handlePopover}>
                <MprisUI.Cover cssName="CoverMpris" />
                <box vertical valign={3} spacing={2}>
                    <MprisUI.Title cssName="TitleMpris" maxWidthChars={maxWidthChars} ellipsize={3} xalign={0} />
                    <MprisUI.Artist cssName="ArtistMpris" maxWidthChars={maxWidthChars} ellipsize={3} xalign={0} />
                </box>
            </box>
            <Gtk.Separator visible />
            {/* <MprisUI.SelectPlayer /> */}
            <CavaUI.CavaButton />
            <CavaUI.Stack>
                <box name="ControlMpris" cssName="ControlMpris">
                    <MprisUI.Prev />
                    <MprisUI.PlayPause />
                    <MprisUI.Next />
                </box>
                <box name="CavaBox" cssName="CavaBox">
                    <CavaUI.CavaBar cssName="CavaBar" />
                </box>
            </CavaUI.Stack>
        </box>
    )
}
