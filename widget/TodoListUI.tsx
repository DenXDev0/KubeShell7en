import { Gtk } from "astal/gtk4";
import { bind, Variable } from "astal";
import { Todo } from "../Services/TodoList";
import { GtkCheckButton } from "../utils/Helpers/WIdgetsAstalify";

const maxLabelWidth = 25;

export const TodoListUI = {
  FilterToggleButton: props => (
    <button
      visible={bind(Todo.currentPage).as(page => page === "TitlePage")}
      iconName={bind(Todo.filterMode).as(mode => mode === "nameID" ? "view-sort-descending-symbolic" : "software-update-urgent-symbolic")}
      tooltipText={bind(Todo.filterMode).as(mode => mode === "nameID" ? "Sort by Newest" : "Sort by Priority")}
      onClicked={() => Todo.toggleFilterMode()}
      {...props}
    />
  ),
  

  AddButton: props => (
    <button
      sensitive={bind(Todo.isEditMode).as(edit => !edit)}
      onClicked={() => Todo.toggleInputVisibility()}
      {...props}
    >
      <image iconName="list-add-symbolic" />
    </button>
  ),

  BackButton: props => (
    <button
      onButtonPressed={() => Todo.navigateToTitlePage()}
      visible={bind(Todo.currentPage).as(page => page !== "TitlePage")}
      iconName="go-previous-symbolic"
      {...props}
    />
  ),

  EditButton: props => (
    <button
      iconName="document-edit-symbolic"
      onClicked={() => Todo.toggleEditMode()}
      {...props}
    />
  ),

  RemoveAllButton: props => (
    <button
      iconName="user-trash-symbolic"
      onClicked={() => Todo.removeAll()}
      visible={bind(Todo.isEditMode)}
      {...props}
    />
  ),

  PageLabel: props => (
    <label
      label={bind(Todo.currentPage).as(p => (p !== "TitlePage" ? "Task List" : "Todo List"))}
      maxWidthChars={maxLabelWidth}
      ellipsize={3}
      {...props}
    />
  ),

  TaskLabel: props => (
    bind(Todo.currentTodoId).as(id => {
      const todo = Todo.todos.get().find(t => t.nameID === id);
      return (
        <label
          label={todo?.name}
          visible={bind(Todo.currentPage).as(p => p !== "TitlePage")}
          maxWidthChars={maxLabelWidth}
          ellipsize={3}
          {...props}
        />
      );
    })
  ),

  TitleInput: props => (
    <revealer revealChild={bind(Todo.isTitleInputVisible)} {...props}>
      <box vertical spacing={10} cssName="inputTitleBox">
        <entry
          placeholderText="Add Title..."
          show-emoji-icon
          onNotifyText={e => Todo.titleInputText.set(e.text)}
          setup={el => (Todo.titleEntryRef = el)}
        />
        <box halign={3} spacing={5}>
          {Todo.priorityLevels.map(p => (
          <label
            key={p}
            label="⬤"
            cssClasses={["priority", p]}
            tooltipText={`Priority: [${p}]`}
            onButtonPressed={el => Todo.selectPriorityButton(el, p)}
          />
          ))}
        </box>
        <box>
          <button iconName="window-close-symbolic" onClicked={Todo.toggleInputVisibility} />
          <button
            hexpand
            label="Add Title +"
            onClicked={() => Todo.add()}
            sensitive={bind(Todo.titleInputText).as(t => !!t.trim())}
          />
        </box>
      </box>
    </revealer>
  ),

  TaskInput: props => (
    <revealer revealChild={bind(Todo.isTaskInputVisible)} {...props}>
      <box spacing={5} cssName="inputTaskBox">
        <entry
          placeholderText="Add Task..."
          show-emoji-icon
          onNotifyText={e => Todo.taskInputText.set(e.text)}
          setup={el => (Todo.taskEntryRef = el)}
        />
        <button
          iconName="list-add-symbolic"
          onClicked={() => Todo.add()}
          sensitive={bind(Todo.taskInputText).as(t => !!t.trim())}
        />
      </box>
    </revealer>
  ),
  

  List: props => (
    <box vertical {...props}>
      {bind(Todo.todoSort).as(data => (
        <stack visibleChildName={bind(Todo.currentPage)} transitionType={Gtk.StackTransitionType.SLIDE_LEFT_RIGHT}>
          {/* Title Page */}
          <GtkScrolledWindow name="TitlePage" vexpand hexpand vertical>
            <box vertical spacing={10} cssName="TitlePage">
              {data.map(todo => (
                  <box key={todo.nameID} spacing={5} cssName="listTitle">
                    <menubutton 
                      sensitive={bind(Todo.isEditMode)}
                      >
                      <label label="⬤" cssClasses={["showPriority", todo.priority]} />
                      <popover>
                        <box spacing={10}>
                          {Todo.priorityLevels.map(p => (
                          <label
                            setup={self => {
                              if (todo.priority === p) {
                                self.add_css_class("select");
                              }
                            }}
                            key={p}
                            label="⬤"
                            cssClasses={["priorityChange", p]}
                            tooltipText={`Priority: [${p}]`}
                            onButtonPressed={el => Todo.changePriority(el, todo.nameID, p)}
                          />
                          ))}
                        </box>
                      </popover>
                    </menubutton>
                    <box
                      sensitive={bind(Todo.isEditMode).as(edit => !edit)}
                      onButtonReleased={() => Todo.navigateToTaskPage(todo.nameID)}
                      spacing={5}
                    >
                      <label label={todo.name} maxWidthChars={maxLabelWidth} ellipsize={3} />
                      <box hexpand />
                      <label label={`${todo.progress} %`} />
                      <image
                        iconName="go-next-symbolic"
                        visible={bind(Todo.isEditMode).as(edit => !edit)}
                      />
                    </box>
                    <GtkCheckButton
                      inconsistent
                      visible={bind(Todo.isEditMode)}
                      onToggled={() => Todo.remove(todo.nameID)}
                    />
                  </box>
                ))}
            </box>
          </GtkScrolledWindow>

          {/* Task Page */}
          <GtkScrolledWindow name="TaskPage" vexpand hexpand vertical>
            <box vertical>
              <box vertical spacing={7} cssName="TaskPage">
                {bind(Todo.currentTodoId).as(activeId => {
                  const todo = data.find(t => t.nameID === activeId);
                  return todo?.tasks
                    .sort((a, b) => b.taskID - a.taskID)
                    .map(task => (
                      <box key={task.taskID}>
                        <GtkCheckButton
                          active={task.done}
                          label={task.title}
                          sensitive={bind(Todo.isEditMode).as(edit => !edit)}
                          cssClasses={task.done ? ["strikethrough"] : []}
                          onButtonPressed={el => Todo.toggleTaskDone(el, task.taskID)}
                        />
                        <box hexpand />
                        <GtkCheckButton
                          inconsistent
                          visible={bind(Todo.isEditMode)}
                          onToggled={() => Todo.remove(task.taskID)}
                        />
                      </box>
                    )) || (
                    <box>
                      <label label="No Task" />
                    </box>
                  );
                })}
              </box>
            </box>
          </GtkScrolledWindow>
        </stack>
      ))}
    </box>
  ),
};
