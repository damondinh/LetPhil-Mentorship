// ============================================================
// 🏠  localStorage — HOMEWORK
// ============================================================
// Mini Project: Persistent Task Board
//
// The Task Board from Event Listeners — now with persistence.
// Every change is saved to localStorage automatically.
// Refreshing the page restores exactly where the user left off.
//
// STORAGE KEY: "taskBoardData"
// Store the full tasks array under this key.
// ============================================================

// ============================================================
// DEFAULT TASKS — used only when nothing is saved yet
// ============================================================
const defaultTasks = [
	{
		id: 1,
		title: 'Design landing page',
		assignee: 'Alex',
		priority: 'high',
		status: 'todo',
	},
	{
		id: 2,
		title: 'Set up project repo',
		assignee: 'Sofia',
		priority: 'high',
		status: 'done',
	},
	{
		id: 3,
		title: 'Write API docs',
		assignee: 'Liam',
		priority: 'medium',
		status: 'inprogress',
	},
	{
		id: 4,
		title: 'Fix login bug',
		assignee: 'Alex',
		priority: 'high',
		status: 'inprogress',
	},
	{
		id: 5,
		title: 'Add dark mode',
		assignee: 'Maya',
		priority: 'low',
		status: 'todo',
	},
];

// This is your working tasks array — start it empty.
// loadTasks() will fill it from localStorage (or from defaultTasks).
let tasks = [];

// ----------------------------------------------------------
// TASK 1 — saveTasks
// ----------------------------------------------------------
// Declare a function called saveTasks.
// No parameters.
//
// Inside:
//   1. Save tasks to localStorage:
//      localStorage.setItem("taskBoardData", JSON.stringify(tasks))
//
//   2. Flash the save indicator:
//      Select #save-indicator
//      Add class "visible"
//      After 1500ms, remove class "visible":
//        setTimeout(function() {
//          saveIndicator.classList.remove("visible");
//        }, 1500);
//
// This function will be called after EVERY change.

function saveTasks() {
	// 1. Save tasks to local storage
	localStorage.setItem('taskBoardData', JSON.stringify(tasks));

	// 2. Flash the save indicator
	const saveIndicator = document.getElementById('save-indicator');
	saveIndicator.classList.add('visible');
	setTimeout(function () {
		saveIndicator.classList.remove('visible');
	}, 1500); // calls setTimeout after 1500ms to remove visible class from save indicator
}

// ----------------------------------------------------------
// TASK 2 — loadTasks
// ----------------------------------------------------------
// Declare a function called loadTasks.
// No parameters. Returns nothing — populates the tasks array.
//
// Inside:
//   1. const raw = localStorage.getItem("taskBoardData")
//
//   2. IF raw is null (nothing saved yet):
//      Set tasks = [...defaultTasks]  (copy the defaults)
//      Call saveTasks() to save them immediately
//      Return early
//
//   3. ELSE:
//      Set tasks = JSON.parse(raw)
//
// ⚠️  Always check for null before parsing.

function loadTasks() {
	// 1.Get taskBoardData from local storage
	const raw = localStorage.getItem('taskBoardData');

	// 2. Handle taskBoardData is null
	if (raw === null) {
		tasks = [...defaultTasks]; //copy the default using spread operator
		saveTasks();
		return;
	} else {
		tasks = JSON.parse(raw);
	}
}

// ----------------------------------------------------------
// TASK 3 — createTaskCard (returns a DOM element)
// ----------------------------------------------------------
// Carried from Event Listeners — same structure, restated here
// so you don't have to flip back to that file.
// Parameter: task (object)
//
// Build and return a <li> with:
//   1. class "task-card"
//      dataset.id = task.id
//      dataset.priority = task.priority
//   2. A title <p class="task-title"> — textContent: task.title
//   3. A meta <div class="task-meta"> with two spans:
//      a) priority span — textContent: task.priority.toUpperCase()
//         add class: "priority-" + task.priority
//         (e.g. class="priority-high" for high priority)
//      b) assignee span — textContent: "👤 " + task.assignee
//   4. An actions <div class="card-actions"> with two buttons:
//      a) <button class="complete-btn"> textContent: "✅ Complete"
//      b) <button class="remove-btn">   textContent: "🗑️ Remove"
//   5. If task.status === "done" → add class "completed" to the <li>
//   6. Append title, meta, and actions to the <li>
//
// Return the <li> — do NOT append it here.

