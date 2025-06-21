import { Gtk, Astal, astalify } from "astal/gtk4"
import { WindowStoreGlobal } from "./Store/WindowStore"
import { PopoverStoreGlobal } from "./Store/PopoverStore"

declare global {
  const PopoverStore: typeof PopoverStoreType
  const WindowStore: typeof WindowStoreGlobal
  const GtkScrolledWindow: typeof Gtk.ScrolledWindow
  const GtkFlowBox: typeof Gtk.FlowBox
  const GtkEmojiChooser: typeof Gtk.EmojiChooser
  const GtkTextView: typeof Gtk.TextView
  const START: number
  const CENTER: number
  const END: number
  const FILL: number
  const TOP: number
  const BOTTOM: number
  const LEFT: number
  const RIGHT: number
}

Object.assign(globalThis, {
  PopoverStore: PopoverStoreGlobal,
  WindowStore: WindowStoreGlobal,
  GtkScrolledWindow: astalify(Gtk.ScrolledWindow),
  GtkFlowBox: astalify(Gtk.FlowBox),
  GtkEmojiChooser: astalify(Gtk.EmojiChooser),
  GtkTextView: astalify(Gtk.TextView),
  START: Gtk.Align.START,
  CENTER: Gtk.Align.CENTER,
  END: Gtk.Align.END,
  FILL: Gtk.Align.FILL,
  TOP: Astal.WindowAnchor.TOP,
  BOTTOM: Astal.WindowAnchor.BOTTOM,
  LEFT: Astal.WindowAnchor.LEFT,
  RIGHT: Astal.WindowAnchor.RIGHT
})
