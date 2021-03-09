import { getAllBusyDays } from "./Utils";
import { getAllTasks } from "./ProjectRepo";
import { makeTaskElement } from "./TaskView";
import { makeTaskInput } from "./taskInputView";
function makeScheduledTab(allProjects) {
	const scheduledContainer = document.createElement("div");
	scheduledContainer.id = "scheduledContainer";
	scheduledContainer.className = "scheduled-container";

	const allTasks = getAllTasks();
	const scheduledTaskElements = makeMultipleScheduledTaskElements(
		getAllBusyDays(allTasks),
		allTasks
	);
	console.log(scheduledTaskElements);
	scheduledTaskElements.forEach((taskElement) =>
		scheduledContainer.appendChild(taskElement)
	);
	const taskInput = makeTaskInput(
		allProjects.map((project) => project.title)
	);
	scheduledContainer.appendChild(taskInput);
	return scheduledContainer;
}
function makeMultipleScheduledTaskElements(allDates, allTasks) {
	console.log(allDates);
	return allDates.map((date) => makeScheduleElement(date, allTasks));
}
function makeScheduleElement(date, allTasks) {
	const taskContainer = document.createElement("div");
	taskContainer.className = "task-container";

	const dateHeader = document.createElement("h3");
	dateHeader.innerText = date;
	dateHeader.id = "dateHeader";
	dateHeader.className = "date-header";

	taskContainer.appendChild(dateHeader);

	let allTasksOnThisDate = allTasks.filter(
		(task) => task.dueDate.toLocaleDateString("US-en") == date
	);
	console.log(allTasksOnThisDate);

	let scheduledTaskElements = allTasksOnThisDate.map((task) =>
		makeTaskElement(task, task.projectTitle)
	);
	scheduledTaskElements.forEach((taskElement) =>
		taskContainer.appendChild(taskElement)
	);
	return taskContainer;
}

export { makeScheduledTab };
