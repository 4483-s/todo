const dia = document.querySelector("dialog.addtodo");
const title = dia.querySelector('[placeholder="Title"]');
const desc = dia.querySelector('[placeholder="Description"]');
const date = dia.querySelector('[type="date"]');
const priority = dia.querySelector(".priority");
const slctPjct = dia.querySelector(".select-project");
const confirmBtn = dia.querySelector(".confirm");

export default { dia, title, desc, date, priority, slctPjct, confirmBtn };
