function get(keyName) {
  return JSON.parse(localStorage.getItem(keyName));
}
function set(keyName, value) {
  localStorage.setItem(keyName, JSON.stringify(value));
}
export default { get, set };
