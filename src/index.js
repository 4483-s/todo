import "./styles/styles.css";
import data from "./script/data.js";
import filterSort from "./script/filtersort.js";
import dom from "./script/domelement.js";
import mkDom from "./script/mkdom.js";
import addPjctDia from "./script/addpjctdia.js";
import addTodoDia from "./script/addtododia.js";
//prevent default for all buttons
dom.allBtn.forEach((v) =>
  v.addEventListener("click", (e) => e.preventDefault()),
);
function closeAllDia() {
  document.querySelector("dialog[open]").close();
  for (const v of document.forms) {
    v.reset();
  }
}
// close dialog once a cancel button is clicked
addEventListener("click", (e) => {
  if (e.target.matches("button.cancel")) {
    closeAllDia();
  }
});
//
let filterMode = [undefined, "ndone", undefined];
let sortMode = null;

//take current modes and refresh the todo list page
function displayTodos() {
  while (dom.main.firstElementChild) {
    dom.main.firstElementChild.remove();
  }
  const todoArr = filterSort.sort(
    filterSort.filter(data.getTodo(), ...filterMode),
    sortMode,
  );
  for (const key of todoArr) {
    const item = mkDom.mkTodoDiv(key, data.getProject());
    dom.main.appendChild(item);
  }
}
//display and refresh project div
function displayPjcts() {
  while (dom.pjctDiv.firstElementChild) {
    dom.pjctDiv.firstElementChild.remove();
  }
  for (const key of data.getProject()) {
    const item = mkDom.mkPjctDiv(key);
    dom.pjctDiv.appendChild(item);
  }
}
// modify the filterMode array,
// take current sortMode to produce a filtered and sorted todo array
//
dom.sideBarDiv.addEventListener("click", (e) => {
  function makeFiltered(arr) {
    filterMode = arr;
  }
  switch (true) {
    case e.target.matches(".newtodo"):
      addTodoDia.dia.showModal();
      while (dom.projectSlct.firstElementChild) {
        dom.projectSlct.firstElementChild.remove();
      }
      mkDom.mkPjctSlctOpt(data.getProject(), dom.projectSlct);
      break;
    case e.target.matches(".newpjct"):
      addPjctDia.dia.showModal();

      break;

    case e.target.matches(".all"):
      makeFiltered([undefined, undefined, undefined]);
      displayTodos();
      break;
    case e.target.matches(".allpending"):
      makeFiltered([undefined, "ndone", undefined]);
      displayTodos();
      break;
    case e.target.matches(".completed"):
      makeFiltered([undefined, "done", undefined]);
      displayTodos();
      break;
    case e.target.matches(".today"):
      makeFiltered([undefined, "ndone", "today"]);
      displayTodos();
      break;
    case e.target.matches(".upcoming"):
      makeFiltered([undefined, "ndone", "future"]);
      displayTodos();
      break;
    case e.target.matches("div[data-project-id]"):
      makeFiltered([
        e.target.getAttribute("data-project-id"),
        undefined,
        undefined,
      ]);
      displayTodos();
      break;
  }
});
// modify the sortMode string,
// take current sortMode to produce a filtered and sorted todo array
dom.sortSlct.addEventListener("click", (e) => {
  function makeSorted(str) {
    sortMode = str;
  }
  if (e.target.matches("option")) {
    makeSorted(e.target.value);
    displayTodos();
  }
});
addPjctDia.confirmBtn.addEventListener("click", () => {
  data.addProject(addPjctDia.title.value);
  displayPjcts();
  closeAllDia();
});
addTodoDia.confirmBtn.addEventListener("click", () => {
  console.log(addTodoDia.date.value);
  const numDate = addTodoDia.date.value.split("-").map((v) => +v);
  numDate[1]--;
  data.addTodo(
    addTodoDia.title.value,
    addTodoDia.desc.value,
    numDate,
    addTodoDia.priority.value,
    false,
    addTodoDia.slctPjct.value,
  );
  closeAllDia();
  displayTodos();
});
// load existing todos and projects from locatStorage
addEventListener("DOMContentLoaded", () => {
  displayTodos();
  displayPjcts();
});

window.displayTodos = displayTodos;
window.dom = dom;
window.data = data;
window.filterSort = filterSort;
