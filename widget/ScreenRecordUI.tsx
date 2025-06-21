import { Gtk } from "astal/gtk4";
import { GtkToggleButton } from "../utils/Helpers/WIdgetsAstalify";
import { ScreenRecord } from "../Services/ScreenRecord";
import { bind } from "astal";

export const ScreenRecordUI = {
    ModeRecord: () => (
        <button
            sensitive={bind(ScreenRecord.recordStatus).as(record => !record)}
            iconName={bind(ScreenRecord.modeSelection).as(m => m ? "view-restore-symbolic" : "view-fullscreen-symbolic")}
            onClicked={() => ScreenRecord.modeSelection.set(!ScreenRecord.modeSelection.get())}
        />
    ),

    TimeLabel: () => (
        <label
            sensitive={bind(ScreenRecord.recordStatus)}
            marginStart={5} 
            label={bind(ScreenRecord.elapsedTime)}
        />

    ),

    AudioMode: () => (
        <GtkToggleButton
            sensitive={bind(ScreenRecord.recordStatus).as(record => !record)}
            iconName="audio-speakers-symbolic"
            onToggled={(self) => ScreenRecord.AudioModeToggle(self)}
        />
    ),

    Format: () => (
        <button 
            label={bind(ScreenRecord.format).as(f => f.toUpperCase())}
            onClicked={() => ScreenRecord.formatSelect()}
        />
    ),

    RecordButton1: () => (
        <GtkToggleButton
            onToggled={(self) => ScreenRecord.Record(self)}
        >
            <image iconName="media-record-symbolic" />
        </GtkToggleButton>
    ),

    RecordButton2: () => (
        <GtkToggleButton
            onToggled={(self) => ScreenRecord.Record(self)}
        >
            <box spacing={5}>
                <image iconName="media-record-symbolic" />
                <label label="Record" />
            </box>
        </GtkToggleButton>
    ),
}