import { hash } from "immutable";
import {
	taskOpen,
	changeTaskNote,
	changeTaskDate,
	scheduleForTommorow,
	scheduleForToday,
	deleteAtask,
} from "./EventCallbacks";
function makeTaskElement(task, taskProject) {
	const taskElement = document.createElement("div");
	taskElement.className = "task";
	let [day, month, year] = task.dueDate
		.toLocaleDateString("en-US")
		.split("/");
	
	if (month.length < 2) month = "0" + month;
	if (day.length < 2) day = "0" + day;

	taskElement.innerHTML = ` 
          <div class="task-info" id="taskInfo">
            <input type="checkbox" name="done" data-key="${hash(task.title)}" />
            <input type="text" class="task-title" value="${task.title}"></input>
            <span class="task-project">${task.projectTitle}</span>
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
                  name="notes"
                  class="task-note"
                  id="notes"
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
                <input id="dateInput" type="date" value="${year}-${month}-${day}" />
                <button class="delete-button" id="deleteButton" data-task="${task.title}" data-project="${task.projectTitle}">Delete</button>
              </div>
            </div>
          </div>`;

	/**
	 * ADDING THE EVENT LISTENERS HERE
	 */

	taskElement.querySelector("#openTask").addEventListener("click", taskOpen);
	// change size of the input box for task name dynamically
	const allTaskNames = taskElement.querySelectorAll(".task-title");
	allTaskNames.forEach((taskName) => {
		taskName.setAttribute("size", taskName.value.length + 1);
		taskName.addEventListener("keyup", () =>
			taskName.setAttribute("size", taskName.value.length + 1)
		);
	});

	taskElement
		.querySelector("#notes")
		.addEventListener("blur", (e) =>
			changeTaskNote(e, task.title, taskProject, e.target.value)
		);

	taskElement
		.querySelector("#dateInput")
		.addEventListener("change", (e) =>
			changeTaskDate(e, task.title, taskProject)
		);

	taskElement
		.querySelector("#todayButton")
		.addEventListener("click", () =>
			scheduleForToday(task.title, taskProject)
		);

	taskElement
		.querySelector("#tommorowButton")
		.addEventListener("click", () =>
			scheduleForTommorow(task.title, taskProject)
		);
	taskElement.querySelector("#deleteButton").addEventListener("click", () => deleteAtask(task.title,taskProject));
	return taskElement;
}
function makeMultipleTaskElements(tasks, projectName) {
	return tasks.map((task) => makeTaskElement(task, projectName));
}
export { makeTaskElement, makeMultipleTaskElements };
