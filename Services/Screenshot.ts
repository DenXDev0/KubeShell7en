import { Gio, GLib, Variable } from "astal";
import { exec, execAsync, subprocess } from "astal/process"


const ss_dir = GLib.get_home_dir() + "/Pictures/Screenshot/";

const file = Gio.File.new_for_path(ss_dir);
if (!file.query_exists(null)) {
        file.make_directory_with_parents(null);
}

function getTimestamp() {
    const now = GLib.DateTime.new_now_local();
    return now.format("%Y-%m-%d_%H-%M-%S");
}

export const Screenshot = {
    interval: Variable(5),
    initialInterval: 5,

    setIntervalValue() {
        let current = this.interval.get();
        let next = current + 1;
        if (next > 10) next = 1;

        this.interval.set(next);
        this.initialInterval = next;
    },

    grimTimer() {
        GLib.timeout_add(GLib.PRIORITY_DEFAULT, 1000, () => {
            const current = this.interval.get();
            const next = current - 1;
            this.interval.set(next);
        
            if (next <= 1) {
                const filename = `screenshot_${getTimestamp()}.png`;
                const filepath = ss_dir + filename;
                execAsync(["grim", filepath])
                .then(() => {
                    console.log(filepath);
                    this.interval.set(this.initialInterval);
                })
                .catch((err) => {
                    console.error(err);
                    this.interval.set(this.initialInterval);
                })

                return GLib.SOURCE_REMOVE;
            }
        
            return GLib.SOURCE_CONTINUE;
        });
    },

    grimSelect(btn) {
        const filename = `screenshot_${getTimestamp()}.png`;
        const filepath = ss_dir + filename;
        btn.set_icon_name("content-loading-symbolic")
        execAsync(["slurp"])
            .then((geometry) => {
                execAsync(["grim", "-g", geometry, filepath])
                    .then(() => {
                        console.log(filepath)
                        btn.set_icon_name("view-restore-symbolic")
                    })
                    .catch((err) => {
                        console.error("❌ Failed to take screenshot with grim:", err)
                        btn.set_icon_name("view-restore-symbolic")
                    });
            })
            .catch((err) => {
                console.error("❌ Failed to run slurp:", err)
                btn.set_icon_name("view-restore-symbolic")
            });
    },

    grimScreen(btn) {
        const filename = `screenshot_${getTimestamp()}.png`;
        const filepath = ss_dir + filename;
        btn.set_icon_name("content-loading-symbolic")
        execAsync(["grim", filepath])
        .then(() => {
            console.log(filepath)
            btn.set_icon_name("view-fullscreen-symbolic")
        })
        .catch((err) => {
            console.error(err)
            btn.set_icon_name("view-fullscreen-symbolic")
        })
    },
}