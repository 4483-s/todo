import binSrc from "../icons/bin-svgrepo-com.svg";
import editSrc from "../icons/edit-02-svgrepo-com.svg";
import { format } from "date-fns";
const allBtn = document.querySelectorAll("button");
const sideBarDiv = document.querySelector(".sidebar");
const topBtnsDiv = document.querySelectorAll(".topbtnsdiv");
const sortSelect = document.querySelector(".sort");
const main = document.querySelector(".main");
const projectDiv = document.querySelector(".projectdiv");
const newProjectBtn = document.querySelector(".newproject");
const newTodoBtn = document.querySelector(".newtodo");
const infoDiv = document.querySelector(".indo");
const addTodoDia = document.querySelector(".addtodo");
const addProjectDia = document.querySelector(".addproject");
const editTodoDia = document.querySelector(".edittodo");
const editProjectDia = document.querySelector(".editproject");

const binImg = () => {
  const img = document.createElement("img");
  img.src = binSrc;
  return img;
};
const editImg = () => {
  const img = document.createElement("img");
  img.src = editSrc;
  return img;
};

const mkTodoDiv = (todoObj, projectArr) => {
  function findProjectTitle(projectId, arr) {
    console.log(arr);
    const index = arr.findIndex((v) => v.id === projectId);
    if (index >= 0) {
      console.log(index);
      return arr[index].title;
    } else return "";
  }
  const container = document.createElement("div");
  const priorityDiv = document.createElement("div");
  const checkbox = document.createElement("input");
  const checkDiv = document.createElement("div");
  const titleDiv = document.createElement("div");
  const dateDiv = document.createElement("div");
  const projectDiv = document.createElement("div");
  const editBtn = editImg();
  const deleteBtn = binImg();
  const editBtnDiv = document.createElement("div");
  const deleteBtnDiv = document.createElement("div");

  checkbox.type = "checkbox";
  //
  titleDiv.textContent = todoObj.title;
  projectDiv.textContent = findProjectTitle(todoObj.projectId, projectArr);
  todoObj.completed ? (checkbox.checked = true) : (checkbox.checked = false);
  container.setAttribute("data-todo-id", todoObj.id);
  dateDiv.textContent = format(todoObj.dueDate, "dd/MM/yyyy");
  editBtn.classList.add("edit");
  deleteBtn.classList.add("delete");
  checkbox.classList.add("check");
  //
  checkDiv.append(checkbox);
  editBtnDiv.append(editBtn);
  deleteBtnDiv.append(deleteBtn);
  container.append(
    priorityDiv,
    checkDiv,
    titleDiv,
    dateDiv,
    projectDiv,
    editBtnDiv,
    deleteBtnDiv,
  );
  return container;
};
const mkProjectDiv = (projectObj) => {
  const container = document.createElement("div");
  const titleDiv = document.createElement("div");
  const editBtnDiv = document.createElement("div");
  const deleteBtnDiv = document.createElement("div");
  const editBtn = editImg();
  const deleteBtn = binImg();
  editBtn.classList.add("edit");
  deleteBtn.classList.add("delete");
  titleDiv.textContent = projectObj.title;
  editBtnDiv.append(editBtn);
  deleteBtnDiv.append(deleteBtn);
  container.setAttribute("data-project-id", projectObj.id);
  container.append(titleDiv, editBtnDiv, deleteBtnDiv);
  return container;
};
export default {
  allBtn,
  sideBarDiv,
  topBtnsDiv,
  sortSelect,
  main,
  projectDiv,
  newProjectBtn,
  newTodoBtn,
  infoDiv,
  addTodoDia,
  addProjectDia,
  editTodoDia,
  editProjectDia,
  mkTodoDiv,
  mkProjectDiv,
};
