import { App, Gtk, Astal, astalify, Gdk } from "astal/gtk4"
import { Variable, bind } from "astal"
import { ChatAI } from "./Component/ChatAI";

export default function SideBarLeft() {

  return (
    <window
    className="SideBarLeft"
    name="SideBarLeft"
    // exclusivity={Astal.Exclusivity.EXCLUSIVE}
    keymode={Astal.Keymode.ON_DEMAND}
    anchor={TOP | BOTTOM | LEFT}
    // visible={bind(WindowStore.isOpenSideBarLeft)}
    onKeyPressed={(self, keyval) => {
          if (keyval === Gdk.KEY_Escape) {
            print("Tombol Escape ditekan!");
            App.toggle_window("SideBarLeft")
        }
    }}
    application={App}

    >
      <ChatAI />
    </window>
  )
}