function createTaskCard(task) {
	// 1. create task card
	const taskcard = document.createElement('li');
	taskcard.classList.add('task-card');
	taskcard.dataset.id = task.id;
	taskcard.dataset.priority = task.priority;

	// 2. create title
	const title = document.createElement('p');
	title.classList.add('task-title');
	title.textContent = task.title;

	// 3. create meta with priority span & assignee span
	const meta = document.createElement('div');
	meta.classList.add('task-meta');
	const priority = document.createElement('span');
	priority.textContent = task.priority.toUpperCase();
	priority.classList.add('priority-' + task.priority);
	const assignee = document.createElement('span');
	assignee.textContent = '👤 ' + task.assignee;
	meta.append(priority, assignee);

	// 4. create action buttons with complete btn & remove btn
	const actions = document.createElement('div');
	actions.classList.add('card-actions');
	actions.innerHTML = ` <button class="complete-btn">✅ Complete</button>
                        <button class="remove-btn">🗑️ Remove</button>`;

	// 5. handle completed tasks
	if (task.status === 'done') {
		taskcard.classList.add('complete');
	}

	// 6. append components to taskcard
	taskcard.append(title, meta, actions);

	// 7. return taskCard
	return taskcard;
}

// ----------------------------------------------------------
// TASK 4 — renderBoard + updateCounts
// ----------------------------------------------------------
// Declare a function called renderBoard.
// No parameters — uses the global tasks array.
//
// Clear all three lists (innerHTML = "").
// Loop through tasks, call createTaskCard, append to correct list.
// Call updateCounts() after.
//
// ---
// Declare a function called updateCounts.
// No parameters.
//
// Use filter to get four groups from the tasks array:
//   done        → status === "done"
//   pending     → status !== "done"
//   todo        → status === "todo"
//   inprogress  → status === "inprogress"
//
// Set textContent on six elements:
//   #task-count       → tasks.length + " tasks"
//   #completed-count  → "✅ " + done.length + " done"
//   #pending-count    → "⏳ " + pending.length + " pending"
//   #count-todo       → todo.length          (just the number — no label)
//   #count-inprogress → inprogress.length    (just the number — no label)
//   #count-done       → done.length          (just the number — no label)

function updateCounts() {
	// 1. filter to get groups
	const done = tasks.filter((task) => task.status === 'done');
	const pending = tasks.filter((task) => task.status !== 'done');
	const todo = tasks.filter((task) => task.status === 'todo');
	const inprogress = tasks.filter((task) => task.status === 'inprogress');

	// 2. set textContent on six elements
	const taskCount = document.getElementById('task-count');
	const completedCount = document.getElementById('completed-count');
	const pendingCount = document.getElementById('pending-count');
	const todoCount = document.getElementById('count-todo');
	const inprogressCount = document.getElementById('count-inprogress');
	const doneCount = document.getElementById('count-done');

	taskCount.innerText = tasks.length + ' tasks';
	completedCount.innerText = '✅ ' + done.length + ' done';
	pendingCount.innerText = '⏳ ' + pending.length + ' pending';
	todoCount.innerText = todo.length;
	inprogressCount.innerText = inprogress.length;
	doneCount.innerText = done.length;
}

function renderBoard() {
	// 1. Clear all three lists
	const todoList = document.getElementById('list-todo');
	const inprogressList = document.getElementById('list-inprogress');
	const doneList = document.getElementById('list-done');
	todoList.innerHTML = '';
	inprogressList.innerHTML = '';
	doneList.innerHTML = '';

	// 2. Loop through tasks, call createTaskCard, append to correct list
	tasks.forEach((task) => {
		const card = createTaskCard(task);
		if (task.status === 'todo') {
			todoList.append(card);
		} else if (task.status === 'inprogress') {
			inprogressList.append(card);
		} else if (task.status === 'done') {
			doneList.append(card);
		}
	});

	// 3. Update Counts
	updateCounts();
}

