import { elements } from '../dom.js';
import { loadTargetCompanies, saveTargetCompanies } from '../storage.js';

let targetCompanies = [];

function renderTargetCompanies(companiesToRender = targetCompanies) {
	// 1. Validate targetCompaniesTable exists
	if (!elements.targetCompaniesTable) {
		return;
	}

	// 2. Clear the table's old data
	elements.targetCompaniesTable.innerHTML = '';

	// 3. Render table headers
	const tableHeader = document.createElement('div');
	tableHeader.id = 'tableHeader';
	tableHeader.classList.add('table-row');
	tableHeader.classList.add('text-th');
	tableHeader.innerHTML = `
		<div class="td">Company</div>
		<div class="td">Industry</div>
		<div class="td">Size</div>
		<div class="td">Location</div>
		<div class="td">Salary</div>
		<div class="td">Rating</div>
		<div class="td">Hiring Manager</div>
		<div class="td">Actions</div>`;
	elements.targetCompaniesTable.appendChild(tableHeader);

	// 4. Render each company as a row
	companiesToRender.forEach((company, index) => {
		const companyRow = document.createElement('div');
		companyRow.classList.add('table-row');
		companyRow.classList.add('table-content');
		companyRow.innerHTML = `
			<div class="td text-sm">${company.company}</div>
			<div class="td text-sm">${company.industry}</div>
			<div class="td text-sm">${company.size}</div>
			<div class="td text-sm">${company.location}</div>
			<div class="td text-sm">${company.salary}</div>
			<div class="td text-sm">${company.rating}</div>
			<div class="td text-sm">${company.hiringManager}</div>
			<div class="td">
				<button class="btn-edit btn-row" data-index="${index}">✏️</button>
				<button class="btn-delete btn-row" data-index="${index}">🗑️</button>
			</div>`;
		elements.targetCompaniesTable.appendChild(companyRow);
	});

	// 5. Add functionality to action buttons
	initializeDeleteButtons();
	initializeEditButtons();
}

function initializeEditButtons() {
	// 1. Get all edit buttons
	const editBtns = document.querySelectorAll('.btn-edit');

	// 2. Loop through all edit buttons and add event listener to open edit dialog
	editBtns.forEach((btn) => {
		btn.addEventListener('click', function () {
			const index = this.getAttribute('data-index');
			openEditDialog(index);
		});
	});
}

function initializeDeleteButtons() {
	const deleteBtns = document.querySelectorAll('.btn-delete');
	deleteBtns.forEach((btn) => {
		btn.addEventListener('click', function () {
			const index = this.getAttribute('data-index');
			targetCompanies.splice(index, 1);
			saveTargetCompanies(targetCompanies);
			renderTargetCompanies(targetCompanies);
		});
	});
}

function handleTargetCompanySubmit() {
	const mode = elements.targetCompanyForm.dataset.mode;
	const index = elements.targetCompanyForm.dataset.id;
	const newTargetCompany = {
		company: elements.tgtCoCompanyInput.value.trim(),
		industry: elements.tgtCoIndustryInput.value.trim(),
		size: elements.tgtCoSizeInput.value.trim(),
		location: elements.tgtCoLocationInput.value.trim(),
		hiringManager: elements.tgtCoHiringManagerInput.value.trim(),
		salary: elements.tgtCoSalaryInput.value.trim(),
		rating: elements.tgtCoRatingInput.value.trim(),
	};

	// Add new company to array or update existing target company
	if (mode === 'add') {
		targetCompanies.push(newTargetCompany);
	} else if (mode === 'edit') {
		targetCompanies[index] = newTargetCompany;
	}

	// Save and render target companies
	saveTargetCompanies(targetCompanies);
	renderTargetCompanies(targetCompanies);
}

function openAddDialog() {
	// 1. Update dialog title to add
	elements.targetCompanyDialogTitle.innerText = 'Add target company';
	elements.targetCompanyForm.dataset.mode = 'add';
	elements.targetCompanyForm.reset(); // clear prev inputs

	elements.targetCompanyDialog?.showModal();
}

function openEditDialog(index) {
	// 1. Update dialog title to edit
	elements.targetCompanyDialogTitle.innerText = 'Edit target company';
	elements.targetCompanyForm.dataset.mode = 'edit';
	elements.targetCompanyForm.dataset.id = index;

	// 2. Add selected target company data into imput fields to modify
	elements.tgtCoCompanyInput.value = targetCompanies[index].company;
	elements.tgtCoIndustryInput.value = targetCompanies[index].industry;
	elements.tgtCoSizeInput.value = targetCompanies[index].size;
	elements.tgtCoLocationInput.value = targetCompanies[index].location;
	elements.tgtCoSalaryInput.value = targetCompanies[index].salary;
	elements.tgtCoRatingInput.value = targetCompanies[index].rating;
	elements.tgtCoHiringManagerInput.value = targetCompanies[index].hiringManager;

	elements.targetCompanyDialog?.showModal();
}

function closeDialog() {
	elements.targetCompanyDialog?.close();
}

export function initializeCompanies() {
	targetCompanies = loadTargetCompanies();
	renderTargetCompanies(targetCompanies);

	if (elements.addTargetCompanyBtn) {
		elements.addTargetCompanyBtn.addEventListener('click', openAddDialog);
	}

	if (elements.targetCompanyDialogCloseBtn) {
		elements.targetCompanyDialogCloseBtn.addEventListener('click', (event) => {
			event.preventDefault();
			closeDialog();
		});
	}

	if (elements.targetCompanyForm) {
		elements.targetCompanyForm.addEventListener('submit', (event) => {
			event.preventDefault();
			handleTargetCompanySubmit();
			elements.targetCompanyForm.reset();
			closeDialog();
		});
	}
}
