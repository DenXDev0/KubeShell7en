import Network from "gi://AstalNetwork";
import { Gtk } from "astal/gtk4";
import { bind } from "astal";
import { speedLabel } from "../Services/NetSpeed";

// Initialize network
const network = Network.get_default();
const wifi = bind(network, "wifi");

export const InternetUI = {
    // #-------------------#
    // # Network Speed UI  #
    // #-------------------#
    netSpeed: (props) => (
        <label label={speedLabel} {...props} />
    ),

    // #------------------#
    // # Wi-Fi Title UI  #
    // #------------------#
    WifiTitle: (props) => (
        <>
            {wifi.as(wifi => wifi && (
                <label label={bind(wifi, "ssid").as(String)} {...props} />
            ))}
        </>
    ),

    // #-------------------#
    // # Wi-Fi Button UI  #
    // #-------------------#
    WifiButton: (props) => (
        <>
            {wifi.as(wifi => wifi && (
                <button {...props}>
                    <image 
                        tooltipText={bind(wifi, "ssid").as(String)}
                        iconName={bind(wifi, "iconName")}
                    />
                </button>
            ))}
        </>
    ),
};
