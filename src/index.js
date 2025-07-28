import "./styles.css";
import dataObj from "./script/data.js";
import filterSort from "./script/filtersort.js";
import { format } from "date-fns";
import domEl from "./script/domelement.js";
const domElements = (function () {
  const topBtns = document.querySelectorAll(".topBtns");
  const main = document.querySelector(".main");
  const newProjectBtn = document.querySelector("newProject");
  const makeProjectEl = () => {
    const main = document.createElement("div");
    const iconDiv = document.createElement("div");
  };
  return { topBtns, main, newProjectBtn };
})();
const bu = document.querySelectorAll("button");
bu.forEach((v) => v.addEventListener("click", (e) => e.preventDefault()));
document.querySelector(".today").onclick = () => console.log("hi");
window.dataObj = dataObj;
window.filterSort = filterSort;
