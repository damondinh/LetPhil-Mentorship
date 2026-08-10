import { elements } from '../dom.js';
import { loadJobs, saveJobs } from '../storage.js';

let jobs = [];

function renderJobs(jobsToRender = jobs) {
	// 1. Validate table exists
	if (!elements.jobTrackerTable) {
		return;
	}

	// 2. Clear the tables old data
	elements.jobTrackerTable.innerHTML = '';

	// 3. Render table headers
	const tableHeader = document.createElement('div');
	tableHeader.id = 'tableHeader';
	tableHeader.classList.add('table-row');
	tableHeader.classList.add('text-th');
	tableHeader.innerHTML = `
                          <div class="td">Company</div>
                          <div class="td">Position</div>
                          <div class="td">Status</div>
                          <div class="td">Applied</div>
                          <div class="td">Notes</div>
                          <div class="td">Actions</div>`;
	elements.jobTrackerTable.appendChild(tableHeader);

	// 4. Reader each job as a row
	jobsToRender.forEach((job, index) => {
		const jobRow = document.createElement('div');
		jobRow.classList.add('table-row');
		jobRow.classList.add('table-content');
		jobRow.innerHTML = `
                        <div class="td text-sm">${job.company}</div>
                        <div class="td text-sm">${job.position}</div>
                        <div class="td badge badge-${job.status.toLowerCase()}">${job.status}</div>
                        <div class="td text-sm">${formatDate(job.date)}</div>
												<div class="td text-sm"><p class="grid-notes">${job.notes}</p></div>
												<div class="td">
                          <button class="btn-edit btn-row" data-index="${index}">✏️</button>
                          <button class="btn-delete btn-row" data-index="${index}">🗑️</button>
                        </div>`;
		elements.jobTrackerTable.appendChild(jobRow);
	});

	//5. Add functionality to action buttons
	initializeDeleteButtons();
	initializeEditButtons();
}

// formatDate(date) -> formats date string to "8 Apr 2026"
function formatDate(date) {
	return new Date(date).toLocaleDateString('en-AU', {
		day: 'numeric',
		month: 'short',
		year: 'numeric',
	});
}

function initializeDeleteButtons() {
	const deleteBtns = document.querySelectorAll('.btn-delete');
	deleteBtns.forEach((btn) => {
		btn.addEventListener('click', function () {
			const index = this.getAttribute('data-index');
			jobs.splice(index, 1);
			saveJobs(jobs);
			renderJobs(jobs);
		});
	});
}

function initializeEditButtons() {
	// 1. Get all edit buttons
	const editBtns = document.querySelectorAll('.btn-edit');
	editBtns.forEach((btn) => {
		btn.addEventListener('click', function () {
			const index = this.getAttribute('data-index');
			openEditDialog(index);
		});
	});
}

function handleJobSubmit() {
	const mode = elements.jobDetailForm.dataset.mode;
	const index = elements.jobDetailForm.dataset.id;
	// 1. Get new job application data from inputs
	const newJobApplication = {
		company: elements.jobDetailCompanyInput.value.trim(),
		position: elements.jobDetailPositionInput.value.trim(),
		status: elements.jobDetailStatusSelect.value.trim(),
		date: elements.jobDetailApplicationDate.value.trim(),
		notes: elements.jobDetailNotesTextArea.value.trim(),
	};

	// 2. Add or update job application
	if (mode === 'add') {
		jobs.push(newJobApplication);
	} else if (mode === 'edit') {
		jobs[index] = newJobApplication;
	}

	// 3. Save and render job applications
	saveJobs(jobs);
	renderJobs(jobs);
}

function openAddDialog() {
	// 1. Update dialog title to add
	elements.jobDetailDialogTitle.innerText = 'Add New Application';
	elements.jobDetailDialogDescription.innerText =
		'Track a new job application by filling out the details below.';
	elements.jobDetailForm.dataset.mode = 'add';

	// 2. Reset inputs and display dialog
	elements.jobDetailForm.reset(); // clear prev inputs
	elements.jobDetailDialog?.showModal();
}

function openEditDialog(index) {
	// 1. Update dialog title to edit
	elements.jobDetailDialogTitle.innerText = 'Edit Application';
	elements.jobDetailDialogDescription.innerText =
		'Update the details of your job application.';
	elements.jobDetailForm.dataset.mode = 'edit';
	elements.jobDetailForm.dataset.id = index;

	// 2. Add selected job application data into input fields
	elements.jobDetailCompanyInput.value = jobs[index].company;
	elements.jobDetailPositionInput.value = jobs[index].position;
	elements.jobDetailStatusSelect.value = jobs[index].status;
	elements.jobDetailApplicationDate.value = jobs[index].date;
	elements.jobDetailNotesTextArea.value = jobs[index].notes;

	// 3. Open dialog
	elements.jobDetailDialog?.showModal();
}

function closeDialog() {
	elements.jobDetailDialog?.close();
}

export function initializeJobTracker() {
	jobs = loadJobs();
	renderJobs(jobs);

	if (elements.addJobBtn) {
		elements.addJobBtn.addEventListener('click', openAddDialog);
	}

	if (elements.jobDetailCloseDialogBtn) {
		elements.jobDetailCloseDialogBtn.addEventListener('click', (event) => {
			event.preventDefault();
			closeDialog();
		});
	}

	if (elements.jobDetailForm) {
		elements.jobDetailForm.addEventListener('submit', (event) => {
			event.preventDefault();
			handleJobSubmit();
			elements.jobDetailForm.reset();
			closeDialog();
		});
	}
}
