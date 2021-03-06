import Project from "./project";
import {
	closeTaskEditors,
	renderTab,
	clearContent,
	rotateArrow,
} from "./DomController";
import {
	updateProject,
	setAllProjectsMap,
	getAllProjectsMap,
	addProject,
} from "./ProjectRepo";
import {
	makeTask,
	updateTaskNote,
	updateTaskDate,
} from "./Task";
import { add } from "date-fns";

//open task editor on clicking the arrow
function taskOpen(e) {
	let task = e.target.parentElement;

	while (!task.classList.contains("task")) task = task.parentElement;

	const taskEditor = task.querySelector("#taskEditor");
	if (taskEditor.classList.contains("editor-on")) {
		rotateArrow(task);
		taskEditor.classList.remove("editor-on");
	} else {
		closeTaskEditors();
		rotateArrow(task);
		taskEditor.classList.add("editor-on");
	}
}

//create new Task when Enter is pressed in the input box
function makeNewTask(event, taskTitle, projectTitle) {
	if (event.keyCode == 13) {
		if (taskTitle() != "") {
			setAllProjectsMap(
				updateProject(
					getAllProjectsMap(),
					projectTitle(),
					Project.addTask(makeTask(taskTitle()))
				)
			);
			console.log(getAllProjectsMap());
			clearContent();
			renderTab("Today");
		} // this should change to get this as a parameter or something
	}
}

//change task notes
function changeTaskNote(event, taskTitle, projectTitle) {
	const projectUpdater = Project.updateTaskInProject(
		updateTaskNote(() => event.target.value),
		taskTitle
	);
	setAllProjectsMap(
		updateProject(getAllProjectsMap(), projectTitle, projectUpdater)
	);
}

//change date in the task edit ui
function changeTaskDate(event, taskTitle, projectTitle) {
	let input = event.target.value;
	let dateEntered = new Date(input);
	const projectUpdater = Project.updateTaskInProject(
		updateTaskDate(() => dateEntered),
		taskTitle
	);
	setAllProjectsMap(
		updateProject(getAllProjectsMap(), projectTitle, projectUpdater)
	);
	clearContent();
	renderTab("Today");
}

//set date to tomorrow
function scheduleForTommorow(taskTitle, projectTitle) {
	let tommorow = add(new Date(), {
		days: 1,
	});
	const projectUpdater = Project.updateTaskInProject(
		updateTaskDate(() => tommorow),
		taskTitle
	);
	setAllProjectsMap(
		updateProject(getAllProjectsMap(), projectTitle, projectUpdater)
	);

	clearContent();
	renderTab("Today");
}

//set date to today
function scheduleForToday(taskTitle, projectTitle) {
	let today = new Date();
	const projectUpdater = Project.updateTaskInProject(
		updateTaskDate(() => today.toLocaleTimeString("en-US")),
		taskTitle
	);
	setAllProjectsMap(
		updateProject(getAllProjectsMap(), projectTitle, projectUpdater)
	);
	clearContent();
	renderTab("Today");
}

// 
function deleteAtask(taskTitle,projectTitle){
	setAllProjectsMap(updateProject(getAllProjectsMap(),projectTitle,Project.deleteTaskFromProject(taskTitle)));	
	clearContent();
	renderTab("Today");
}



// this is the event for add project button 
function addProjectEvent(e){
	const input = e.target.parentElement.querySelector("#newProjectName").value;
	setAllProjectsMap(addProject(getAllProjectsMap(),input));
	clearContent();
	renderTab("Projects");
}

export {
	taskOpen,
	makeNewTask,
	changeTaskNote,
	changeTaskDate,
	scheduleForToday,
	scheduleForTommorow,	
	addProjectEvent,
	deleteAtask
};
