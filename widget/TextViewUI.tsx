import { Gtk } from "astal/gtk4";

// #------------------#
// # Text View UI    #
// #------------------#

export const TextViewUI = {
  // #------------------#
  // # TextView        #
  // #------------------#
  TextView: () => (
    <GtkTextView
      vexpand
      hexpand
      editable
      heightRequest={300}
      widthRequest={300}
      wrapMode={Gtk.WrapMode.WORD}
    />
  ),

  // #------------------#
  // # Button Popover UI #
  // #------------------#
  ButtonPopover: () => (
    <menubutton hexpand halign={Gtk.Align.CENTER}>
      <image iconName="accessories-calculator-symbolic" />
      <popover>
        <TextViewUI.TextView />
      </popover>
    </menubutton>
  ),
};
