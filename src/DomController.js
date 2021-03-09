import { buildTab } from "./tabBuilder";
import { compose } from "ramda";
import { addProjectEvent } from "./EventCallbacks";
//get all neede elements up here
const projectsTab = document.getElementById("projectsTab");
const scheduledTab = document.getElementById("scheduledTab");
const todayTab = document.getElementById("todayTab");
const content = document.getElementById("content");
const projectModal = document.getElementById("projectModal");
const confirmButton = document.getElementById("confirmButton"); 
function showAddProjectModal() {
	projectModal.style.display = "block";
	document.body.style.position = 'fixed';
	document.body.style.top = `-${window.scrollY}px`;
}

function hideAddModal() {
	projectModal.style.display = "none";
	document.body.style.position = '';
document.body.style.top = '';
	const scrollY = document.body.style.top;
document.body.style.position = '';
document.body.style.top = '';
window.scrollTo(0, parseInt(scrollY || '0') * -1);
}
//closeModal.addEventListener("click", hideAddModal);
window.addEventListener("click", (e) => {
	if (e.target == projectModal ) hideAddModal();
});
//addEvents
function addEvents() {
	projectsTab.addEventListener("click", () => renderTab("Projects"));
	projectsTab.addEventListener("click", (e) => appendProjectAdder(e));
	todayTab.addEventListener("click", () => renderTab("Today"));
	todayTab.addEventListener("click", removeProjectAdder)
	scheduledTab.addEventListener("click", () => renderTab("Scheduled"));
	scheduledTab.addEventListener("click", removeProjectAdder);
	confirmButton.addEventListener("click", e => addProjectEvent(e))
	confirmButton.addEventListener("click", hideAddModal)
}
//logic for tabs and rendering
function clearContent() {
	while (content.hasChildNodes()) {
		content.removeChild(content.lastChild);
	}
}

function appendTab(tabElements) {
	clearContent();
	content.appendChild(tabElements);
}
function appendProjectAdder(e) {
	const projectAdder = document.createElement('button');
	projectAdder.className = "project-adder";
	projectAdder.id = "projectAdder";
	projectAdder.innerText ="New Project";
	projectAdder.addEventListener("click", showAddProjectModal);
	const header = e.target.parentElement;
	header.insertBefore(projectAdder,e.target);

}
function removeProjectAdder(){
	const projectAdder = document.getElementById("projectAdder");
	if(projectAdder)
		projectAdder.remove();
}
const renderTab = compose(appendTab, buildTab);

// a function to get all the task elements
function getTaskEditors() {
	return document.querySelectorAll(".task-edit");
}
// a helper funtion to close all open task editors
function closeTaskEditors() {
	getTaskEditors().forEach((taskElement) => {
		if (taskElement.classList.contains("editor-on")) {
			rotateArrow(getTaskfromChild(taskElement));
			taskElement.classList.remove("editor-on");
		}
	});
}

function rotateArrow(task) {
	const arrow = task.querySelector("#openTask");
	arrow.classList.contains("rotated")
		? arrow.classList.remove("rotated")
		: arrow.classList.add("rotated");
}

// I need a function that gets to the task element from it's children
function getTaskfromChild(taskChild) {
	let task = taskChild;
	while (!task.classList.contains("task")) task = task.parentElement;
	return task;
}
//** getting all the input elemnts here */

//return the projectSelector option element
function getProjectSelector() {
	return document.querySelector("#projectSelector");
}
//get new task name from nameInputter
function getTaskNameInput() {
	return document.querySelector("#nameInput");
}
export {
	addEvents,
	closeTaskEditors,
	renderTab,
	clearContent,
	rotateArrow,
	getTaskNameInput,
	getProjectSelector,
};
