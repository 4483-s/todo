import "./styles/styles.css";
import dataObj from "./script/data.js";
import filterSort from "./script/filtersort.js";
import dom from "./script/domelement.js";
//prevent default for all buttons
dom.allBtn.forEach((v) =>
  v.addEventListener("click", (e) => e.preventDefault()),
);
//
let filterMode = [undefined, "ndone", undefined];
let sortMode = null;
// take an array of todo to refresh the main page
function displayTodos(todoArr) {
  while (dom.main.firstElementChild) {
    dom.main.firstElementChild.remove();
  }
  for (const key of todoArr) {
    const item = dom.mkTodoDiv(key, dataObj.getProject());
    dom.main.appendChild(item);
  }
}
//display and refresh project div
function displayProjects() {
  while (dom.pjctDiv.firstElementChild) {
    dom.pjctDiv.firstElementChild.remove();
  }
  for (const key of dataObj.getProject()) {
    const item = dom.mkProjectDiv(key);
    dom.pjctDiv.appendChild(item);
  }
}
// modify the filterMode array,
// take current sortMode to produce a filtered and sorted todo array
//
dom.sideBarDiv.addEventListener("click", (e) => {
  function makeFiltered(arr) {
    filterMode = arr;
    const list = dataObj.getTodo();
    return filterSort.sort(filterSort.filter(list, ...filterMode), sortMode);
  }
  switch (true) {
    case e.target.matches(".newtodo"):
      dom.addTodoDia.showModal();
      while (dom.projectSelect.firstElementChild) {
        dom.projectSelect.firstElementChild.remove();
      }
      dom.projectSelect.appendChild(
        dom.mkProjectSelectOpt(dataObj.getProject()),
      );
      break;
    case e.target.matches(".newproject"):
      dom.editTodoDia.showModal();
      break;
    case e.target.matches(".all"):
      displayTodos(makeFiltered([undefined, "ndone", undefined]));
      break;
    case e.target.matches(".completed"):
      displayTodos(makeFiltered([undefined, "done", undefined]));
      break;
    case e.target.matches(".today"):
      displayTodos(makeFiltered([undefined, "ndone", "today"]));
      break;
    case e.target.matches(".upcoming"):
      displayTodos(makeFiltered([undefined, "ndone", "future"]));
      break;
    case e.target.matches("[data-project-id]"):
      displayTodos(
        makeFiltered([
          e.target.getAttribute("data-project-id"),
          "ndone",
          "future",
        ]),
      );
      break;
  }
});
//
// modify the sortMode string,
// take current sortMode to produce a filtered and sorted todo array
dom.sortSelect.addEventListener("click", (e) => {
  function makeSorted(str) {
    sortMode = str;
    const list = dataObj.getTodo();
    return filterSort.sort(filterSort.filter(list, ...filterMode), sortMode);
  }
  if (e.target.matches("option")) {
    displayTodos(makeSorted(e.target.value));
  }
});
// load existing todos and projects from locatStorage
addEventListener("DOMContentLoaded", () => {
  displayTodos(
    filterSort.filter(
      filterSort.sort(dataObj.getTodo(), sortMode),
      ...filterMode,
    ),
  );
  displayProjects();
});

window.displayTodos = displayTodos;
window.dom = dom;
window.dataObj = dataObj;
window.filterSort = filterSort;
