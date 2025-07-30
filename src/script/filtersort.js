function filter(list, projectId = null, status = null, date = null) {
  if (projectId) {
    list = list.filter((v) => v.projectId === projectId);
  }
  switch (status) {
    case "done":
      list = list.filter((v) => v.completed);
      break;
    case "ndone":
      list = list.filter((v) => !v.completed);
  }

  if (date) {
    const timeNow = new Date();
    const dateNow = new Date(
      timeNow.getFullYear(),
      timeNow.getMonth(),
      timeNow.getDate(),
    );
    switch (date) {
      case "past":
        list = list.filter((v) => v.dueDate.getTime() < dateNow.getTime());
        break;
      case "today":
        list = list.filter((v) => v.dueDate.getTime() === dateNow.getTime());
        break;
      case "future":
        list = list.filter((v) => v.dueDate.getTime() >= dateNow.getTime());
        break;
    }
  }
  return list;
}
function sort(list, option = null) {
  switch (option) {
    case "lowtohigh":
      list.sort((a, b) => a.priority - b.priority);
      break;
    case "hightolow":
      list.sort((a, b) => b.priority - a.priority);
      break;
    case "oldtonew":
      break;
    default:
      list.reverse();
  }
  return list;
}
export default { filter, sort };
