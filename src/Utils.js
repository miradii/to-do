function getAllBusyDays(allTasksArray) {
	return allTasksArray
		.map((task) => task.dueDate.toLocaleDateString("US-en"))
		.reduce(
			(acc, date) => (!acc.includes(date) ? acc.concat(date) : acc),
			[]
		);
}
// [ ] => []
export { getAllBusyDays };
