import { Gtk, Gdk } from "astal/gtk4"

let ref: Gtk.Widget
let popoverRef: Gtk.Popover

const handlePopover = () => {
    const alloc = ref.get_allocation()

    popoverRef.set_pointing_to(alloc)
    popoverRef.popup()
}

export function Menu() {
    return (
        <box>

            <box cssName="BoxWidget" >
            <popover
                setup={c => popoverRef = c}
                autohide={true}
            >
                <box>
                    <button label="Testing" />
                    <label label="Testing" />
                </box>
            </popover>
                <button onClicked={handlePopover} >
                    <image iconName="system-search" />
                </button>``
                <button setup={c => ref = c}>
                    <image iconName="start-here" />
                </button>
            </box>
        </box>
    )
}
