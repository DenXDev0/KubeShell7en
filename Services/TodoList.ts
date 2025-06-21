import { readFile, writeFile, Variable, bind } from "astal";
import { Gtk } from "astal/gtk4";

const FILE_PATH = "utils/todoList.json";

const getNextId = (list, key) => {
  let max = 0;
  for (const item of list) max = Math.max(max, item[key] ?? 0);
  return max + 1;
};

export const Todo = {
  // === State ===
  todos: Variable([]),
  currentPage: Variable("TitlePage"),
  currentTodoId: Variable(),
  isEditMode: Variable(false),

  titleInputText: Variable(""),
  taskInputText: Variable(""),
  selectedPriority: Variable("none"),

  isTitleInputVisible: Variable(false),
  isTaskInputVisible: Variable(false),

  // === Widget References ===
  titleEntryRef: null,
  taskEntryRef: null,
  priorityButtonRef: null,

  priorityLevels: ["critical", "urgent", "high", "medium", "low", "optional"],

  // === Helpers ===
  get currentTodo() {
    return this.todos.get().find(todo => todo.nameID === this.currentTodoId.get());
  },

  updateTodos(newTodos = this.todos.get()) {
    this.todos.set([...newTodos]);
  },

  updateProgress(todo) {
    const totalTasks = todo.tasks.length;
    const completedTasks = todo.tasks.filter(task => task.done).length;
    todo.progress = Math.round((completedTasks / (totalTasks || 1)) * 100);
  },

  clearInputs() {
    this.titleEntryRef?.set_text("");
    this.taskEntryRef?.set_text("");
    this.selectedPriority.set("none");
    this.priorityButtonRef?.remove_css_class("select");
    this.priorityButtonRef = null;
  },

  // === CRUD ===
  add() {
    const todos = this.todos.get();
    const page = this.currentPage.get();
    const inputText = page === "TitlePage" ? this.titleInputText : this.taskInputText;
    const trimmedText = inputText.get().trim();
    if (!trimmedText) return;

    if (page === "TitlePage") {
      todos.push({
        nameID: getNextId(todos, "nameID"),
        name: trimmedText,
        priority: this.selectedPriority.get(),
        progress: 0,
        tasks: [],
      });
      this.isTitleInputVisible.set(false);
    } else {
      const todo = this.currentTodo;
      if (todo) {
        todo.tasks.push({
          taskID: getNextId(todo.tasks, "taskID"),
          title: trimmedText,
          done: false
        });
        this.taskEntryRef?.set_text("");
      }
    }
    this.updateTodos(todos);
  },

  remove(id) {
    const todos = this.todos.get();
    const page = this.currentPage.get();

    if (page === "TitlePage") {
      this.updateTodos(todos.filter(todo => todo.nameID !== id));
    } else {
      const todo = this.currentTodo;
      if (todo) {
        todo.tasks = todo.tasks.filter(task => task.taskID !== id);
        this.updateTodos(todos);
      }
    }
  },

  removeAll() {
    const page = this.currentPage.get();
    const todos = this.todos.get();

    if (page === "TitlePage") {
      this.todos.set([]);
    } else {
      const todo = this.currentTodo;
      if (todo) todo.tasks = [];
      this.updateTodos(todos);
    }
    this.isEditMode.set(false);
  },

  toggleTaskDone(_, taskId) {
    const todo = this.currentTodo;
    const task = todo?.tasks.find(task => task.taskID === taskId);
    if (!task) return;

    task.done = !task.done;
    this.updateProgress(todo);
    this.updateTodos();
  },

  // === Mode / Input ===
  toggleInputVisibility() {
    const toggleVar = this.currentPage.get() === "TitlePage" ? this.isTitleInputVisible : this.isTaskInputVisible;
    toggleVar.set(!toggleVar.get());
    this.isEditMode.set(false);
  },

  toggleEditMode() {
    this.isEditMode.set(!this.isEditMode.get());
    this.isTitleInputVisible.set(false);
    this.isTaskInputVisible.set(false);
  },

  // === Priority ===
  selectPriorityButton(widget, priority) {
    const isSelected = widget.has_css_class("select");
    this.priorityButtonRef?.remove_css_class("select");

    if (isSelected) {
      this.selectedPriority.set("none");
      this.priorityButtonRef = null;
    } else {
      widget.add_css_class("select");
      this.selectedPriority.set(priority);
      this.priorityButtonRef = widget;
    }
  },

  changePriority(_, todoId, priority) {
    const todos = this.todos.get();
    const todo = todos.find(todo => todo.nameID === todoId);
    if (todo) {
      todo.priority = priority;
      this.updateTodos(todos);
    }
  },

  // === Navigation ===
  navigateToTaskPage(todoId) {
    this.currentTodoId.set(todoId);
    this.currentPage.set("TaskPage");
    this.isTitleInputVisible.set(false);
    this.isEditMode.set(false);
  },

  navigateToTitlePage() {
    this.currentPage.set("TitlePage");
    this.currentTodoId.set(null);
    this.isTaskInputVisible.set(false);
    this.isEditMode.set(false);
  },

  // === File Handling ===
  loadTodos() {
    try {
      const data = JSON.parse(readFile(FILE_PATH)) ?? [];
      this.todos.set(data);
    } catch {
      print("⚠️ Failed to load file. Using empty list.");
    }
  },

  saveTodos() {
    this.todos.subscribe(data => {
      try {
        writeFile(FILE_PATH, JSON.stringify(data, null, 2));
        print("✅ Todos saved.");
      } catch (e) {
        print("❌ Failed to save todos:", e);
      }
    });
  },

  // === Initialization ===
  resetInputs() {
    this.isTitleInputVisible.subscribe(visible => {
      if (!visible) this.clearInputs();
    });
    this.isTaskInputVisible.subscribe(visible => {
      if (!visible) this.taskEntryRef?.set_text("");
    });
  },

  filterMode: Variable("nameID"),

  get todoSort() {
    return Variable.derive([bind(this.todos), bind(this.filterMode)], (data, mode) => (
      [...data].sort((a, b) =>
        mode === "priority"
          ? this.priorityLevels.indexOf(a.priority) - this.priorityLevels.indexOf(b.priority)
          : b.nameID - a.nameID
      )
    ));
  },  

  toggleFilterMode() {
    const current = this.filterMode.get();
    this.filterMode.set(current === "nameID" ? "priority" : "nameID");
  },

};

// Initialize
Todo.loadTodos();
Todo.saveTodos();
Todo.resetInputs();
