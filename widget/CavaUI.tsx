import { bind } from "astal";
import { CavaController } from "../Services/Cava";
import { Gtk } from "astal/gtk4";

export const CavaUI = {
  CavaButton: (props) => (
    <button
      cssClasses={bind(CavaController.state).as((s) => [s.ButtonAutoCava ? "btn-cava-on" : "btn-cava-off"])}
      onClicked={() => CavaController.toggleCava()}
      {...props}
    >
      <image iconName="open-menu-symbolic" />
    </button>
  ),

  CavaBar: (props) => (
    <label
      label={bind(CavaController.state).as((s) => s.bar || "Loading...")}
      onDestroy={() => CavaController.stop()}
      {...props}
    />
  ),

  Stack: ({ children }) => (
    <stack
      onHoverEnter={() => CavaController.setHovered(false)}
      onHoverLeave={() => CavaController.setHovered(true)}
      visibleChildName={bind(CavaController.state).as((s) =>
        s.isRunning && s.isHovered ? "CavaBox" : "ControlMpris"
      )}
      transitionType={Gtk.StackTransitionType.SLIDE_UP}
      transitionDuration={400}
    >
      {children}
    </stack>
  ),
};
