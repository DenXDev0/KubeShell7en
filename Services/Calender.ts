import { Variable, GLib, bind } from "astal"
import { App, Gtk } from "astal/gtk4";
import Soup from "gi://Soup?version=3.0";
import { optionsStore } from "../utils/Store/options";

const session = new Soup.Session();

// Update waktu setiap detik
export const timeData = Variable({ time: "", date: "" }).poll(1000, () => {
    const now = GLib.DateTime.new_now_local();
    return {
        time: now.format("%H:%M:%S")!,
        date: now.format("%A, %B %d")!
    };
});

// Mapping kode cuaca ke ikon GTK bawaan
function mapWeatherCodeToGtkIcon(condCode, isNight = false) {
  const map = {
    1000: isNight ? "weather-clear-night" : "weather-clear",
    1003: isNight ? "weather-few-clouds-night" : "weather-few-clouds",
    1006: "weather-overcast",
    1009: "weather-overcast",
    1030: "weather-fog",
    1063: "weather-showers-scattered",
    1066: "weather-snow",
    1069: "weather-snow",
    1072: "weather-fog",
    1087: "weather-storm",
    1114: "weather-snow",
    1117: "weather-snow",
    1135: "weather-fog",
    1147: "weather-fog",
    1150: "weather-showers-scattered",
    1153: "weather-showers-scattered",
    1168: "weather-fog",
    1171: "weather-fog",
    1180: "weather-showers",
    1183: "weather-showers",
    1186: "weather-showers",
    1189: "weather-showers",
    1192: "weather-showers",
    1195: "weather-showers",
    1198: "weather-showers",
    1201: "weather-showers",
    1204: "weather-snow",
    1207: "weather-snow",
    1210: "weather-snow",
    1213: "weather-snow",
    1216: "weather-snow",
    1219: "weather-snow",
    1222: "weather-snow",
    1225: "weather-snow",
    1237: "weather-snow",
    1240: "weather-showers-scattered",
    1243: "weather-showers",
    1246: "weather-showers",
    1249: "weather-snow",
    1252: "weather-snow",
    1255: "weather-snow",
    1258: "weather-snow",
    1261: "weather-snow",
    1264: "weather-snow",
    1273: "weather-storm",
    1276: "weather-storm",
    1279: "weather-storm",
    1282: "weather-storm",
  };

  return map[condCode] || "weather-severe-alert";
}

export const Weather = {
    _IntervalUpdate: 1800,
  
    weatherConfig: Variable(optionsStore.read().Weather),

    status: Variable({
    loading: false,
    error: ""
    }),
  
    // Output hasil cuaca
    weatherData: Variable({
      country: "",
      region: "",
      city: "",
      temp: "",
      feelsLike: "",
      humidity: "",
      windKph: "",
      windDir: "",
      precip: "",
      uvIndex: "",
      pressureMb: "",
      cloud: "",
      lastUpdated: "",
      isDay: true,
  
      condText: "",
      condIcon: "",
      condCode: "",
      gtkIcon: "weather-severe-alert"
    }),
  
    fetchWeather() {
      const { apiKey, city, country } = this.weatherConfig.get();
  
      if (!apiKey || !city || !country) {
        print("API Key, kota, dan negara wajib diisi.");
        return;
      }
  
      print("Mengambil data cuaca...");
      let url = `http://api.weatherapi.com/v1/current.json?key=${encodeURIComponent(apiKey.trim())}&q=${encodeURIComponent(city.trim())},${encodeURIComponent(country.trim())}`;
      let msg = Soup.Message.new("GET", url);
  
      session.send_and_read_async(msg, GLib.PRIORITY_DEFAULT, null, (sess, res) => {
        try {
          let bytes = session.send_and_read_finish(res);
          let apiData = JSON.parse(bytes.get_data().toString());
  
          if (apiData.error) {
            print(`Error: ${apiData.error.message}`);
            return;
          }

          this.status.set({ loading: false, error: "" });
  
          const current = apiData.current;
          const location = apiData.location;
          const isNight = current.is_day === 0;
          const gtkIconName = mapWeatherCodeToGtkIcon(current.condition.code, isNight);
  
          this.weatherData.set({
            country: location.country,
            region: location.region,
            city: location.name,
            temp: current.temp_c,
            feelsLike: current.feelslike_c,
            humidity: current.humidity,
            windKph: current.wind_kph,
            windDir: current.wind_dir,
            precip: current.precip_mm,
            uvIndex: current.uv,
            pressureMb: current.pressure_mb,
            cloud: current.cloud,
            lastUpdated: current.last_updated,
            isDay: current.is_day === 1,
  
            condText: current.condition.text,
            condIcon: current.condition.icon,
            condCode: current.condition.code,
            gtkIcon: gtkIconName
          });
  
          print(`✅ Cuaca di ${location.name} berhasil diambil.`);
        } catch (e) {
          this.status.set({ loading: false, error: "Gagal memuat data cuaca." });
          print("Gagal mengambil data cuaca.");
          logError(e);
        }
      });
    },

    saveButton(entryRef) {
        const [apiKey, country, city] = entryRef.text.split("/");
      
        if (!apiKey || !country || !city) {
          print("Format entryRef salah. Gunakan: apiKey/Country/City");
          return;
        }

        const data = optionsStore.getData();
        data.Weather = { apiKey, country, city }
        optionsStore.write(data);
      
        this.weatherConfig.set({ apiKey, country, city });
        entryRef.set_text("")
    },
      
    autoRefresh() {
        GLib.timeout_add_seconds(GLib.PRIORITY_DEFAULT, this._IntervalUpdate, () => {
            const { apiKey, country, city } = this.weatherConfig.get();

            if (apiKey && country && city) {
              this.fetchWeather();
            }
            return true;
        });
    },

    monitorFileUpdate() {
        optionsStore.monitor((newData) => {
            const { apiKey, country, city } = newData.Weather;

            if (apiKey && country && city) {
                this.weatherConfig.set(newData.Weather);
                this.fetchWeather();
            }
        });
    },

    init() {
        const { apiKey, country, city } = this.weatherConfig.get();
        if (apiKey && country && city) {
            this.fetchWeather();
        } else {
            print("Konfigurasi belum lengkap");
        }
        
        this.autoRefresh();
        this.monitorFileUpdate();
    }    

};

Weather.init();