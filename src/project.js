import { Map, hash } from "immutable"
import { curry } from "ramda"
function makeProject(name) {
  return { title: name, projectTasks: Map() }
}

const addTask = curry(function (task, project) {
	task.projectTitle = project.title;
  return {
    ...project,
    projectTasks: project.projectTasks.set(hash(task.title), task),
  }
})

// this uses one of the updateTask functions to modify a task
const updateTaskInProject = curry((taskUpdater, taskName, project) => ({
  ...project,  projectTasks: project.projectTasks.update(hash(taskName), taskUpdater),
}))


const deleteTaskFromProject = curry((taskName, project) => ({
  ...project,
  projectTasks: project.projectTasks.delete(hash(taskName)),
}))

// search tasks of a project based on their title
// retrieve a Task using it's key
const getTaskByName = curry(function (project, taskName) {
  return project.projectTasks.get(hash(taskName))
})

const getAllTasks = curry(function (project) {
  return project.projectTasks.toIndexedSeq().toArray()
})

// returns an array of tasks on a specific date
const getTasksOnDate = curry(function (project, date) {
  return project.projectTasks
    .toIndexedSeq()
    .toArray()
    .filter(
      (task) =>
        task.dueDate.toLocaleDateString("en-Us") ===
        date.toLocaleDateString("en-US")
    )
})
// return all tasks of a project that have the same priority
const getTasksWithPriority = curry(function (project, priority) {
  return project.projectTasks
    .filter((key, task) => task.priority == priority)
    .toIndexedSeq()
    .toArray()
})
// search tasks of a project based on their completion status
const getTasksWithDone = curry(function (project, doneStatus) {
  return project.projectTasks
    .filter((key, task) => task.done == doneStatus)
    .toIndexedSeq()
    .toArray()
})
const getCompletedTasks = curry(function getCompletedTasks(project) {
  return getTasksWithDone(project, true)
})

const getUnfinishedTasks = function (project) {
  return getTasksWithDone(project, false)
}
//clear all done tasks
const clearDone = curry(function (project) {
  project.projectTasks = project.projectTasks.filterNot(
    (task) => task.done == true
  )
})
function getTaskNames(project) {
  return project.projectTasks
    .toIndexedSeq()
    .toArray()
    .map((task) => task.title) || [" "];
}

export default {
  makeProject,
  addTask,
  getTaskByName,
  getAllTasks,
  getTasksOnDate,
  getCompletedTasks,
  getUnfinishedTasks,
  updateTaskInProject,
  clearDone,
  getTaskNames,
	deleteTaskFromProject
}
