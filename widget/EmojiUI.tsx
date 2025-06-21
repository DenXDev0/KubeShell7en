import { Gtk, Gdk } from "astal/gtk4";

// Initialize clipboard
const clipboard = Gdk.Display.get_default().get_clipboard();

// #--------------------#
// # Emoji Picker Logic #
// #--------------------#
const EmojiOnclick = (self) => (
    self.connect('emoji-picked', (chooser, emoji) => {
        print(emoji);
        clipboard.set(emoji); // Copy emoji to clipboard
    })
);

// #--------------------#
// # Exported Components#
// #--------------------#

export const EmojiUI = {
    // #------------------#
    // # Emoji Picker UI #
    // #------------------#
    EmojiPicker: () => (
        <GtkEmojiChooser setup={EmojiOnclick} />
    ),

    // #-------------------#
    // # Button Popover UI #
    // #-------------------#
    ButtonPopover: () => (
        <menubutton hexpand halign={Gtk.Align.CENTER}>
            <image iconName="face-wink-symbolic" />
            <EmojiUI.EmojiPicker />
        </menubutton>
    ),
};
