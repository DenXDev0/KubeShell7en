// #-------------------#
// #  Clipboard UI     #
// #-------------------#

export const ClipboardUI = {
    Clipboard: (props) => (
      <box>
        <label label="test" {...props} />
      </box>
    ),
  
    ButtonClipboard: (props) => (
      <button {...props}>
        <image iconName="view-list-symbolic" />
      </button>
    ),
  };
  