import Apps from "gi://AstalApps";
import { astalify, Gtk } from "astal/gtk4";
import { Variable } from "astal";

// #--------------------#
// # App Launcher Setup #
// #--------------------#
const MAX_ITEMS = 8;
const apps = new Apps.Apps();

// Reload the app list
// apps.reload();
const searchQuery = Variable("");
// const allApps = searchQuery(text => apps.fuzzy_query(text).slice(0, MAX_ITEMS));

// // #-----------------------#
// // # Handle Search Logic  #
// // #-----------------------#
// const handleSearchEnter = () => {
//     const firstMatch = apps.fuzzy_query(searchQuery.get())?.[0];
//     if (firstMatch) firstMatch.launch();
// };

const allApps = searchQuery(text => {
    if (!text) return apps.list.slice(0, 8);
    return apps.fuzzy_query(text).slice(0, 8);
});

const handleSearchEnter = () => {
    const firstMatch = allApps.get()?.[0];
    if (firstMatch) firstMatch.launch();
};

  // #-------------------#
  // # App Button        #
  // #-------------------#
  const AppButton = ({ app }) => (
    <button className="AppButton" onClicked={() => {
        app.launch();
        PopoverStore.close();
        // searchQuery.set(""); // Optional: Reset search after launch
    }}>
        <box>
            <image iconName={app.iconName} />
            <box valign={3} vertical>
                <label className="name" truncate xalign={0} label={app.iconName} />
            </box>
        </box>
    </button>
);

// #----------------------#
// # App Button UI        #
// #----------------------#

export const LauncherUI = {
  // #-------------------#
  // # App Launcher UI  #
  // #-------------------#
  Applauncher: () => (
    <box spacing={10} vertical>
        <entry
            onUnmap={(self) => self.set_text("")}
            placeholderText="Search"
            onNotifyText={e => searchQuery.set(e.text)}
            onActivate={handleSearchEnter}
        />
        <GtkScrolledWindow minContentWidth={400} minContentHeight={300} vertical>
            <box name="All" spacing={6} vertical>
                {allApps.as(list => list.length > 0 ? list.map(app => 
                    <AppButton key={app.name} app={app} />) 
                    : (
                        <box halign={3} className="not-found" vertical>
                            <image iconName="system-search-symbolic" />
                            <label label="No match found" />
                        </box>
                    )
                )}
            </box>
        </GtkScrolledWindow>
    </box>
  )
};

// Exporting Applauncher component for sharing
export const LauncherUISharing = <LauncherUI.Applauncher />;
