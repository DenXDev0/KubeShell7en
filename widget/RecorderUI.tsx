// #------------------#
// # Recorder Logic  #
// #------------------#

// #-----------------#
// # Recorder UI    #
// #-----------------#

export const RecorderUI = {
    // #-----------------#
    // # Recorder       #
    // #-----------------#
    Recorder: (props) => (
      <box>
        <label label="test" {...props} />
      </box>
    ),
  
    // #-----------------#
    // # Button Recorder #
    // #-----------------#
    ButtonRecorder: (props) => (
      <button {...props}>
        <image iconName="view-list-symbolic" />
      </button>
    ),
  };
  