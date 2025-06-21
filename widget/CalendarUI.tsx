// #--------------------#
// #  Calendar UI       #
// #--------------------#
import { bind } from "astal";
import { Weather, timeData } from "../Services/Calender";
import { Gtk } from "astal/gtk4";
import { GtkLinkButton } from "../utils/Helpers/WIdgetsAstalify";

// #--------------------#
// #  Time & Date       #
// #--------------------#

let refEntryApi;

export const CalendarUI = {
  Time: (props) => (
    <label label={bind(timeData).as((t) => t.time)} {...props} />
  ),

  Date: (props) => (
    <label label={bind(timeData).as((t) => t.date)} {...props} />
  ),

  // #--------------------#
  // #  Weather UI        #
  // #--------------------#

  WeatherButtonSetting: () => (
    <menubutton >
      <image pixelSize={10} iconName="preferences-system-symbolic" />
      <popover>
        <box spacing={10} vertical>
          <entry setup={(e) => refEntryApi = e} placeholderText="APIKey/Country/City" />
          <box>
            <GtkLinkButton iconName="dialog-information-symbolic" tooltipText="API using Weatherapi.com" uri="https://www.weatherapi.com" />
            <button label="Save" onClicked={() => Weather.saveButton(refEntryApi)} hexpand/>
          </box>
        </box>
      </popover>
    </menubutton>
  ),

  WeatherCondIcon: (props) => (
    <image iconName={bind(Weather.weatherData).as(i => i.gtkIcon)} {...props} />
  ),

  WeatherCondText: (props) => (
    <label label={bind(Weather.weatherData).as(t => t.condText)} {...props} />
  ),

  WeatherTemp: (props) => <label label={bind(Weather.weatherData).as(c => c.temp? `${c.temp}°` : ".... °")} {...props} />,

  WeatherCountry: (props) => <label label={bind(Weather.weatherData).as(c => c.country || "...")} {...props} />,

  WeatherRegion: (props) => <label label={bind(Weather.weatherData).as(c => c.region || "...")} {...props} />,

  WeatherCity: (props) => <label label={bind(Weather.weatherData).as(c => c.city? `${c.city}, ` : "..., ")} {...props} />,
};