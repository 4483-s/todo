// import "./styles.css";
const dataObj = (function () {
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
  function makeTodo(title, description, due, priority, completed, projectId) {
    const dueDate = new Date(due);
    const id = crypto.randomUUID();
    return { title, description, dueDate, priority, completed, projectId, id };
  }
  function makeProject(title) {
    const id = crypto.randomUUID();
    return { title, id };
  }
  //
  const addTodo = (title, description, due, priority, completed, projectId) => {
    todo.push(
      makeTodo(title, description, due, priority, completed, projectId),
    );
    todoToLocal();
  };
  const addProject = (title) => {
    project.push(makeProject(title));
    projectToLocal();
  };
  const editTodo = (id, key, newValue) => {
    const index = todo.findIndex((v) => v.id === id);
    todo[index][key] = newValue;
    todoToLocal();
  };
  const editProject = (id, key, newValue) => {
    const index = project.findIndex((v) => v.id === id);
    project[index][key] = newValue;
    projectToLocal();
  };
  // const deleteTodo = (id) => {
  //   const index = todo.findIndex((v) => v.id === id);
  //   todo.splice(index, 1);
  // };
  // const deleteProject = (id) => {
  //   const index = project.findIndex((v) => v.id === id);
  //   project.splice(index, 1);
  // };
  const delelteItem = (type, id) => {
    //if type is true, delete a todo, otherwise a project
    const arr = type ? todo : project;
    const index = arr.findIndex((v) => v.id === id);
    arr.splice(index, 1);
    todoToLocal();
    projectToLocal();
  };

  function todoToLocal() {
    localTransfer.set("todoLocal", todo);
  }
  function projectToLocal() {
    localTransfer.set("projectLocal", project);
  }
  function customFilter(projectId = "", completed, date) {
    let origin = getTodo();
    const timeNow = new Date();
    if (projectId) {
      origin = origin.filter((v) => v.projectId === projectId);
    }
    if (completed) {
      origin = origin.filter((v) => v.completed);
    }
    switch (date) {
      case "missed":
        origin = origin.filter((v) => v.dueDate.getTime() < timeNow.getTime());
        break
      case "today":
        origin = origin.filter((v) => v.dueDate.getTime() = timeNow.getTime());
        break
      case "upcoming":
        origin = origin.filter((v) => v.dueDate.getTime() > timeNow.getTime());
        break
    }
  }
  return {
    getTodo,
    getProject,
    addTodo,
    addProject,
    editTodo,
    editProject,
    delelteItem,
  };
})();
const localTransfer = (function () {
  function get(keyName) {
    return JSON.parse(localStorage.getItem(keyName));
  }
  function set(keyName, value) {
    localStorage.setItem(keyName, JSON.stringify(value));
  }
  return { get, set };
})();
const showTodo = (function () {
  const all = () => dataObj.getTodo();
  const byProject = (projectId) => {
    const result = dataObj.getTodo().filter((v) => v.projectId === projectId);
    return result;
  };
  const completed = () => dataObj.getTodo().filter((v) => v.completed);
  const notCompleted = () => dataObj.getTodo().filter((v) => !v.completed);
  const today = () => {
    return dataObj.getTodo().filter((v) => {
      const today = new Date();
      return (
        v.dueDate.getDate() === today.getDate() &&
        v.dueDate.getFullYear() === today.getFullYear() &&
        v.dueDate.getMonth() === today.getMonth()
      );
    });
  };
  const upcoming = () => {
    return dataObj.getTodo().filter((v) => v.du);
  };
  return { all, byProject, completed, notCompleted, upcoming, today };
})();
