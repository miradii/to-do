import { Map, hash } from "immutable"
import { Task } from "./Task"

class Project {
  constructor(title) {
    this.title = title
    this.projectTasks = Map()
  }
  addTask(task) {
    this.projectTasks = this.projectTasks.set(hash(task.title), task)
    return this
  }
  // search tasks of a project based on their title
  // retrieve a Task using it's key
  getTaskById(id) {
    return this.projectTasks.get(id)
  }

  getAllTasks() {
    return this.projectTasks.toIndexedSeq().toArray()
  }

  // returns an array of tasks on a specific date
  getTasksOnDate(date) {
    return this.projectTasks
      .toIndexedSeq()
      .toArray()
      .filter((task) => task.dueDate == date)
  }
  // return all tasks of a project that have the same priority
  getTasksWithPriority(priority) {
    return this.projectTasks
      .filter((key, task) => task.priority == date)
      .toIndexedSeq()
      .toArray()
  }
  // search tasks of a project based on their completion status
  getTasksWithDone(doneStatus) {
    return this.projectTasks
      .filter((key, task) => task.done == doneStatus)
      .toIndexedSeq()
      .toArray()
  }
  getCompletedTasks() {
    return this.getTasksWithDone(true)
  }
  getUnfinishedTasks() {
    return this.getTasksWithDone(false)
  }
  //clear all done tasks
  clearDone() {
    this.projectTasks = this.projectTasks.filterNot((task) => task.done == true)
  }
  getTaskNames() {
    return this.projectTasks
      .toIndexedSeq()
      .toArray()
      .map((task) => task.title)
  }
}
export { Project }
