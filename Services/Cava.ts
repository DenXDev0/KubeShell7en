import { Variable } from "astal";
import CavaLib from "gi://AstalCava";
import { Mpris } from "./Mpris";

const BAR_COUNT = 15;
const BLOCKS = ["⡀", "⡄", "⡆", "⡇"];
const DEFAULT_BAR = "⡀ ".repeat(BAR_COUNT).trim();

export class CavaController {
  static cava = null;
  static signalId = null;

  static state = Variable({
    bar: DEFAULT_BAR,
    isRunning: false,
    ButtonAutoCava: false,
    isHovered: false,
  });

  static start() {
    if (this.state.get().isRunning) return;

    this.cava = CavaLib.get_default();
    this.cava.set_bars(BAR_COUNT);
    this.cava.set_active(true);

    this.signalId = this.cava.connect("notify::values", () => this.updateCavaText());
    this.updateState({ isRunning: true });
  }

  static stop() {
    if (!this.state.get().isRunning) return;

    this.cava.set_active(false);
    if (this.signalId !== null) {
      this.cava.disconnect(this.signalId);
      this.signalId = null;
    }

    this.cava = null;
    this.updateState({ isRunning: false, bar: DEFAULT_BAR });
  }

  static toggle() {
    this.state.get().isRunning ? this.stop() : this.start();
  }

  static toggleCava() {
    const enabled = !this.state.get().ButtonAutoCava;
    this.updateState({ ButtonAutoCava: enabled, isHovered: true });
    enabled ? this.start() : this.stop();
  }

  static updateCavaText() {
    const values = this.cava?.get_values?.() ?? [];
    const bar = values
      .map((v) => BLOCKS[Math.min((v * 4) | 0, BLOCKS.length - 1)])
      .join(" ");
    this.updateState({ bar });
  }

  static setHovered(val) {
    this.updateState({ isHovered: val });
  }

  static updateState(partial) {
    this.state.set({ ...this.state.get(), ...partial });
  }
}

// Auto-connect MPRIS
// Mpris.get().playbackStatus.subscribe((status) => {
//   if (!CavaController.state.get().ButtonAutoCava) return;
//   !!status ? CavaController.start() : CavaController.stop();
// });
