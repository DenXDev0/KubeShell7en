import { Gio, GLib } from "astal";

export function GioAppIcon(appId) {
  if (!appId) return "application-x-executable-symbolic";
  const appInfo = Gio.DesktopAppInfo.new(`${appId}.desktop`);
  return appInfo?.get_icon().to_string() || "application-x-executable-symbolic";
}


const apps = Gio.AppInfo.get_all();
export const GioAppInfo = (appId) => {
  let searchTerms = appId.toLowerCase().split(/[\s./\-]+/);
  // print(searchTerms)

  const getID = apps.find((app) => {
    const id = (app.get_id() || "").toLowerCase();
    return searchTerms.every(part => id.includes(part));
  });

  const getDesktop = Gio.DesktopAppInfo.new(`${appId}.desktop`);

  if (getDesktop) {
    return getDesktop;
  } else {
    return getID;
  }

};


// const apps = Gio.AppInfo.get_all();
// export const GioAppInfo = (appPin) => {
//   const pin = appPin.toLowerCase();
  
//   return (
//     apps.find((app) => {
//       const id = (app.get_id() || "").toLowerCase();
//       const name = (app.get_name() || "").toLowerCase();
//       const exec = (app.get_executable() || "").toLowerCase();
//       const displayName = (app.get_display_name && app.get_display_name())?.toLowerCase() || "";
//       const cmd = (app.get_commandline && app.get_commandline())?.toLowerCase() || "";

//       return (
//         id.includes(pin) ||
//         name.includes(pin) ||
//         exec.includes(pin) ||
//         displayName.includes(pin) ||
//         cmd.includes(pin)
//       );
//     }) || null
//   );
// };



// const apps = Gio.AppInfo.get_all();

// export function GioAppIcon(appId) {
//   let result = "application-x-executable-symbolic";

//   apps.forEach(app => {
//     if (app.get_id() === `${appId}.desktop`) {
//       const icon = app.get_icon();
//       result = icon ? icon.to_string() : "application-x-executable-symbolic";
//     }
//   });

//   return result;
// }



// export function GioAppIcon3(appId) {
//   let getAppInfo = Gio.AppInfo.get_all();
//   let searchTerms = appId.toLowerCase().split(/[\s.]+/);

//   let match = getAppInfo.find(appList => {
//     let app_name = appList.get_name().toLowerCase();
//     return searchTerms.some(term => app_name.includes(term)); 
//   });

//   if (match) {
//     let app_name = match.get_executable();
//     let app_icon = match.get_icon();
//     let icon_str = app_icon ? app_icon.to_string() : "Ikon: Tidak ditemukan";
//     print(`Aplikasi: ${app_name}, ${icon_str}`);
//   } else {
//     print("Aplikasi tidak ditemukan.");
//   }
// }
// GioAppIcon3("spo");

// const getApps = Gio.AppInfo.get_all();
// for (let app of getApps) {
//   // console.log(app.get_name());
//     let app_name = app.get_executable();
//     let app_icon = app.get_icon();
//     let icon_str = app_icon ? app_icon.to_string() : "Ikon: Tidak ditemukan";
//     print(`Aplikasi: ${app_name}, ${icon_str}`);
// }


