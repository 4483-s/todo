const dia = document.querySelector('dialog.addtodo');
const title = dia.querySelector('[placeholder="Title"]');
const desc = dia.querySelector('[placeholder="Description"]');
const date = dia.querySelector('[type="date"]');
const priority = dia.querySelector('.priority');
const status = dia.querySelector('.status-checkbox');
const slctPjct = dia.querySelector('.select-project');
const confirmBtn = dia.querySelector('.confirm');
const addBtn = dia.querySelector('.temp.add');

export default {
  dia,
  title,
  desc,
  date,
  priority,
  status,
  slctPjct,
  confirmBtn,
  addBtn,
};
