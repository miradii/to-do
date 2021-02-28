import { project } from "ramda"
import {
  closeTaskEditors,
  renderTab,
  clearContent,
  rotateArrow,
} from "./DomController"
import { addTaskToProject, allProjects } from "./ProjectRepo"
//open task editor on clicking the arrow
function taskOpen(e) {
  let task = e.target.parentElement

  while (!task.classList.contains("task")) task = task.parentElement

  const taskEditor = task.querySelector("#taskEditor")
  if (taskEditor.classList.contains("editor-on")) {
    rotateArrow(task)
    taskEditor.classList.remove("editor-on")
  } else {
    closeTaskEditors()
    rotateArrow(task)
    taskEditor.classList.add("editor-on")
  }
}

//create new Task when Enter is pressed in the input box
function makeNewTask(event, taskTitle, projectTitle) {
  if (event.keyCode == 13) {
    if (taskTitle() != "") {
      addTaskToProject(allProjects, taskTitle(), projectTitle())
      clearContent()
      renderTab("Today")
    } // this should change to get this as a parameter or something
  }
}
export { taskOpen, makeNewTask }
