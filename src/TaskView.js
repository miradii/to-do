import { hash } from "immutable"
import { taskOpen } from "./EventCallbacks"
function makeTaskElement(task, taskProject) {
  const taskElement = document.createElement("div")
  taskElement.className = "task"
  taskElement.innerHTML = ` 
          <div class="task-info" id="taskInfo">
            <input type="checkbox" name="done" data-key="${hash(task.title)}" />
            <input type="text" class="task-title" value="${task.title}"></input>
            <span class="task-project">${taskProject}</span>
            <div id="openTask"> <svg  class="arrow" viewBox="0 0 40 40">
              <use  class="arrow"  id="arrow"xlink:href="./resources/arrow.svg#arrow"></use>
            </svg> </div>
          </div>
          <div class="task-edit" id="taskEditor">
            <div class="line"><hr /></div>
            <div class="edits-container">
              <div class="notes-container">
                <label for="notes"> Notes<br /> </label>

                <textarea
                  data-key ="${hash(task.title)}"
                  name="notes"
                  class="task-note"
                  cols="30"
                  rows="8"
                >${task.note}</textarea>
              </div>
              <div class="edit-buttons-container">
                <div class="day-button-container">
                  <button class="edit-button" id="todayButton" value="today">
                    Today
                  </button>
                  <button class="edit-button" id="tommorowButton">
                    Tommorow
                  </button>
                </div>
                <input type="date" value="" />
                <button class="delete-button" data-key="">Delete</button>
              </div>
            </div>
          </div>`
  taskElement.querySelector("#openTask").addEventListener("click", taskOpen)
  // change size of the input box for task name dynamically
  const allTaskNames = taskElement.querySelectorAll(".task-title")
  allTaskNames.forEach((taskName) => {
    taskName.setAttribute("size", taskName.value.length + 1)
    taskName.addEventListener("keyup", () =>
      taskName.setAttribute("size", taskName.value.length + 1)
    )
  })

  return taskElement
}
function makeMultipleTaskElements(tasks, projectName) {
  return tasks.map((task) => makeTaskElement(task, projectName))
}
export { makeTaskElement, makeMultipleTaskElements }
