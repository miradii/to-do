import { makeMultipleTaskElements } from "./TaskView";
import { makeTaskInput } from "./taskInputView";
import Project from "./project";

function makeTodayTab(allProjects) {
	const todayContainer = document.createElement("div");
	todayContainer.id = "todayContainer";
	todayContainer.className = "today-container";
	const taskContainer = document.createElement("div");
	taskContainer.className = "task-container";

	let allTasks = [];
	for (let project of allProjects) {
		allTasks = allTasks.concat(
			makeMultipleTaskElements(
				Project.getTasksOnDate(project, new Date()),
				project.title
			)
		);
	}
	allTasks.forEach((taskElement) => taskContainer.appendChild(taskElement));
	todayContainer.appendChild(taskContainer);
	todayContainer.appendChild(
		makeTaskInput(allProjects.map((project) => project.title))
	);
	return todayContainer;
}
export { makeTodayTab };
