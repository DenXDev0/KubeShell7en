// #-----------------------#
// # Workspace Function    #
// #-----------------------#

import { Gtk } from "astal/gtk4"
import { WorkspaceUI, WindowUI } from "../../../widget/HyprlandUI"


// #-----------------------#
// # Content Box Function #
// #-----------------------#

function Flowbox({ child, ...props }) {
    return (
    <GtkFlowBox
    accept-unpaired-release={true}
    activate-on-single-click={false}
    homogeneous={true}
    // min-children-per-line={2}
    
    // row-spacing={10}
    // column-spacing={10}
    selection-mode={0}
    {...props}
    >
        {child}
    </GtkFlowBox>
)
}

function ContentBox() {
    return (
        <box vertical spacing={10}>
            <label label="Pinned Apps" />
            <Flowbox
            max-children-per-line={6}
            row-spacing={10}
            column-spacing={10}
            >
                <WindowUI.WindowListPinned />
            </Flowbox>
            <Gtk.Separator visible />
            <label label="Window App List" />
            <Flowbox
            max-children-per-line={6}
            >
                <WindowUI.WindowList />
            </Flowbox>
        </box>
    );
}


// #-----------------------#
// # Handle Popover Toggle #
// #-----------------------#

let ref: Gtk.Widget

const handlePopover = () => {
    PopoverStore.toggle(ref, ContentBox())
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
