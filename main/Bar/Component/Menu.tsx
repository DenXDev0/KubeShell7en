// #-----------------------#
// # Menu Function         #
// #-----------------------#

import { App, Gtk } from "astal/gtk4"
import { Variable, bind } from "astal"
import { LauncherUI, LauncherUISharing } from "../../../widget/LauncherUI"

let ref: Gtk.Widget

// #-----------------------#
// # Handle Popover Toggle  #
// #-----------------------#

const LauncherBox = <LauncherUI.Applauncher />

const handlePopover = () => {
    PopoverStore.toggle(ref, LauncherBox)
}

let launcherInstance = null;
export const handlePopover2 = () => {
    if (!launcherInstance) {
        launcherInstance = LauncherUI.Applauncher();
    }

    PopoverStore.toggle(ref, launcherInstance);
};

// #-----------------------#
// # Handle SideBar Toggle  #
// #-----------------------#

const onClickSideBar = () => {
    App.toggle_window("SideBarLeft")
}

// #-----------------------#
// # Menu UI                #
// #-----------------------#

export function Menu() {
    return (
        <box setup={self => ref = self} cssName="BoxWidget" cssClasses={["MenuButton"]} spacing={5}>
            <button onClicked={onClickSideBar} >
                <image iconName="system-search" />
            </button>
            <Gtk.Separator visible />
            <button onClicked={handlePopover}>
                <image iconName="start-here" />
            </button>
            <Gtk.Separator visible />
            <button >
                <image iconName="preferences-desktop-keyboard-shortcuts-symbolic" />
            </button>
        </box>
    )
}
