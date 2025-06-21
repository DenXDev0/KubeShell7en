// #-----------------------#
// # Main Bar Component    #
// #-----------------------#

import { App, Astal, Gtk, Gdk } from "astal/gtk4"
import { Variable } from "astal"

// #-----------------------#
// # Import Components     #
// #-----------------------#

import { Menu } from "./Component/Menu"
import { Workspace } from "./Component/Workspace"
import { Media } from "./Component/Media"
import { Calendar } from "./Component/Calendar"
import { Shorcut, Tools } from "./Component/Tools"
import { Control } from "./Component/Control"

// #-----------------------#
// # Bar Component Function#
// #-----------------------#

export default function Bar(gdkmonitor: Gdk.Monitor) {
    const { BOTTOM, LEFT, RIGHT } = Astal.WindowAnchor

    return (
        <window
            visible
            cssClasses={["Bar"]}
            gdkmonitor={gdkmonitor}
            exclusivity={Astal.Exclusivity.EXCLUSIVE}
            anchor={BOTTOM | LEFT | RIGHT}
            application={App}
        >
            <box halign={3} expand>
                <Menu />
                <Workspace />
                <Media />
                <Calendar />
                <Tools />
                <Control />
            </box>
        </window>
    )
}
