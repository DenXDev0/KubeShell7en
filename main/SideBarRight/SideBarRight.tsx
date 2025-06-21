import { App, Gtk, Astal, astalify, Gdk } from "astal/gtk4"
import { Variable, bind } from "astal"

export default function SideBarRight() {

  return (
    <window
    className="SideBarRight"
    name="SideBarRight"
    // exclusivity={Astal.Exclusivity.EXCLUSIVE}
    keymode={Astal.Keymode.ON_DEMAND}
    anchor={TOP | BOTTOM | RIGHT}
    // visible={bind(WindowStore.isOpenSideBarRight)}
    onKeyPressed={(self, keyval) => {
          if (keyval === Gdk.KEY_Escape) {
            print("Tombol Escape ditekan!");
            App.toggle_window("SideBarRight")
        }
    }}
    application={App}

    >
      <box vertical>
        <button label="Sidebar Right Testing" />
        <label label="Ini adalah Isi Kontent Sidebar Right" />
      </box>
    </window>
  )
}