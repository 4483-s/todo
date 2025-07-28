function filter(list, projectId = false, status = false, date = false) {
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
function sort(list, prio = false) {
  switch (prio) {
    case "lowToHigh":
      list.sort((a, b) => a.priority - b.priority);
      break;
    case "highToLow":
      list.sort((a, b) => b.priority - a.priority);
      break;

    default:
      list.reverse();
  }
  return list;
}
export default { filter, sort };