// ----------------------------------------------------------
// TASK 5 — handleAddTask
// ----------------------------------------------------------
// Declare a function called handleAddTask.
//
// Inside:
//   1. Read the four input values:
//      - #task-title-input    (.value.trim())
//      - #task-assignee-input (.value.trim())
//      - #task-priority-input (.value)
//      - #task-status-input   (.value)
//   2. If title is empty → return early
//   3. Create a new task object:
//      { id: Date.now(), title,
//        assignee: assignee || "Unassigned",
//        priority, status }
//      ⚠️ The assignee fallback matters — an empty assignee field
//         would otherwise render as "👤 " with nothing after it.
//   4. Push to tasks array
//   5. Call saveTasks()     ← persist immediately
//   6. Call renderBoard()   ← update the view
//   7. Clear title and assignee inputs
//
// Wire it up:
//   document.getElementById("add-task-btn")
//     .addEventListener("click", handleAddTask)

function handleAddTask() {
	// 1. read the four input values
	const title = document.getElementById('task-title-input').value;
	const assignee = document.getElementById('task-assignee-input').value;
	const priority = document.getElementById('task-priority-input').value;
	const status = document.getElementById('task-status-input').value;

	// 2. if title is empty -> return early
	if (!title) {
		return;
	}

	// 3. create new task object
	const newTask = {
		id: Date.now(),
		title,
		assignee: assignee || 'Unassigned',
		priority,
		status,
	};

	// 4. push to tasks array
	tasks.push(newTask);

	// 5. save tasks to local storage
	saveTasks();

	// 6. render board to UI
	renderBoard();

	// 7. clear title and assignee inputs
	document.getElementById('task-title-input').innerText = '';
	document.getElementById('task-assignee-input').innerText = '';
}

document
	.getElementById('add-task-btn')
	.addEventListener('click', handleAddTask);

// ----------------------------------------------------------
// TASK 6 — handleBoardClick (delegation for complete + remove)
// ----------------------------------------------------------
// Declare a function called handleBoardClick.
// Parameter: event
//
// Use event.target.closest(".task-card") to get the card.
// Guard: if no card → return.
//
// Get taskId: parseInt(card.dataset.id)
// Find the task in tasks using find.
//
// IF complete button clicked:
//   - Update task.status = "done" in the array
//   - Call saveTasks()
//   - Call renderBoard()
//
// IF remove button clicked:
//   - Remove from tasks: tasks.splice(tasks.findIndex(...), 1)
//   - Call saveTasks()
//   - Call renderBoard()
//
// Wire it up to document.querySelector(".board")

function handleBoardClick(event) {
	// 1. get the card
	const card = event.target.closest('.task-card');
	if (!card) {
		return;
	}

	// 2. get taskId
	const taskId = parseInt(card.dataset.id);
	const task = tasks.find((task) => task.id === taskId);

	// 3. handle complete button clicked
	if (event.target.className === 'complete-btn') {
		task.status = 'done';
		saveTasks();
		renderBoard();
	}
	// 4. handle remove button clicked
	if (event.target.className === 'remove-btn') {
		tasks.splice(
			tasks.findIndex((task) => task.id === taskId),
			1,
		);
		saveTasks();
		renderBoard();
	}
}

document.querySelector('.board').addEventListener('click', handleBoardClick);

// ----------------------------------------------------------
// TASK 7 — handleClearAll
// ----------------------------------------------------------
// Declare a function called handleClearAll.
//
// Inside:
//   1. Confirm the user wants to clear:
//      if (!confirm("Clear all tasks? This cannot be undone.")) return;
//   2. Clear localStorage: localStorage.removeItem("taskBoardData")
//   3. Reset tasks: tasks = [...defaultTasks]
//   4. Call saveTasks() to save the defaults
//   5. Call renderBoard()
//
// Wire it up:
//   document.getElementById("clear-btn")
//     .addEventListener("click", handleClearAll)

