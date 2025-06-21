// #-----------------------#
// # Workspace Function    #
// #-----------------------#

import { Gtk } from "astal/gtk4"
import { WorkspaceUI, WindowUI } from "../../../widget/HyprlandUI"


// #-----------------------#
// # Content Box Function #
// #-----------------------#

function contentBox() {
    return (
      <box vertical spacing={10}>
        <label label="Pinned Apps" />
        <WindowUI.WindowListPinned />
        <Gtk.Separator visible />
        <label label="Window App List" />
        <Gtk.Separator visible />
        <WindowUI.WindowList />
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
// # Workspace UI          #
// #-----------------------#

export function Workspace() {
    return (
        <box setup={c => ref = c} cssName="BoxWidget" cssClasses={["WorkspaceWindow"]} spacing={10}>
            <WindowUI.WindowIcon onClicked={handlePopover} />
            <Gtk.Separator visible />
            <box onScroll={WorkspaceUI.onScrollWorkspace} vertical spacing={2} valign={3}>
                <box spacing={5}>
                    <WindowUI.WindowName cssName="WindowName" />
                    <Gtk.Separator visible />
                    <WindowUI.WindowTitle cssName="WindowTitle" />
                </box>
                <box spacing={6} halign={3} valign={3}>
                    <WorkspaceUI.Workspace />
                </box>
            </box>
        </box>
    )
}
