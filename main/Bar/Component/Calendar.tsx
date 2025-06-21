import { Gtk } from "astal/gtk4";
import { CalendarUI } from "../../../widget/CalendarUI";
import { TodoListUI } from "../../../widget/TodoListUI";

// #-----------------------#
// # Content Box Function #
// #-----------------------#
const contentBox = (
    <box cssClasses={["ContentBox", "Calendar"]} spacing={10}>
        <box vertical spacing={10}>
            <box spacing={5}>
                <CalendarUI.WeatherButtonSetting />
                <box vertical>
                    <box>
                        <CalendarUI.WeatherCity xalign={0}/>
                        <CalendarUI.WeatherRegion xalign={0}/>
                    </box>
                    <CalendarUI.WeatherCountry xalign={0}/>
                </box>
                <box hexpand/>
                <box cssName="Weather" vertical>
                    <box spacing={10} halign={2}>
                        <CalendarUI.WeatherCondIcon iconSize={1} />
                        <CalendarUI.WeatherTemp xalign={3} />
                    </box>
                    <CalendarUI.WeatherCondText xalign={3}/>
                </box>
            </box>
            <Gtk.Calendar />
        </box>
        <box vertical widthRequest={250} spacing={5}>
            <centerbox>
                <box>
                    <TodoListUI.BackButton />
                    <TodoListUI.EditButton />
                    <TodoListUI.FilterToggleButton />
                </box>
                <TodoListUI.PageLabel />
                <box>
                    <TodoListUI.RemoveAllButton />
                    <TodoListUI.AddButton />
                </box>
            </centerbox>
            {/* <Gtk.Separator /> */}
            <TodoListUI.TitleInput/>
            <TodoListUI.TaskInput />
            <TodoListUI.List />
            <TodoListUI.TaskLabel />
        </box>
    </box>
)  

// #----------------------------#
// # Popover Toggle Handler     #
// #----------------------------#
let ref: Gtk.Widget;

const handlePopover = () => {
    PopoverStore.toggle(ref, contentBox);
};

// #--------------------#
// # Calendar Function #
// #--------------------#
export function Calendar() {
    return (
        <box 
            setup={self => ref = self} 
            onButtonReleased={handlePopover} 
            cssName="BoxWidget" 
            cssClasses={["Calendar"]} 
            spacing={10}
        >
            <box vertical valign={3}>
                <CalendarUI.Time cssName="TimeNow" xalign={0} />
                <CalendarUI.Date cssName="DateNow" xalign={0} />
            </box>
            <Gtk.Separator visible />
            <box spacing={5} cssName="Weather">
                <CalendarUI.WeatherTemp />
                <CalendarUI.WeatherCondIcon pixelSize={25} />
            </box>
        </box>
    );
}
