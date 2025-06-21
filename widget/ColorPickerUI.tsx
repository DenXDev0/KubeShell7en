import { bind, Variable } from "astal";
import { astalify, Gtk } from "astal/gtk4";
import { subprocess } from "astal/process"

// Convert Gtk widgets to astalify components
const GtkColorPicker = astalify(Gtk.ColorChooserWidget);
const GtkColorButton = astalify(Gtk.ColorButton);

function rgbaToHex(rgba) {
  const r = Math.round(rgba.red * 255);
  const g = Math.round(rgba.green * 255);
  const b = Math.round(rgba.blue * 255);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}


const proc = () => {
  subprocess(
    ["hyprpicker", "-a"], // -a untuk copy otomatis (opsional)
    (out) => {
        const color = out.trim()
        console.log("🎨 Warna dipilih:", color)
        // Lanjutkan dengan pakai warna ini, misalnya:
        // label.set_label(color)
    },
    (err) => {
        console.error("❌ hyprpicker error:", err)
    }
  )
}

const showEditor = Variable(false);

// #---------------------#
// # Color Picker UI    #
// #---------------------#
export const ColorPickerUI = {
  ColorPicker: () => (
    <GtkColorPicker
      showEditor={bind(showEditor)}
      onColorActivated={() => print("cobatest")}
      // setup={(color) => {
      //   color.connect("color-activated", (widget, rgba) => {
      //     const rgbStr = `rgb(${(rgba.red * 255) | 0}, ${(rgba.green * 255) | 0}, ${(rgba.blue * 255) | 0})`;
      //     print(`Warna dikonfirmasi: ${rgbStr}`);
      //   });
      // }}
    />
  ),

  // #------------------#
  // # Button Color UI #
  // #------------------#
  ButtonColor: () => (
    <GtkColorButton
      modal={true}
      show-editor={false}
      onColorSet={(color) => {
        const rgbad = color.get_rgba();
        print(`HEX: ${rgbaToHex(rgbad)}`);
      }}
    />
  ),

  // #----------------------#
  // # Button Popover UI    #
  // #----------------------#
  ColorPickerPopover: () => (
    <menubutton hexpand halign={Gtk.Align.CENTER}>
      <image iconName="applications-graphics-symbolic" />
      <popover>
        <box vertical spacing={10}>
          <centerbox>
            <button label="Back" onClicked={() => showEditor.set(!showEditor.get())} />
            <label label="Color Picker"/>
            <button label="Close" />
          </centerbox>
          <ColorPickerUI.ColorPicker />
        </box>
      </popover>
    </menubutton>
  ),
};
