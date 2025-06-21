import { Gtk } from "astal/gtk4";
import { Variable, bind, Gio, writeFile, readFile } from "astal";
import { Hypr } from "../Services/Hyprland/_Hyprland";
import { GioAppIcon, GioAppInfo } from "../utils/Helpers/GioAppIcon";
import { FlowBox, GtkGrid } from "../utils/Helpers/WIdgetsAstalify";

// #-----------#
// # Workspace #
// #-----------#

export const WorkspaceUI = {
  // Handle Scroll
  handleScroll: (_, x, y) => Hypr.Workspace.handleScroll(y),

  // Workspace Buttons
  Workspace: () => {
    const numbers = [...Array(10).keys()];

    return (
      <>
        {numbers.map((i) => {
          const wsId = i + 1;
          return (
            <button
              key={i}
              cssClasses={Hypr.Workspace.status(wsId)}
              onClicked={() => Hypr.Workspace.handleFocus(wsId)}
            />
          );
        })}
      </>
    );
  },
};

// ################################################################################
// ##                                                                            ##
// ################################################################################

// #----------#
// # WindowUI #
// #----------#

export const WindowUI = {
  // #--------------------#
  // # Focused Window     #
  // #--------------------#
  WindowName: (props) => (
    <label
      label={Hypr.Client.focused.as((c) => c.class.toUpperCase())}
      maxWidthChars={8}
      ellipsize={3}
      {...props}
    />
  ),

  // #--------------------#
  // # Focused Window Title #
  // #--------------------#
  WindowTitle: (props) => (
    <label
      label={Hypr.Client.focused.as((c) => c.title)}
      maxWidthChars={25}
      ellipsize={3}
      {...props}
    />
  ),

  // #--------------------#
  // # Focused Window Icon #
  // #--------------------#
  WindowIcon: (props) => (
    <button {...props}>
      <image iconName={Hypr.Client.focused.as((c) => c.class).as(GioAppIcon)} />
    </button>
  ),

  // #--------------------#
  // # Window List        #
  // #--------------------#
  WindowList: () => {
    const showPopover = (win) => (
      <popover marginBottom={5} position={2} hasArrow={false}>
        <box vertical>
          <button label="Pin" onClicked={() => Hypr.PinnedApp.add(win.class)} />
          <button label="Close" onClicked={() => Hypr.Client.handleFocus(win.address, 'kill')} />
        </box>
      </popover>
    );

    const handleFocus = (widget, event, win, popover) => {
      const btn = event.get_button();
      if (btn === 1) {
        Hypr.Client.handleFocus(win.address, 'focus');
        PopoverStore.close();
        popover.popdown();
      } else if (btn === 3) {
        if (!popover.get_parent()) popover.set_parent(widget);
        popover.popup();
      }
      return true;
    };

    const classButton = (win) => Hypr.Client.focused.as((c) => {
      const focusClass = c.pid === win.pid ? "WinFocused" : "WinNotFocused";
      const workspaceClass = `Wpc${win.workspaceId}`;
      return [focusClass, workspaceClass];
    });

    return (
      Hypr.Client.list.as((clientList) => (
        <GtkGrid maxPerRow={6} 
        columnSpacing={10} 
        rowSpacing={10}
        >
          {clientList.map((win) => (
            <button
              key={win.id}
              tooltipText={win.title}
              cssClasses={classButton(win)}
              onButtonPressed={(widget, event) =>
                handleFocus(widget, event, win, showPopover(win))
              }
            >
              <image gicon={GioAppInfo(win.class)?.get_icon() || Gio.ThemedIcon.new(win.class)} />
            </button>
          ))}
        </GtkGrid>
      ))
    );
  },

  // #--------------------#
  // # Pinned Window List #
  // #--------------------#
  WindowListPinned: () => {
    const showPopover = (appPin) => (
      <popover marginBottom={5} position={2} hasArrow={false}>
        <box vertical>
          <button label="Run" onClicked={() => print("run")} />
          <button label="Unpin" onClicked={() => Hypr.PinnedApp.delete(appPin)} />
        </box>
      </popover>
    );

    const handleFocus = (widget, event, appPin, popover) => {
      const btn = event.get_button();
      if (btn === 1) {
        PopoverStore.close();
        popover.popdown();
      } else if (btn === 3) {
        if (!popover.get_parent()) popover.set_parent(widget);
        popover.popup();
      }
      return true;
    };

    return bind(Hypr.PinnedApp.appList).as((data) => (
      <GtkGrid maxPerRow={6} 
      columnSpacing={15} 
      rowSpacing={15}
      >
        {data.map((appPin, index) => (
          <button
            key={index}
            tooltipText={appPin}
            onButtonPressed={(widget, event) =>
              handleFocus(widget, event, appPin, showPopover(appPin))
            }
          >
            <image
              gicon={GioAppInfo(appPin)?.get_icon() || Gio.ThemedIcon.new(appPin)}
            />

          </button>
        ))}
      </GtkGrid>
    ));
  },
};
