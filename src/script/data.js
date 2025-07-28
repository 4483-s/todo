import localTransfer from "./utils/localtransfer.js";
const todo = [];
const project = [];
addEventListener("DOMContentLoaded", () => {
  const storedTodo = localTransfer.get("todoLocal");
  const storedProject = localTransfer.get("projectLocal");
  if (storedTodo) {
    todo.push(...storedTodo);
    todo.forEach((v) => (v.dueDate = new Date(v.dueDate)));
  }
  if (storedProject) {
    project.push(...storedProject);
  }
  return;
});
const getTodo = () => [...todo];
const getProject = () => [...project];
function makeTodo(
  title,
  description,
  due,
  priority,
  completed,
  projectId = null,
) {
  //must receive [yyyy, mm, dd] format to be compatible with filter
  const dueDate = new Date(...due);
  const id = crypto.randomUUID();
  // 0 priority means lowest priority, maximum is 2
  return { title, description, dueDate, priority, completed, projectId, id };
}
function makeProject(title) {
  const id = crypto.randomUUID();
  return { title, id };
}
//
const addTodo = (title, description, due, priority, completed, projectId) => {
  todo.push(makeTodo(title, description, due, priority, completed, projectId));
  todoToLocal();
};
const addProject = (title) => {
  project.push(makeProject(title));
  projectToLocal();
};
const editTodo = (id, title, description, due, priority, completed) => {
  // const index = todo.findIndex((v) => v.id === id);
  const index = findIdMatch(todo, id);
  todo[index].title = title;
  todo[index].description = description;
  todo[index].dueDate = due;
  todo[index].priority = priority;
  todo[index].completed = completed;
  todoToLocal();
};
const editProject = (id, title) => {
  // const index = project.findIndex((v) => v.id === id);
  const index = findIdMatch(project, id);
  project[index].title = title;

  projectToLocal();
};
const delelteItem = (type, id) => {
  //if type is true, delete a todo, otherwise a project
  const arr = type ? todo : project;
  // const index = arr.findIndex((v) => v.id === id);
  const index = findIdMatch(arr, id);
  arr.splice(index, 1);
  todoToLocal();
  projectToLocal();
};
const toggleTodoStatus = (id) => {
  const index = findIdMatch(todo, id);
  todo[index].completed = todo[index].completed ? false : true;
};
function findIdMatch(arr, id) {
  return arr.findIndex((v) => v.id === id);
}
function todoToLocal() {
  localTransfer.set("todoLocal", todo);
}
function projectToLocal() {
  localTransfer.set("projectLocal", project);
}
export default {
  getTodo,
  getProject,
  addTodo,
  addProject,
  editTodo,
  editProject,
  delelteItem,
  toggleTodoStatus,
};
