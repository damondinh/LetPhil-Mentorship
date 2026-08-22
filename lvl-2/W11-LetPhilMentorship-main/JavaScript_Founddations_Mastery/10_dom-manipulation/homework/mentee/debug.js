// ============================================================
// 🐛  DOM MANIPULATION — HOMEWORK  |  DEBUG TASKS
// ============================================================
// To test: swap <script src="app.js"> with <script src="debug.js">
// in index.html.
// ============================================================

// ----------------------------------------------------------
// 🟢 DEBUG 1 — Easy
// ----------------------------------------------------------
// This should set the board title but logs a TypeError. Why?

// function renderBoardTitle() {
// 	const titleEl = document.querySelector('.board-title');
// 	titleEl.textContent = 'My Task Board';
// }

// renderBoardTitle();

// What's wrong ↓
// board-title is an id not a class
// Your fix ↓
function renderBoardTitle() {
	const titleEl = document.querySelector('#board-title');
	titleEl.textContent = 'My Task Board';
}

renderBoardTitle();

// ----------------------------------------------------------
// 🟡 DEBUG 2 — Medium
// ----------------------------------------------------------
// This loop should create a card for every task and append
// it to the list. But only the last card appears. Why?

// function renderTasks() {
// 	const list = document.getElementById('list-todo');
// 	const tasks = ['Design page', 'Write tests', 'Fix bug'];

// 	tasks.forEach(function (taskTitle) {
// 		const li = document.createElement('li');
// 		li.textContent = taskTitle;
// 		list.innerHTML = li.outerHTML;
// 	});
// }

// renderTasks();

// What's wrong ↓
// created tasks arent being added to the DOM list
// Your fix ↓
function renderTasks() {
	const list = document.getElementById('list-todo');
	const tasks = ['Design page', 'Write tests', 'Fix bug'];

	tasks.forEach(function (taskTitle) {
		const li = document.createElement('li');
		li.textContent = taskTitle;
		li.classList.add('priority-high'); // Added to help debug Debug 3 - HARD
		list.appendChild(li);
	});
}

renderTasks();
// ----------------------------------------------------------
// 🔴 DEBUG 3 — Hard
// ----------------------------------------------------------
// This function should add a "highlighted" class to all
// high-priority cards, but nothing changes on the page.
// There are TWO bugs.

function highlightTasks() {
	const highCards = document.querySelectorAll('.priority-high');
	console.log(highCards);
	for (let i = 0; i <= highCards.length; i++) {
		highCards[i].classList.add('highlighted');
	}
}

highlightTasks();

// Bug 1 ↓
// there are no tasks with priority-high class
// Bug 2 ↓
// index out of range error
// Your fix ↓
function highlightTasks() {
	const highCards = document.querySelectorAll('.priority-high');
	// console.log(highCards);
	for (let i = 0; i < highCards.length; i++) {
		highCards[i].classList.add('highlighted');
	}
}

highlightTasks();
