import binSrc from "../icons/bin-svgrepo-com.svg";
import editSrc from "../icons/edit-02-svgrepo-com.svg";
import dataObj from "./data.js";
function findProjectTitle(projectId) {
  const arr = dataObj.getProject();
  const index = arr.findIndex((v) => v.id === projectId);
  if (index >= 0) {
    console.log(index);
    return arr[index].title;
  } else return "";
}
const binImg = document.createElement("img");
const editImg = document.createElement("img");
binImg.src = binSrc;
editImg.src = editSrc;

const mkTodoDiv = (todoObj) => {
  const container = document.createElement("div");
  const priorityDiv = document.createElement("div");
  const checkbox = document.createElement("input");
  const checkDiv = document.createElement("div");
  const titleDiv = document.createElement("div");
  const dateDiv = document.createElement("div");
  const projectDiv = document.createElement("div");
  const buttonDiv = document.createElement("div");
  const editDiv = document.createElement("div");
  const binDiv = document.createElement("div");
  checkbox.type = "checkbox";
  //
  titleDiv.textContent = todoObj.title;
  projectDiv.textContent = findProjectTitle(todoObj.projectId);
  todoObj.completed ? (checkbox.checked = true) : (checkbox.checked = false);
  //
  editDiv.addEventListener();
  editDiv.append(editImg);
  binDiv.append(binImg);
  checkDiv.append(checkbox);
  container.append(
    priorityDiv,
    checkDiv,
    titleDiv,
    dateDiv,
    projectDiv,
    buttonDiv,
  );
  return container;
};
export { mkTodoDiv };
