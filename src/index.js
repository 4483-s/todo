import "./styles/styles.css";
import dataObj from "./script/data.js";
import filterSort from "./script/filtersort.js";
import dom from "./script/domelement.js";
dom.allBtn.forEach((v) =>
  v.addEventListener("click", (e) => e.preventDefault()),
);
//
let filterMode = [undefined, "ndone", undefined];
let sortMode = [undefined];
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
// modify the filterMode array,
// take current sortMode to produce an filtered and sorted todo array
function makeFiltered(arr) {
  filterMode = arr;
  const list = dataObj.getTodo();
  return filterSort.sort(filterSort.filter(list, ...filterMode), ...sortMode);
}
dom.sideBarDiv.addEventListener("click", (e) => {
  switch (true) {
    case e.target.matches(".newtodo"):
      dom.addTodoDia.showModal();
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
      displayTodos(makeFiltered([undefined, "ndone", undefined]));

      break;
    case e.target.matches(".upcoming"):
      displayTodos(makeFiltered([undefined, "ndone", undefined]));

      break;
  }
});
addEventListener("DOMContentLoaded", () => {
  displayTodos(makeFiltered([undefined, "ndone", undefined]));
});
window.displayTodos = displayTodos;
window.dom = dom;
window.dataObj = dataObj;
window.filterSort = filterSort;
