import { makeMultipleTaskElements } from "./TaskView"
import { makeTaskInput } from "./taskInputView"
import Project from "./project"

function makeTodayTab(allProjects) {
  const taskContainer = document.createElement("div")
  taskContainer.className = "task-container"

  let allTasks = []
  for (let project of allProjects) {
    allTasks = allTasks.concat(
      makeMultipleTaskElements(
        Project.getTasksOnDate(project, new Date().toLocaleDateString("en-US")),
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
