import { Gtk } from "astal/gtk4";
import { bind, Variable } from "astal";
import Brightness from "../Services/Brightnessctl";

// Initialize brightness control
const brightness = Brightness.get_default();

// #--------------------------#
// # Brightness Control Logic #
// #--------------------------#
const handleScrollBrightness = (_, dx, dy) => {
    const step = 0.02;
    const minBrightness = 0.01;
    const delta = dy < 0 ? step : -step;

    brightness.screen = Math.max(minBrightness, Math.min(1, brightness.screen + delta));
    
    return true;
};

// #--------------------#
// # Exported Components#
// #--------------------#

export const DisplayUI = {
    // #-------------------#
    // # Brightness Button #
    // #-------------------#
    BrightnessButton: (props) => (
        <button 
            onScroll={handleScrollBrightness} 
            tooltipText={bind(brightness, "screen").as(String)} 
            {...props}
        >
            <image iconName="display-brightness-symbolic"/>
        </button>
    ),

    // #-------------------#
    // # Brightness Slider #
    // #-------------------#
    BrightnessSLider: (props) => (
        <slider
            widthRequest={100}
            onMotion={({ value }) => brightness.screen = value}
            value={bind(brightness, "screen")}
            onScroll={handleScrollBrightness}  
            {...props}
        />
    ),

    // #-------------------#
    // # Display Button    #
    // #-------------------#
    DisplayButton: (props) => (
        <button {...props}>
            <image iconName="preferences-desktop-display-symbolic" />
        </button>
    ),

    // #---------------------#
    // # Display Revealer UI #
    // #---------------------#
    DisplayRevelear: () => {
        const isHovered = Variable(false);

        return (
            <box
                onHoverEnter={() => { isHovered.set(true); }}
                onHoverLeave={() => { isHovered.set(false); }}
            >
                <DisplayUI.BrightnessButton />
                <revealer
                    revealChild={bind(isHovered)}
                    transitionDuration={500}
                    transitionType={Gtk.RevealerTransitionType.SLIDE_RIGHT} 
                >
                    <DisplayUI.BrightnessSLider />
                </revealer>
            </box>
        );
    },
};
