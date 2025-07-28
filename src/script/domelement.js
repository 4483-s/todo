import doc from "./utils/selector.js";
const topBtns = doc.sAll(".topbtnsdiv > .filter");
const sortSelect = doc.s(".sort");
const main = doc.s(".main");
const newProjectBtn = doc.s(".newproject");
const newTodoBtn = doc.s(".newtodo");
const infoDiv = doc.s(".indo");
const mkTodoDiv = (todoObj) => {
  const container = doc.cEl("div");
};
export default { topBtns, sortSelect, main, newProjectBtn, newTodoBtn };
