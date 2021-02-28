import { buildTab } from "./tabBuilder"
import { compose } from "ramda"
//get all neede elements up here
const projectsTab = document.getElementById("projectsTab")
const scheduledTab = document.getElementById("scheduledTab")
const todayTab = document.getElementById("todayTab")
const content = document.getElementById("content")
//addEvents
function addEvents() {
  console.log(projectsTab)
  projectsTab.addEventListener("click", () => renderTab("Projects"))
  todayTab.addEventListener("click", () => renderTab("Today"))
}
//logic for tabs and rendering
function clearContent() {
  while (content.hasChildNodes()) {
    content.removeChild(content.lastChild)
  }
}

function appendTab(tabElements) {
  clearContent()
  content.appendChild(tabElements)
}

const renderTab = compose(appendTab, buildTab)

// a function to get all the task elements
function getTaskEditors() {
  return document.querySelectorAll(".task-edit")
}
// a helper funtion to close all open task editors
function closeTaskEditors() {
  getTaskEditors().forEach((taskElement) => {
    if (taskElement.classList.contains("editor-on")) {
      rotateArrow(getTaskfromChild(taskElement))
      taskElement.classList.remove("editor-on")
    }
  })
}

function rotateArrow(task) {
  const arrow = task.querySelector("#openTask")
  arrow.classList.contains("rotated")
    ? arrow.classList.remove("rotated")
    : arrow.classList.add("rotated")
}

// I need a function that gets to the task element from it's children
function getTaskfromChild(taskChild) {
  let task = taskChild
  while (!task.classList.contains("task")) task = task.parentElement
  return task
}
//** getting all the input elemnts here */

//return the projectSelector option element
function getProjectSelector() {
  return document.querySelector("#projectSelector")
}
//get new task name from nameInputter
function getTaskNameInput() {
  return document.querySelector("#nameInput")
}
export {
  addEvents,
  closeTaskEditors,
  renderTab,
  clearContent,
  rotateArrow,
  getTaskNameInput,
  getProjectSelector,
}
