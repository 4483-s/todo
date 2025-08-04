import localTransfer from './utils/localtransfer.js';
const todo = [];
const project = [];
addEventListener('DOMContentLoaded', () => {
  const storedTodo = localTransfer.get('todoLocal');
  const storedProject = localTransfer.get('projectLocal');
  if (storedTodo) {
    todo.push(...storedTodo);
    todo.forEach(v => (v.dueDate = new Date(v.dueDate)));
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
  todo.unshift(
    makeTodo(title, description, due, priority, completed, projectId),
  );
  todoToLocal();
};
const addProject = title => {
  project.unshift(makeProject(title));
  projectToLocal();
};
const editTodo = (
  id,
  title,
  description,
  due,
  priority,
  completed,
  projectId,
) => {
  const target = getById(true, id);
  target.title = title;
  target.description = description;
  target.dueDate = due;
  target.priority = priority;
  target.completed = completed;
  target.projectId = projectId;
  todoToLocal();
};
const editProject = (id, title) => {
  // const index = findIdMatch(project, id);
  // project[index].title = title;
  // projectToLocal();
  const target = getById(false, id);
  target.title = title;
  projectToLocal();
};
const delelteItem = (type, id) => {
  //if type is true, delete a todo, otherwise a project
  const arr = type ? todo : project;
  //if a project is deleted, all the todo of this project will be deleted
  if (!type) {
    const filtered = todo.filter(v => !v.projectId === id);
    todo.splice(0);
    todo.push(...filtered);
  }
  const index = findIdMatch(arr, id);
  arr.splice(index, 1);
  todoToLocal();
  projectToLocal();
};
const toggleTodoStatus = id => {
  const target = getById(true, id);
  target.completed = !target.completed;
  todoToLocal();
};
const getById = (type, id) => {
  const arr = type ? todo : project;
  return arr.find(v => v.id === id);
};
function findIdMatch(arr, id) {
  return arr.findIndex(v => v.id === id);
}

function todoToLocal() {
  localTransfer.set('todoLocal', todo);
}
function projectToLocal() {
  localTransfer.set('projectLocal', project);
}
export default {
  getTodo,
  getProject,
  getById,
  addTodo,
  addProject,
  editTodo,
  editProject,
  delelteItem,
  toggleTodoStatus,
};
