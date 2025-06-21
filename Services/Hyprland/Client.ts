import { bind } from "astal";
import AstalHyprland from "gi://AstalHyprland";

const hyprland = AstalHyprland.get_default();
const focusedClient = bind(hyprland, "focusedClient");
const clients = bind(hyprland, "clients");

export default class Client {
    static get focused() {
        return focusedClient.as(client => ({
            class: client?.class || "Desktop",
            title: client?.title || "No Active Window - Open an App",
            pid: client?.pid || "No PID",
            address: client?.address || "No Address",
        }));
    }

    static get list() {
        return clients.as(clientList =>
            clientList
                .slice()
                .sort((a, b) => (a.workspace?.id || 0) - (b.workspace?.id || 0))
                .map(client => ({
                    class: client.class,
                    title: client.title,
                    pid: client.pid,
                    address: client.address,
                    workspaceId: client.workspace?.id,
                }))
        );
    }

    static handleFocus(address, action) {
        const client = hyprland.clients.find(c => c.address === address);
        client?.[action]();
    }
}
