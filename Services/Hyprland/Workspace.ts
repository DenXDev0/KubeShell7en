import { Variable, bind } from "astal";
import AstalHyprland from "gi://AstalHyprland";
import { throttle } from "./Throttle";

const hyprland = AstalHyprland.get_default();

const focusedWorkspace = bind(hyprland, "focusedWorkspace");
const clients = bind(hyprland, "clients");

export default class Workspace {
    constructor(id) {
        this.id = id;
    }

    static status(workspaceId) {
        const WorkspaceClass = Variable.derive([focusedWorkspace, clients], (focused, list) => {
            const classes = ["workspaceButton"];

            const isFocused = focused?.id === workspaceId;
            classes.push(isFocused ? "wrsActive" : "wrsInactive");
            
            const isOccupied = list?.some(client => client.workspace?.id === workspaceId);
            if (isOccupied) classes.push("wrsOccupied");

            return classes;
        });
        return WorkspaceClass();
    }
    

    static handleFocus(workspaceId) {
        const ws = AstalHyprland.Workspace.dummy(workspaceId, null);
        ws.focus();
    }

    static handleScroll = throttle(300, (y) => {
        hyprland.dispatch("workspace", y > 0 ? "m+1" : "m-1");
    });
}
