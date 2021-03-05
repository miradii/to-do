import { update } from "immutable"
import { curry } from "ramda"

const Priority = { LOW: 1, NORMAL: 2, HIGH: 3 }
Object.freeze(Priority)
function makeTask(name, date = new Date().toLocaleDateString("en-US")) {
  return {
    title: name,
    dueDate: date,
    priority: Priority.NORMAL,
    note: " ",
    done: false,
  }
}
// gets a property and a function and sets the property to the return value
const updateTask = curry((property, fn, task) => ({
  ...task,
  [property]: fn(),
}))

const updateTaskName = updateTask("title")
const updateTaskDate = updateTask("dueDate")
const updateTaskNote = updateTask("note")
export {
  makeTask,
  Priority,
  updateTask,
  updateTaskName,
  updateTaskDate,
  updateTaskNote,
}
