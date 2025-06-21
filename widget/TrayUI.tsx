import { Gtk, Gdk } from "astal/gtk4";
import { bind, Variable, Gio } from "astal";
import AstalTray from "gi://AstalTray";

// #--------------------#
// # Tray Setup        #
// #--------------------#
const tray = AstalTray.get_default();
const visibleTray = bind(tray, "items").as(items => items.length > 0);

// #---------------------#
// # Tray UI Components  #
// #---------------------#

export const TrayUI = {
  // #-------------------#
  // # Tray Component    #
  // #-------------------#
  Tray: (props) => (
    <box visible={visibleTray} {...props}>
      <Gtk.Separator visible marginEnd={5} />
      {bind(tray, "items").as(items =>
        items.map(item => (
          <menubutton
            setup={self => {
              self.insert_action_group('dbusmenu', item.actionGroup);
            }}
            tooltipMarkup={item.tooltipMarkup}
            usePopover={true}
            menuModel={item.menuModel}
          >
            <image gicon={item.gicon} />
          </menubutton>
        ))
      )}
    </box>
  ),
};
