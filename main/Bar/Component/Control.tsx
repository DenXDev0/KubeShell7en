// #-----------------------#
// # Control Component     #
// #-----------------------#

import { Gtk } from "astal/gtk4";
import { InternetUI } from "../../../widget/InternetUI";
import { BluetoothUI } from "../../../widget/BluetoothUI";
import { AudioUI } from "../../../widget/AudioUI";
import { DisplayUI } from "../../../widget/DisplayUI";
import { BatteryUI } from "../../../widget/BatteryUI";
import { PanelUI } from "../../../widget/PaneUI";

// #-----------------------#
// # Content Box Function  #
// #-----------------------#

function contentBox() {
    return (
      <box vertical spacing={10} widthRequest={300}>
        <button label="Todo Control" />
        <button label="Content" />
      </box>
    )
}

// #-----------------------#
// # Popover Handling      #
// #-----------------------#

let ref: Gtk.Widget

const handlePopover = () => {
    PopoverStore.toggle(ref, contentBox())
}

// #-----------------------#
// # Control Function      #
// #-----------------------#

export function Control() {
    return (
        <box setup={self => ref = self} cssName="BoxWidget" cssClasses={["Control"]} valign={3}>
            {/* Internet Section */}
            <box vertical widthRequest={75} valign={3}>
                <InternetUI.netSpeed cssName="NetSpeed" />
                <Gtk.Separator visible />
                <InternetUI.WifiTitle cssName="WifiTitle" />
            </box>

            {/* System Controls Section */}
            <box spacing={5} cssName="ControlSystem">
                <InternetUI.WifiButton onClicked={handlePopover} />
                <BluetoothUI.Bluetooth onClicked={handlePopover} />
                <AudioUI.VolumeButton onClicked={handlePopover} />
                <DisplayUI.BrightnessButton onClicked={handlePopover} />
                {/* <AudioUI.VolumeRevelear /> */}
                {/* <DisplayUI.DisplayRevelear /> */}
                <Gtk.Separator visible />
            </box>

            {/* Battery Information Section */}
            <box vertical valign={3} widthRequest={45}>
                <BatteryUI.Percent cssName="BattPercent" />
                <Gtk.Separator visible />
                <BatteryUI.TimeToEmpty cssName="BattTimeToEmpty" />
                <BatteryUI.TimeToFull cssName="BattTimeTofull" />
                <BatteryUI.StatusFull cssName="BattStatusFull" />
            </box>

            {/* Battery Icon Button */}
            <BatteryUI.ButtonIcon cssClasses={["BattButtonIcon"]} onClicked={handlePopover} />

            {/* Panel Section */}
            <PanelUI.PanelButton cssClasses={["PanelButton"]} />
        </box>
    )
}
