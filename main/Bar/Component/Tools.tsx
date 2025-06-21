// #-----------------------#
// # Shortcut Function     #
// #-----------------------#

import { astalify, Gtk, Gdk } from "astal/gtk4"
import { GLib, Gio } from "astal"
import { TrayUI } from "../../../widget/TrayUI"
import { EmojiUI } from "../../../widget/EmojiUI"
import { TextViewUI } from "../../../widget/TextViewUI"
import { ClipboardUI } from "../../../widget/ClipboardUI"
import { ToolsUI } from "../../../widget/ToolsUI"
import { ScreenshotUI } from "../../../widget/ScreenshotUI"
import { ScreenRecordUI } from "../../../widget/ScreenRecordUI"
import { ColorPickerUI } from "../../../widget/ColorPickerUI"

// #-----------------------#
// # Content Box Function  #
// #-----------------------#

function contentBox() {
    return (
      <box spacing={10} cssClasses={["ContentBox", "Shorcut"]}>
        <box vertical spacing={10}>
            <box cssName="WidgetBox" vertical>
                <label cssName="WidgetLabel" label="Screenshot"/>
                <box halign={3} cssName="WidgetBoxChild" spacing={5}>
                    <ScreenshotUI.ScreenSS />
                    <ScreenshotUI.SelectSS />
                    <ScreenshotUI.TimerSS />
                </box>
            </box>
            <box cssName="WidgetBox" vertical>
                <label cssName="WidgetLabel" label="ScreenRecord" />
                <box halign={3} cssName="WidgetBoxChild" spacing={5} vertical>
                    <box>
                        <ScreenRecordUI.AudioMode />
                        <ScreenRecordUI.RecordButton2 />
                        <ScreenRecordUI.TimeLabel />
                    </box>
                    <centerbox>
                        <ScreenRecordUI.ModeRecord />
                        <button label="Codec" />
                        <ScreenRecordUI.Format />
                    </centerbox>
                </box>
            </box>
            <box cssName="WidgetBox" vertical>
                <label cssName="WidgetLabel" label="Color Picker" />
                <box halign={3} cssName="WidgetBoxChild" spacing={5}>
                    <ColorPickerUI.ColorPickerPopover />
                    <button iconName="color-select-symbolic" />
                    <ColorPickerUI.ButtonColor />
                </box>
            </box>  
        </box>
        <Gtk.Separator />
        <label label="Todo Calculator" />
      </box>
    )
}

// #-----------------------#
// # Handle Popover Toggle #
// #-----------------------#

let ref: Gtk.Widget

const handlePopover = () => {
    PopoverStore.toggle(ref, contentBox())
}

// #-----------------------#
// # Shortcut UI           #
// #-----------------------#

let indexStack = 0;

const stackVisible = (self, state) => {
    if (state.get_button() === 3) {
        const childName = ["ScreenShoot", "ScreenRecorder", "ColorPicker"];
        indexStack = (indexStack + 1) % childName.length;

        self.set_visible_child_name(childName[indexStack]);
    }
} 

export function Tools() {
    return (
        <box setup={self => ref = self} cssName="BoxWidget" cssClasses={["Shorcut"]} spacing={5}>
            <button iconName="go-up-symbolic" onClicked={handlePopover} />
            <Gtk.Separator visible />
            <stack 
            onButtonPressed={(self, state) => stackVisible(self, state)}
            transitionType={4}
            >
                <box name="ScreenShoot" cssName="WidgetBoxChild">
                    <ScreenshotUI.ScreenSS />
                    <ScreenshotUI.SelectSS />
                    <ScreenshotUI.TimerSS />
                </box>
                <box name="ScreenRecorder" cssName="WidgetBoxChild">
                    <ScreenRecordUI.ModeRecord />
                    <ScreenRecordUI.RecordButton2 />
                    <ScreenRecordUI.TimeLabel />
                </box>
                <box name="ColorPicker" cssName="WidgetBoxChild">
                    <button iconName="color-select-symbolic" />
                    {/* <ColorPickerUI.ColorPickerPopover /> */}
                    <ColorPickerUI.ButtonColor />
                    <button label="#FFA348" />
                </box>
            </stack>
            <Gtk.Separator visible />
            <ClipboardUI.ButtonClipboard />
            {/* <TextViewUI.ButtonPopover /> */}
            <EmojiUI.ButtonPopover />
            <TrayUI.Tray />
        </box>
    )
}
