import { Gtk } from "astal/gtk4";


export const ChatAI = () => (
    <box vertical widthRequest={300}>
        <label label="GeminiAI" />
        <box vexpand />
        <box spacing={10}>
            <entry hexpand placeholderText="Entry in Here" />
            <button iconName="document-send-symbolic" />
        </box>
    </box>
)