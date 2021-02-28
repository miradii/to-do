import { Map, hash, update } from "immutable"
import { Project } from "./project"
import { Task } from "./Task"
// Map<int,Project>
var allProjects = Map()
const defaultProject = new Project("Default")
allProjects = allProjects.set(hash(defaultProject.title), defaultProject)
const secondProject = new Project("cock")
const t1 = new Task("shit")
const t2 = new Task("piss")
const t3 = new Task("fuck")
const t4 = new Task("shitttt")

defaultProject.addTask(t2)
defaultProject.addTask(t1)
defaultProject.addTask(t3)
secondProject.addTask(t4)
allProjects = allProjects.set(hash(secondProject.title), secondProject)
console.log(secondProject)
// returns all the projects in array form
function getAllProjects() {
  return allProjects.toIndexedSeq().toArray()
}
// returns a project by getting the title
function getProject(title) {
  return allProjects.get(hash(title))
}
function setAllProjects(newProjectMap) {
  allProjects = newProjectMap
}
function addTaskToProject(allProjects, taskName, projectName) {
  let task = new Task(taskName)

  allProjects = allProjects.update(hash(projectName), (proejct) =>
    proejct.addTask(task)
  )
}
// Modifies the project list to add a project and returns the modified list Project -> List()
function addProject(project) {
  if (!allProjects.has(hash(project.title)))
    allProjects = allProjects.set(hash(project.tile), project)
  return allProjects
}

// Modifies the list of Projects to delete a project and returns the modified list String -> List()
function deleteProject(title) {
  allProjects = allProjects.delete(hash(title))
  return allProjects
}

// return all tasks in all  projects as an array
function getAllTasks() {
  allProjects
    .toIndexedSeq()
    .toArray()
    .reduce((acc, project) => (acc = acc.concat(project.getAllTasks())), [])
}

// Return all tasks in a certain date
function getAllTasksByDate(date) {
  return getAllTasks().filter((task) => task.date == date)
}

function getAllTasksToday() {
  return getAllTasksByDate(new Date().toLocaleDateString("en-US"))
}

export {
  getAllProjects,
  getAllTasksToday,
  getProject,
  setAllProjects,
  addTaskToProject,
  allProjects,
}
