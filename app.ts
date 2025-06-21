import "./utils/globals"
import { App, Gtk } from "astal/gtk4"
import style from "./style.scss"
import Bar from "./main/Bar/MainBar"
import SideBarLeft from "./main/SideBarLeft/SideBarLeft"
import SideBarRight from "./main/SideBarRight/SideBarRight"
import { PopoverUI } from "./widget/Popover/PopoverUI"

// let settings = Gtk.Settings.get_default();
// settings.gtk_font_name = "Cantarell 9";
// settings.gtk_theme_name = "Catppuccin-Mocha"; 
// settings.gtk_icon_theme_name = "Tela-circle-green";



App.apply_css(`
    @define-color gtk-bg-color alpha(@theme_bg_color, 0.6);
    :root {
        --bg-color: #77C37B;
        --text-color: #FFCA28;
        --bg-image: url("file:///home/deni/Pictures/image.png");
    }
`)

App.start({
    css: style,
    main() {
        App.get_monitors().map(Bar)
        SideBarLeft();
        SideBarRight();
        PopoverUI();
    },
})
