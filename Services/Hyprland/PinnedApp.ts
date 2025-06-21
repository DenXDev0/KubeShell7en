// PinnedApp.js

import { Variable } from "astal";
import { optionsStore } from "../../utils/Store/options";

// #--------------------------#
// # Public: Add Task         #
// #--------------------------#

export default class PinnedApp {
  static appList = Variable(optionsStore.read().PinnedApp ?? []);

  // #-------------------------#
  // # Private: Update Method  #
  // #-------------------------#
  static #update(appList) {
    const data = optionsStore.getData();
    data.PinnedApp = appList;
    optionsStore.write(data);
    this.appList.set(appList);
  }

  // #----------------------------#
  // # Static: Monitor File Change #
  // #----------------------------#
  static {
    optionsStore.monitor((newData) => {
      this.appList.set(newData.PinnedApp ?? []);
    });
  }

  // #----------------------------#
  // # Public: Add Task Method   #
  // #----------------------------#
  static add(task) {
    const appList = [...this.appList.get()];

    if (appList.includes(task)) {
      return print(`⚠️ Tugas "${task}" sudah ada!`);
    }

    this.#update([...appList, task]);
    print(`➕ Ditambahkan: ${task}`);
  }

  // #-----------------------------#
  // # Public: Delete Task Method #
  // #-----------------------------#
  static delete(task) {
    const appList = this.appList.get().filter(t => t !== task);
    this.#update(appList);
    print(`🗑️ Dihapus: ${task}`);
  }
}
