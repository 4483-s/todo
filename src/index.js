import "./styles/styles.css";
import data from "./script/data.js";
import filterSort from "./script/filtersort.js";
import dom from "./script/dom.js";
import mkDom from "./script/mkdom.js";
import pjctDia from "./script/pjctdia.js";
import todoDia from "./script/tododia.js";
//prevent default for all buttons
dom.allBtn.forEach((v) =>
  v.addEventListener("click", (e) => e.preventDefault()),
);
function closeAllDia() {
  const dia = document.querySelector("dialog[open]");
  if (dia) {
    dia.close();
    for (const v of document.forms) {
      v.reset();
    }
  }
}
addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeAllDia();
  }
});
// close dialog once a cancel button is clicked
addEventListener("click", (e) => {
  switch (true) {
    case e.target.matches("button.cancel"):
      closeAllDia();
      break;
    case e.target.matches("img.delete[data-project-id]"):
      data.delelteItem(false, e.target.getAttribute("data-project-id"));
      displayPjcts();
      displayTodos();
      break;
    case e.target.matches("img.delete[data-todo-id]"): {
      const id = e.target.getAttribute("data-todo-id");
      data.delelteItem(true, id);
      const str = `div.todoItem[data-todo-id='${id}']`;
      document.querySelector(str).remove();
      break;
    }
  }
});
//
const modes = {
  filter: [undefined, "ndone", undefined],
  sort: null,
};
//take current modes and refresh the todo list page
function displayTodos() {
  while (dom.main.firstElementChild) {
    dom.main.firstElementChild.remove();
  }
  const todoArr = filterSort.sort(
    filterSort.filter(data.getTodo(), ...modes.filter),
    modes.sort,
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
// modify the modes.filter array,
// take current modes.sort to produce a filtered and sorted todo array
//
dom.sideBarDiv.addEventListener("click", (e) => {
  function mkFiltered(arr) {
    modes.filter = arr;
  }
  switch (true) {
    case e.target.matches(".newtodo"):
      todoDia.dia.showModal();
      while (dom.projectSlct.firstElementChild) {
        dom.projectSlct.firstElementChild.remove();
      }
      mkDom.mkPjctSlctOpt(data.getProject(), dom.projectSlct);
      break;
    case e.target.matches(".newpjct"):
      pjctDia.dia.showModal();

      break;

    case e.target.matches(".all"):
      mkFiltered([undefined, undefined, undefined]);
      displayTodos();
      break;
    case e.target.matches(".allpending"):
      mkFiltered([undefined, "ndone", undefined]);
      displayTodos();
      break;
    case e.target.matches(".completed"):
      mkFiltered([undefined, "done", undefined]);
      displayTodos();
      break;
    case e.target.matches(".today"):
      mkFiltered([undefined, "ndone", "today"]);
      displayTodos();
      break;
    case e.target.matches(".upcoming"):
      mkFiltered([undefined, "ndone", "future"]);
      displayTodos();
      break;
    case e.target.matches("div[data-project-id]"):
      mkFiltered([
        e.target.getAttribute("data-project-id"),
        undefined,
        undefined,
      ]);
      displayTodos();
      break;
  }
});
// modify the modes.sort string,
// take current modes.sort to produce a filtered and sorted todo array
dom.sortSlct.addEventListener("click", (e) => {
  function mkSorted(str) {
    modes.sort = str;
  }
  if (e.target.matches("option")) {
    mkSorted(e.target.value);
    displayTodos();
  }
});
pjctDia.confirmBtn.addEventListener("click", () => {
  data.addProject(pjctDia.title.value);
  displayPjcts();
  closeAllDia();
});
todoDia.confirmBtn.addEventListener("click", () => {
  console.log(todoDia.date.value);
  const numDate = todoDia.date.value.split("-").map((v) => +v);
  numDate[1]--;
  data.addTodo(
    todoDia.title.value,
    todoDia.desc.value,
    numDate,
    +todoDia.priority.value,
    false,
    todoDia.slctPjct.value,
  );
  closeAllDia();
  displayTodos();
});
function openTodoDia(id = null) {
  if (id) {
    todoDia.confirmBtn.textContent = "Confirm";
    todoDia.confirmBtn.classList.add("editting");
  }
}
function openPjctDia(id = null) {
  if (id) {
    pjctDia.confirmBtn.textContent = "Confirm";
    pjctDia.confirmBtn.classList.add("editting");
  }
}
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// load existing todos and projects from locatStorage
addEventListener("DOMContentLoaded", () => {
  displayTodos();
  displayPjcts();
});

window.displayTodos = displayTodos;
window.dom = dom;
window.data = data;
window.filterSort = filterSort;
