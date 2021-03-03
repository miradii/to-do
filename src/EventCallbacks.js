import Project from "./project"
import {
  closeTaskEditors,
  renderTab,
  clearContent,
  rotateArrow,
} from "./DomController"
import {
  updateProject,
  setAllProjectsMap,
  getAllProjectsMap,
} from "./ProjectRepo"
import { makeTask } from "./Task"
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
      setAllProjectsMap(
        updateProject(
          getAllProjectsMap(),
          projectTitle(),
          Project.addTask(makeTask(taskTitle()))
        )
      )
      console.log(getAllProjectsMap())
      clearContent()
      renderTab("Today")
    } // this should change to get this as a parameter or something
  }
}
export { taskOpen, makeNewTask }
