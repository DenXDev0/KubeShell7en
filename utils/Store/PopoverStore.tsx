import { Gtk } from "astal/gtk4";

// #-----------------------------#
// # Popover Store Global       #
// #-----------------------------#
export const PopoverStoreGlobal = {
    popoverRef: undefined,

    // #-----------------------------#
    // # Set Popover Reference      #
    // #-----------------------------#
    setRef(ref) {
        if (this.popoverRef) return;
        this.popoverRef = ref;

        ref.connect("show", () => {
            print("Popover opened");
        });

        ref.connect("hide", () => {
            // const box = ref.get_child();
            // const child = box?.get_child();
        
            // if (child) {
            //     box.remove(child);
            // }
        
            ref.set_child(null);
            ref.unparent();        
        });
    },

    // #-------------------------------#
    // # Toggle Popover Visibility     #
    // #-------------------------------#
    toggle(triggerWidget, content) {
        if (!this.popoverRef) {
            print("Popover has not been set.");
            return;
        }

        this.popoverRef.set_parent(triggerWidget);
        this.popoverRef.set_child(content);
        this.popoverRef.popup();
    },

    // #-----------------------------#
    // # Close Popover               #
    // #-----------------------------#
    close() {
        this.popoverRef.popdown();
    },
};