function handleClearAll() {
	// 1. Confirm the user wants to clear
	if (!confirm('Clear all tasks? This cannot be undone.')) {
		return;
	}

	// 2. Clear local storage
	localStorage.removeItem('taskBoardData');

	// 3. Reset tasks
	tasks = [...defaultTasks];

	// 4. reset filter
	const filterBtns = document.querySelectorAll('.filter-btn');
	filterBtns.forEach((btn) => btn.classList.remove('active'));
	document.querySelector('.filter-btn').classList.add('active');

	// 4. save to defaults
	saveTasks();

	// 5. render board
	renderBoard();
}

document.getElementById('clear-btn').addEventListener('click', handleClearAll);

// ----------------------------------------------------------
// TASK 8 — init
// ----------------------------------------------------------
// Declare a function called init.
// Inside:
//   1. Call loadTasks()    ← loads from localStorage or defaults
//   2. Call renderBoard()  ← renders whatever loadTasks set up
//
// Call init() at the bottom.

function init() {
	// 1. load tasks from local storage or defaults
	loadTasks();

	// 2. render tasks
	renderBoard();

	// 3. load filter
	const savedFilter = loadFilter();

	// 4. update active filter button
	const filterBtns = document.querySelectorAll('.filter-btn');
	filterBtns.forEach((btn) => {
		if (btn.dataset.filter === savedFilter) {
			btn.classList.add('active');
		} else {
			btn.classList.remove('active');
		}
	});

	// 5. apply filter
	const taskCards = document.querySelectorAll('.task-card');
	taskCards.forEach((card) => {
		if (savedFilter === 'all') {
			card.classList.remove('hidden');
		} else if (card.dataset.priority === savedFilter) {
			card.classList.remove('hidden');
		} else {
			card.classList.add('hidden');
		}
	});
}

// ----------------------------------------------------------
// ⭐ STRETCH GOAL — persist filter preference
// ----------------------------------------------------------
// The board currently loses the active filter on refresh.
// Add persistence for the current filter setting.
//
// Declare a function called saveFilter.
// Parameter: filterValue (string)
// Saves: localStorage.setItem("taskFilter", filterValue)
//
// Declare a function called loadFilter.
// Returns the saved filter or "all" as default:
//   return localStorage.getItem("taskFilter") || "all"
//
// In your filter click handler:
//   - After applying the filter, call saveFilter(filterValue)
//
// In init():
//   - After renderBoard(), call:
//       const savedFilter = loadFilter()
//       Apply the saved filter (update active button + show/hide cards)
//
// Write a comment: what other UI state might be worth persisting?
// dark mode / light mode settings

function handleFilterClick(event) {
	// 1. get filter value & return if no filter found
	const filterBtn = event.target.closest('.filter-btn');
	if (!filterBtn) {
		return;
	}

	// 2. Handle filter buttons UI
	const filter = filterBtn.dataset.filter;
	const filterBtns = document.querySelectorAll('.filter-btn');
	filterBtns.forEach((btn) => btn.classList.remove('active'));
	event.target.classList.add('active');

	// 3. Handle task card UI
	const taskCards = document.querySelectorAll('.task-card');
	taskCards.forEach((card) => {
		if (filter === 'all') {
			card.classList.remove('hidden');
		} else if (card.dataset.priority === filter) {
			card.classList.remove('hidden');
		} else {
			card.classList.add('hidden');
		}
	});

	// 4. save filter to local storage
	saveFilter(filter);
}

document
	.querySelector('.header-right')
	.addEventListener('click', handleFilterClick);

function saveFilter(filterValue) {
	localStorage.setItem('taskFilter', filterValue);
}

function loadFilter() {
	return localStorage.getItem('taskFilter') || 'all';
}
// ============================================================
// START
// ============================================================
init();
