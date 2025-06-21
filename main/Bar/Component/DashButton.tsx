// #-------------------------#
// # DashButton Function     #
// #-------------------------#

const shortcutWidgetIcons = [
  "applications-graphics", 
  "accessories-text-editor", 
  "preferences-system", 
  "multimedia-volume-control",
];

export function DashButton() {
  return (
    <box cssName="BoxWidget" cssClasses={["DashButton"]}>
      <GtkFlowBox
        homogeneous={true}
        max-children-per-line={2}
        selection-mode={0}
        column-spacing={10}
      >
        {shortcutWidgetIcons.map(icon => (
          <image iconName={icon} />
        ))}
      </GtkFlowBox>
    </box>
  );
}
