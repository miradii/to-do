import { getTaskNameInput, getProjectSelector } from "./DomController"
import { makeNewTask } from "./EventCallbacks"
function makeTaskInput(projectNames) {
  const inputContainer = document.createElement("div")
  inputContainer.className = "input-container"
  const label = document.createElement("label")
  label.setAttribute("for", "task-input")
  label.innerText = "+"
  const textInput = document.createElement("input")
  textInput.type = "text"
  textInput.name = "task-input"
  textInput.id = "nameInput"
  textInput.placeholder = "New Task"
  textInput.addEventListener("keypress", (e) =>
    makeNewTask(e, getNewTaskTitle, getProjectTitle)
  )
  inputContainer.appendChild(label)
  inputContainer.appendChild(textInput)
  if (projectNames != null) {
    const projectSelector = createProjectSelector(projectNames)
    inputContainer.appendChild(projectSelector)
  }
  return inputContainer
}

//String[] -> DomElement(select)
function createProjectSelector(projectNames) {
  const projectSelect = document.createElement("select")
  projectSelect.name = "project-selector"
  projectSelect.id = "projectSelector"
  projectNames.forEach((projectName) => {
    const option = document.createElement("option")
    option.text = projectName
    projectSelect.appendChild(option)
  })
  return projectSelect
}

//helper function to get the input project from the select element
function getProjectTitle() {
  const selector = getProjectSelector()
  return selector.options[selector.selectedIndex].value
}
// helper function to get the input name
function getNewTaskTitle() {
  return getTaskNameInput().value
}
export { makeTaskInput }
