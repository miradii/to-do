import { makeMultipleTaskElements } from "./TaskView"
import { makeTaskInput } from "./taskInputView"
import { project } from "ramda"
function makeTodayTab(allProjects) {
  const taskContainer = document.createElement("div")
  taskContainer.className = "task-container"

  let allTasks = []
  for (let project of allProjects) {
    allTasks = allTasks.concat(
      makeMultipleTaskElements(
        project.getTasksOnDate(new Date().toLocaleDateString("en-US")),
        project.title
      )
    )
  }
  console.log(allTasks)
  allTasks.forEach((taskElement) => taskContainer.appendChild(taskElement))
  taskContainer.appendChild(
    makeTaskInput(allProjects.map((project) => project.title))
  )
  return taskContainer
}
export { makeTodayTab }
