import { Gtk } from "astal/gtk3"

// #------------------#
// # Popover UI      #
// #------------------#

export function PopoverUI() {
  return (
    <popover
      setup={(ref) => PopoverStore.setRef(ref)}
      // hasArrow={false}
      // marginBottom={5}
      // autohide={false}
    >
    </popover>
  )
}
