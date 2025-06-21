import { Gtk, Gdk, Astal } from "astal/gtk4"
import { Variable, bind } from "astal"

export default function Dashboard() {

  return (
    <window
    className="Dashboard"
    exclusivity={Astal.Exclusivity.IGNORE}
    anchor={TOP | BOTTOM | LEFT | RIGHT}
    keymode={Astal.Keymode.EXCLUSIVE}
    visible={bind(WindowStore.isOpenDashboard)}
    onKeyPressEvent={(self, event: Gdk.Event) => {
      if (event.get_keyval()[1] === Gdk.KEY_Escape) {
          WindowStore.toggle("Dashboard")
      }
    }}
    css="background-color: alpha(@theme_bg_color, 0.7);"
    >
      <revealer
      revealChild={bind(WindowStore.isOpenDashboard)}
      transitionDuration={300}
      transitionType={Gtk.RevealerTransitionType.CROSSFADE}
      >
        {WindowStore.contentDashboard(content => content || <label label="No Content" margin={8} />)}
      </revealer>
    </window>
  )
}