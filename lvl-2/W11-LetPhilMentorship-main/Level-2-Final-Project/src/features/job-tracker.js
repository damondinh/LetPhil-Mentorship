import { elements } from '../dom.js';
import { loadJobs, saveJobs } from '../storage.js';

let jobs = []; // copy of local storage
let jobsToRender = []; // displayed to the UI

function renderJobs(jobsRendered) {
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
	jobsRendered.forEach((job, index) => {
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
                          <button class="btn-edit btn btn-action" data-index="${index}">✏️</button>
                          <button class="btn-delete btn btn-action" data-index="${index}">🗑️</button>
                        </div>`;
		elements.jobTrackerTable.appendChild(jobRow);
	});

	//5. Add functionality to action buttons
	initializeDeleteButtons();
	initializeEditButtons();

	//6. Update dashboard
	renderDashboard();
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
			// 2. Find selected job in jobs array to delete
			const selectedIndex = this.getAttribute('data-index');
			const selectedJob = jobsToRender[selectedIndex];
			const jobsIndex = jobs.findIndex(
				(job) => job.company === selectedJob.company && selectedJob.position,
			);

			// 3. Delete, save to local storage and render to UI
			jobs.splice(jobsIndex, 1); // update jobs
			jobsToRender.splice(selectedIndex, 1); // update UI
			saveJobs(jobs);
			renderJobs(jobsToRender);
		});
	});
}

function initializeEditButtons() {
	// 1. Get all edit buttons
	const editBtns = document.querySelectorAll('.btn-edit');
	editBtns.forEach((btn) => {
		btn.addEventListener('click', function () {
			// 2. Find selected job in jobs array to edit
			const selectedIndex = this.getAttribute('data-index');
			const selectedJob = jobsToRender[selectedIndex];
			const jobsIndex = jobs.findIndex(
				(job) => job.company === selectedJob.company && selectedJob.position,
			);

			// 3. Open edit dialog to edit
			openEditDialog(jobsIndex);
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
		// update UI
		jobsToRender.push(newJobApplication);

		// update jobs
		jobs.push(newJobApplication);
	} else if (mode === 'edit') {
		// update UI
		const selectedJob = jobs[index];
		const jobsToRenderIndex = jobsToRender.findIndex(
			(job) => job.company === selectedJob.company && selectedJob.position,
		);
		jobsToRender[jobsToRenderIndex] = newJobApplication;

		// update jobs
		jobs[index] = newJobApplication;
	}

	// 3. Save and render job applications
	saveJobs(jobs);
	renderJobs(jobsToRender);
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

function filterJobsByCompanyOrPosition() {
	const query = jobTrackerSearchInput.value.toLowerCase().trim();
	if (query === '') {
		jobsToRender = structuredClone(jobs);
		renderJobs(jobsToRender);
	} else {
		jobsToRender = jobs.filter(
			(job) =>
				job.company.toLowerCase().includes(query) ||
				job.position.toLowerCase().includes(query),
		);
		renderJobs(jobsToRender);
	}
}

function filterJobsByStatus() {
	const selectedFilter = elements.jobTrackerFilterSelect.value.trim();
	if (selectedFilter === 'All') {
		jobsToRender = structuredClone(jobs);
		renderJobs(jobsToRender);
	} else {
		jobsToRender = jobs.filter((job) => job.status === selectedFilter);
		renderJobs(jobsToRender);
	}
}

function renderDashboard() {
	renderJobsAppliedCount();
	renderJobsIntervewingCount();
	renderJobOffersCount();
	renderJobsAcceptedCount();
	renderJobsTotalCount();
}

function renderJobsAppliedCount() {
	const appliedJobs = jobs.filter((job) => job.status === 'Applied');
	elements.appliedCount.textContent = appliedJobs.length;
}

function renderJobsIntervewingCount() {
	const interviewJobs = jobs.filter((job) => job.status === 'Interview');
	elements.interviewCount.textContent = interviewJobs.length;
}

function renderJobOffersCount() {
	const offerJobs = jobs.filter((job) => job.status === 'Offer');
	elements.offerCount.textContent = offerJobs.length;
}

function renderJobsAcceptedCount() {
	const acceptedJobs = jobs.filter((job) => job.status === 'Accepted');
	elements.acceptedCount.textContent = acceptedJobs.length;
}

function renderJobsTotalCount() {
	elements.totalCount.textContent = jobs.length;
}

export function initializeJobTracker() {
	jobs = loadJobs();
	jobsToRender = structuredClone(jobs);
	renderJobs(jobsToRender);

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

	if (elements.jobTrackerSearchInput) {
		elements.jobTrackerSearchInput.addEventListener(
			'input',
			filterJobsByCompanyOrPosition,
		);
	}

	if (elements.jobTrackerFilterSelect) {
		elements.jobTrackerFilterSelect.addEventListener(
			'change',
			filterJobsByStatus,
		);
	}
}
