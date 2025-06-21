import { App } from "astal/gtk4";

// #------------------#
// # Panel Logic     #
// #------------------#

const onClickSideBar = () => {
    App.toggle_window("SideBarRight");
};

// #-----------------#
// # Panel UI       #
// #-----------------#

export const PanelUI = {
  // #------------------#
  // # Panel Button    #
  // #------------------#

  PanelButton: (props) => (
    <button onClicked={onClickSideBar} {...props}>
      <image iconName="preferences-system" />
    </button>
  )
};
