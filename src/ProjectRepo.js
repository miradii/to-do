import { Map, hash, update } from "immutable"
import { curry } from "ramda"
import Project from "./project"
import { makeTask, updateTask } from "./Task"

// returns all the projects in array form
function getAllProjects() {
  return allProjects.toIndexedSeq().toArray()
}
// returns a project by getting the title
function getProject(projectMap, title) {
  return projectMap.get(hash(title))
}

const updateProject = curry((projectMap, projectName, fn) =>
  projectMap.update(hash(projectName), fn)
)

// Modifies the project list to add a project and returns the modified list Project -> List()
function addProject(projectMap, project) {
  if (!projectMap.has(hash(project.title)))
    return projectMap.set(hash(project.title), project)
}

// Modifies the list of Projects to delete a project and returns the modified list String -> List()
function deleteProject(title) {
  allProjects = allProjects.delete(hash(title))
  return allProjects
}
function getAllProjectsMap() {
  return allProjects
}

function setAllProjectsMap(value) {
  allProjects = value
}
// return all tasks in all  projects as an array
function getAllTasks() {
  allProjects
    .toIndexedSeq()
    .toArray()
    .reduce(
      (acc, project) => (acc = acc.concat(Project.getAllTasks(project))),
      []
    )
}

// Return all tasks in a certain date
function getAllTasksByDate(date) {
  return getAllTasks().filter((task) => task.date == date)
}

function getAllTasksToday() {
  return getAllTasksByDate(new Date().toLocaleDateString("en-US"))
}

// Map<int,Project>
var allProjects = Map()
const defaultProject = Project.makeProject("Default")
allProjects = addProject(allProjects, defaultProject)
const secondProject = Project.makeProject("cockSucker")

console.log(allProjects)
allProjects = addProject(allProjects, secondProject)
console.log(allProjects)

const t1 = makeTask("shit")
const t2 = makeTask("piss")
const t3 = makeTask("fuck")
const t4 = makeTask("shitttt")

allProjects = updateProject(
  allProjects,
  defaultProject.title,
  Project.addTask(t1)
)
allProjects = updateProject(
  allProjects,
  defaultProject.title,
  Project.addTask(t2)
)
allProjects = updateProject(
  allProjects,
  defaultProject.title,
  Project.addTask(t3)
)
allProjects = updateProject(
  allProjects,
  secondProject.title,
  Project.addTask(t4)
)
export {
  getAllProjects,
  getAllProjectsMap,
  setAllProjectsMap,
  getAllTasksToday,
  getProject,
  updateProject,
}
