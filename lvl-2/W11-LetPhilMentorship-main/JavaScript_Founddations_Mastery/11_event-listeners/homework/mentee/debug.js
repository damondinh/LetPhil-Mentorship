// ============================================================
// 🐛  EVENT LISTENERS — HOMEWORK  |  DEBUG TASKS
// ============================================================
// To test: swap <script src="app.js"> for <script src="debug.js">
// in index.html.
// ============================================================

// ----------------------------------------------------------
// 🟢 DEBUG 1 — Easy
// ----------------------------------------------------------
// Clicking "Add Task" should log the title.
// Instead it logs the title immediately when the page loads,
// then does nothing when you click. What's wrong?

function logTitle() {
	const title = document.getElementById('task-title-input').value;
	console.log('Title: ' + title);
}

document.getElementById('add-task-btn').addEventListener('click', logTitle);

// What's wrong ↓
// logTitle immediately executes because of the brackets
// Your fix ↓
// remove brackets from logTitle

// ----------------------------------------------------------
// 🟡 DEBUG 2 — Medium
// ----------------------------------------------------------
// This should hide/show task cards based on priority filter.
// Clicking "High" hides all tasks instead of showing only high ones.
// What's wrong with the condition?

function handleFilter(event) {
	const filter = event.target.dataset.filter;
	const allCards = document.querySelectorAll('.task-card');

	allCards.forEach(function (card) {
		if (card.dataset.priority === filter) {
			card.classList.remove('hidden');
		} else {
			card.classList.add('hidden');
		}
	});
}

document.querySelector('.header-right').addEventListener('click', handleFilter);

// What's wrong ↓
// the condition is only adding hidden when the priority is === filter
// if priority !== filter then remove hidden from classList
// if priority === filter then add hidden to classList
// Your fix ↓
// hidden should be removed from cards where priority === filter and added when filter !== priority

// ----------------------------------------------------------
// 🔴 DEBUG 3 — Hard
// ----------------------------------------------------------
// This delegation handler should remove a task card when
// its Remove button is clicked. Nothing happens when clicked.
// There are TWO bugs.

function handleBoardClick(event) {
	const card = event.target.closest('.task-card');
	const taskId = card.dataset.id;

	if (event.target.classList.contains('remove-btn')) {
		const index = tasks.findIndex((t) => t.id === taskId); // fix 1
		tasks.splice(index, 1);
		card.remove();
		updateCounts(tasks); // fix 2
	}
}

document.querySelector('.board').addEventListener('click', handleBoardClick);

// Bug 1 ↓
// doesnt remove task from the array using task id
// Bug 2 ↓
// doesnt update counts
// Your fix ↓
// not sure if those are the correct bug fixes, the delegation handler
// worked fine for me.
