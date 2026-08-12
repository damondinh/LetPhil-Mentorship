let targetCompanies = [];
let careerGoal = {};

// References to DOM elements
const toggleButton = document.getElementById('toggle-btn');
const sidebar = document.getElementById('sidebar');
const targetCompaniesTable = document.getElementById('targetCompaniesTable');
const addTargetCompanyBtn = document.getElementById('addTargetCompanyBtn');
const careerGoalTxt = document.getElementById('careerGoalTxt');
const currTitleTxt = document.getElementById('currTitleTxt');
const currSalaryTxt = document.getElementById('currSalaryTxt');
const targetTitleTxt = document.getElementById('targetTitleTxt');
const targetSalaryTxt = document.getElementById('targetSalaryTxt');
const careerGoalDialog = document.getElementById('careerGoalDialog');
const editCareerGoalBtn = document.getElementById('editCareerGoalBtn');
const careerGoalInput = document.getElementById('careerGoalInput');
const currTitleInput = document.getElementById('currTitleInput');
const currSalaryInput = document.getElementById('currSalaryInput');
const targetTitleInput = document.getElementById('targetTitleInput');
const targetMinSalaryInput = document.getElementById('targetMinSalaryInput');
const targetMaxSalaryInput = document.getElementById('targetMaxSalaryInput');
const submitCareerGoalBtn = document.getElementById('submitCareerGoalBtn');

/******************************************
 * TARGET COMPANY METHODS
 ******************************************/
// loadTargetCompanies() -> load the saved target companies from localStorage
function loadTargetCompanies() {
	// 1. Get saved data from local storage
	const savedTargetCompanies = localStorage.getItem('savedTargetCompanies');

	// 2. Validate data exists
	if (savedTargetCompanies) {
		targetCompanies = JSON.parse(savedTargetCompanies); // parse the json data to array
	} else {
		console.log('No saved target companies found in local storage');
	}
}

// saveTargetCompanies() -> save target companies into localStorage
function saveTargetCompanies() {
	localStorage.setItem('savedTargetCompanies', JSON.stringify(targetCompanies));
	console.log('Target Companies saved to local storage');
}

// renderTargetCompanies() -> render the target companies to the screen
function renderTargetCompanies(companiesToRender) {
	// 1. Clear the target companies container
	targetCompaniesTable.innerHTML = ``;

	// 2. Render target companies table headers
	const tableHeader = document.createElement('div');
	tableHeader.id = 'tableHeader';
	tableHeader.classList.add('row');
	tableHeader.classList.add('text-th');
	tableHeader.innerHTML = `
                        <div>Company</div>
                        <div>Industry</div>
                        <div>Size</div>
                        <div>Location</div>
												<div>Salary</div>
												<div>Rating</div>
												<div style="text-align: center;">Actions</div>`;
	targetCompaniesTable.appendChild(tableHeader);

	// 3. Render each target company as a row
	companiesToRender.forEach((company, index) => {
		const companyRow = document.createElement('div');
		companyRow.classList.add('row');
		companyRow.classList.add('row-content');
		companyRow.innerHTML = `
												<div class="text-sm">${company.name}</div>
												<div class="text-sm">${company.industry}</div>
												<div class="text-sm">${company.size}</div>
												<div class="text-sm">${company.location}</div>
												<div class="text-sm">${company.salary}</div>
												<div class="text-sm">${company.rating}</div>
												<div>
                            <button class="btn-edit btn-row" data-index="${index}">✏️</button>
                            <button class="btn-delete btn-row" data-index="${index}">🗑️</button>
                        </div>
												`;
		targetCompaniesTable.appendChild(companyRow);
	});
}

// addTargetCompany() -> temp method to test target company table
function addTargetCompany() {
	// 1. Create temp new company
	const newCompany = {
		name: 'google',
		industry: 'technology',
		size: 3000,
		location: 'syndey',
		salary: 120000,
		rating: 3.5,
	};

	// 2. Add new target company to array and save to local storage
	targetCompanies.push(newCompany);
	saveTargetCompanies();
	renderTargetCompanies(targetCompanies);
}

/******************************************
 * CAREER GOAL METHODS
 ******************************************/
// loadCareerGoals() -> load the saved career goals from localStorage
function loadCareerGoals() {
	// 1. Get saved data from local storage
	const savedCareerGoals = localStorage.getItem('savedCareerGoals');

	// 2. Validate data exists
	if (savedCareerGoals) {
		careerGoal = JSON.parse(savedCareerGoals); // parse the json data to array
	} else {
		console.log('No saved career goals found in local storage');
	}
}

// saveCareerGoals() -> save career goals into localStorage
function saveCareerGoals() {
	localStorage.setItem('savedCareerGoals', JSON.stringify(careerGoal));
	console.log('Career goals saved to local storage');
}

// renderCareerGoals() -> render the career goals to the screen
function renderCareerGoals(careerGoalsToRender) {
	// 1. Clear the career goals
	careerGoalTxt.innerText = ``;
	currTitleTxt.innerText = ``;
	currSalaryTxt.innerText = ``;
	targetTitleTxt.innerText = ``;
	targetSalaryTxt.innerText = ``;

	// 2. Render career goals to the UI
	careerGoalTxt.innerText = `${careerGoalsToRender.goal}`;
	currTitleTxt.innerText = `${careerGoalsToRender.currTitle}`;
	currSalaryTxt.innerText = `${careerGoalsToRender.currSalary}`;
	targetTitleTxt.innerText = `${careerGoalsToRender.targetTitle}`;
	targetSalaryTxt.innerText = `${careerGoalsToRender.targetMinSalary} - ${careerGoalsToRender.targetMaxSalary}`;
}

// editCareerGoal() -> edit career goals and save to local storage
function editCareerGoal() {
	// 1. Create new career goal
	const newCareerGoal = {
		goal: careerGoalInput.value,
		currTitle: currTitleInput.value,
		currSalary: currSalaryInput.value,
		targetTitle: targetTitleInput.value,
		targetMinSalary: targetMinSalaryInput.value,
		targetMaxSalary: targetMaxSalaryInput.value,
	};

	// 2. Add new career goal to object and save to local storage
	careerGoal = newCareerGoal;
	saveCareerGoals();
	renderCareerGoals(newCareerGoal);
}

/******************************************
 * OTHER UI METHODS
 ******************************************/
// openDialog() -> Opens dialog
function openDialog() {
	careerGoalDialog.showModal();
}

// closeDialog() -> Closes dialog
function closeDialog() {
	careerGoalDialog.close();
}

// toggleSideBar() -> toggles side bar open/close
function toggleSideBar() {
	sidebar.classList.toggle('close');
	toggleButton.classList.toggle('rotate');
}

// Add event listeners
if (addTargetCompanyBtn)
	addTargetCompanyBtn.addEventListener('click', addTargetCompany);
if (editCareerGoalBtn) editCareerGoalBtn.addEventListener('click', openDialog);
if (closeModalBtn) closeModalBtn.addEventListener('click', closeDialog);
if (submitCareerGoalBtn)
	submitCareerGoalBtn.addEventListener('click', editCareerGoal);

// Initialize the app
function initialize() {
	loadTargetCompanies();
	loadCareerGoals();
	renderTargetCompanies(targetCompanies);
	renderCareerGoals(careerGoal);
}

initialize();
