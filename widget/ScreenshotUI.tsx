import { Gtk } from "astal/gtk4";
import { Screenshot } from "../Services/Screenshot";
import { bind } from "astal";

export const ScreenshotUI = { 
    windowSS: () => (
        <button iconName="view-restore-symbolic"/>
    ),
    
    ScreenSS: () => (
        <button onClicked={(self) => Screenshot.grimScreen(self)} iconName="view-fullscreen-symbolic"/>
    ),

    SelectSS: () => (
        <button onClicked={(self) => Screenshot.grimSelect(self)} iconName="view-restore-symbolic"/>
    ),

    TimerSS: () => (
    <box cssName="ButtonTimerSS">
        <button 
            label={bind(Screenshot.interval).as(i => `${i}s`)}
            onClicked={(self) => Screenshot.grimTimer()}
        />
        <Gtk.Separator />
        <button 
            iconName="list-add-symbolic" 
            pixelSize={10}
            onClicked={() => Screenshot.setIntervalValue()}
         />
    </box>
    ),
}