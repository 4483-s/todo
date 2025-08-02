import binSrc from "../icons/bin-svgrepo-com.svg";
import editSrc from "../icons/edit-02-svgrepo-com.svg";
import redSrc from "../icons/red-circle.svg";
import greenSrc from "../icons/green-circle.svg";
import yellowSrc from "../icons/yellow-circle.svg";
import { format } from "date-fns";

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
const redImg = () => {
  const img = document.createElement("img");
  img.src = redSrc;
  return img;
};
const yellowImg = () => {
  const img = document.createElement("img");
  img.src = yellowSrc;
  return img;
};
const greenImg = () => {
  const img = document.createElement("img");
  img.src = greenSrc;
  return img;
};
function addIdLoop(id, attr, ...argu) {
  for (let i = 0; i < argu.length; i++) {
    argu[i].setAttribute(attr, id);
  }
}
const mkTodoDiv = (todoObj, pjctArr) => {
  function findPjctTitle(projectId, arr) {
    const index = arr.findIndex((v) => v.id === projectId);
    if (index >= 0) {
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
  const descDiv = document.createElement("div");
  checkbox.type = "checkbox";
  //
  titleDiv.textContent = todoObj.title;
  projectDiv.textContent = findPjctTitle(todoObj.projectId, pjctArr);
  todoObj.completed ? (checkbox.checked = true) : (checkbox.checked = false);
  dateDiv.textContent = format(todoObj.dueDate, "dd/MM/yyyy");
  editBtn.classList.add("edit");
  deleteBtn.classList.add("delete");
  checkbox.classList.add("check");
  descDiv.classList.add("hidden");
  editBtn.classList.add("hidden");
  deleteBtn.classList.add("hidden");
  container.classList.add("todoItem");
  addIdLoop(
    todoObj.id,
    "data-todo-id",
    container,
    priorityDiv,
    checkDiv,
    titleDiv,
    dateDiv,
    priorityDiv,
    editBtn,
    deleteBtn,
    editBtnDiv,
    deleteBtnDiv,
    descDiv,
  );
  //
  priorityDiv.appendChild(
    todoObj.priority === 2
      ? redImg()
      : todoObj.priority === 1
        ? yellowImg()
        : greenImg(),
  );
  checkDiv.append(checkbox);
  editBtnDiv.append(editBtn);
  deleteBtnDiv.append(deleteBtn);
  container.addEventListener("mouseenter", () => {
    editBtn.classList.remove("hidden");
    deleteBtn.classList.remove("hidden");
  });
  container.addEventListener("mouseleave", () => {
    editBtn.classList.add("hidden");
    deleteBtn.classList.add("hidden");
  });
  container.append(
    priorityDiv,
    checkDiv,
    titleDiv,
    dateDiv,
    projectDiv,
    editBtnDiv,
    deleteBtnDiv,
    descDiv,
  );
  return container;
};
const mkPjctDiv = (pjctObj) => {
  const container = document.createElement("div");
  const titleDiv = document.createElement("div");
  const editBtnDiv = document.createElement("div");
  const deleteBtnDiv = document.createElement("div");
  const editBtn = editImg();
  const deleteBtn = binImg();
  deleteBtn.classList.add("hidden");
  editBtn.classList.add("hidden");
  editBtn.classList.add("edit");
  deleteBtn.classList.add("delete");
  titleDiv.textContent = pjctObj.title;
  editBtnDiv.append(editBtn);
  deleteBtnDiv.append(deleteBtn);
  addIdLoop(
    pjctObj.id,
    "data-project-id",
    container,
    titleDiv,
    editBtnDiv,
    deleteBtnDiv,
    deleteBtn,
    editBtn,
  );
  container.addEventListener("mouseenter", () => {
    editBtn.classList.remove("hidden");
    deleteBtn.classList.remove("hidden");
  });
  container.addEventListener("mouseleave", () => {
    editBtn.classList.add("hidden");
    deleteBtn.classList.add("hidden");
  });
  container.append(titleDiv, editBtnDiv, deleteBtnDiv);
  container.classList.add("pjctItem");
  return container;
};
function mkPjctSlctOpt(pjctArr, target) {
  const emptyOpt = document.createElement("option");
  emptyOpt.value = "";
  emptyOpt.textContent = "Non";
  target.appendChild(emptyOpt);
  for (const obj of pjctArr) {
    const opt = document.createElement("option");
    opt.textContent = obj.title;
    opt.value = obj.id;
    target.appendChild(opt);
  }
}
export default {
  mkTodoDiv,
  mkPjctDiv,
  mkPjctSlctOpt,
};
