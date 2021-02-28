import r from "ramda"

const Priority = { LOW: 1, NORMAL: 2, HIGH: 3 }
Object.freeze(Priority)
class Task {
  constructor(name, date = new Date().toLocaleDateString("en-US")) {
    this.title = name
    this.dueDate = date
    this.priority = Priority.NORMAL
    this.description = ""
    this.note = " "
    this.done = false
  }
  setDescription(description) {
    this.description = description
  }
  setDueDate(date) {
    dueDate = date
  }
  setPriority(priority) {
    this.priority = priority
  }
  setNote(note) {
    this.note = note
  }
  toggleDone() {
    this.done = !this.done
  }
  setTitle(title) {
    this.title = title
  }
}

export { Task, Priority }
