import { Gtk } from "astal/gtk4";
import { Variable } from "astal";

export const WindowStoreGlobal = {
  isOpenSideBarLeft: Variable(false),
  isOpenSideBarRight: Variable(false),
  isOpenDashboard: Variable(false),
  contentSideBarLeft: Variable<JSX.Element | null>(null),
  contentSideBarRight: Variable<JSX.Element | null>(null),
  contentDashboard: Variable<JSX.Element | null>(null),

  toggle(sidebarRef: string, newContent: JSX.Element) {
    const sidebarFind = {
      SideBarLeft: {
        isOpen: this.isOpenSideBarLeft,
        content: this.contentSideBarLeft,
      },
      SideBarRight: {
        isOpen: this.isOpenSideBarRight,
        content: this.contentSideBarRight,
      },
      Dashboard: {
        isOpen: this.isOpenDashboard,
        content: this.contentDashboard,
      },
    };

    const sidebar = sidebarFind[sidebarRef];
    if (!sidebar) return;

    const isOpen = sidebar.isOpen.get();
    if (isOpen) {
      sidebar.isOpen.set(false);
      sidebar.content.set();
    } else {
      sidebar.content.set(newContent);
      sidebar.isOpen.set(true);
    }
  },
};
