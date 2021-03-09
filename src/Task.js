import { curry } from "ramda";

const Priority = { LOW: 1, NORMAL: 2, HIGH: 3 };
Object.freeze(Priority);
function makeTask(name, date = new Date()) {
	return {
		title: name,
		dueDate: date,
		priority: Priority.NORMAL,
		note: " ",
		done: false,
		projectTitle: "",
	};
}
// gets a property and a function and sets the property to the return value
const updateTask = curry((property, fn, task) => ({
	...task,
	[property]: fn(),
}));

const updateTaskName = updateTask("title");
const updateTaskDate = updateTask("dueDate");
const updateTaskNote = updateTask("note");
const updateTaskProject = updateTask("projectTitle");
export {
	makeTask,
	Priority,
	updateTask,
	updateTaskName,
	updateTaskDate,
	updateTaskNote,
};
