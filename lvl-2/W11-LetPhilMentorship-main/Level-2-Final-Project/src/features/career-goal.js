import { elements } from '../dom.js';
import { loadCareerGoal, saveCareerGoal } from '../storage.js';

let careerGoal = {
	goal: 'Land a new job',
	currTitle: '',
	currSalary: '',
	targetTitle: '',
	targetMinSalary: '',
	targetMaxSalary: '',
};

export function renderCareerGoals(careerGoalsToRender = careerGoal) {
	// Check if element exists
	if (
		!elements.careerGoalTxt ||
		!elements.currTitleTxt ||
		!elements.currSalaryTxt ||
		!elements.targetTitleTxt ||
		!elements.targetSalaryTxt
	) {
		return;
	}

	// Update UI
	elements.careerGoalTxt.innerText =
		careerGoalsToRender.goal || 'Land a new job';
	elements.currTitleTxt.innerText = careerGoalsToRender.currTitle || '-';
	elements.currSalaryTxt.innerText = careerGoalsToRender.currSalary || '-';
	elements.targetTitleTxt.innerText = careerGoalsToRender.targetTitle || '-';
	elements.targetSalaryTxt.innerText =
		careerGoalsToRender.targetMinSalary || careerGoalsToRender.targetMaxSalary
			? `${careerGoalsToRender.targetMinSalary} - ${careerGoalsToRender.targetMaxSalary}`
			: '-';
}

function openDialog() {
	// Display current inputs to edit
	elements.careerGoalInput.value = careerGoal.goal;
	elements.currTitleInput.value = careerGoal.currTitle;
	elements.currSalaryInput.value = careerGoal.currSalary;
	elements.targetTitleInput.value = careerGoal.targetTitle;
	elements.targetMinSalaryInput.value = careerGoal.targetMinSalary;
	elements.targetMaxSalaryInput.value = careerGoal.targetMaxSalary;

	elements.careerGoalDialog?.showModal();
}

function handleCareerGoalSubmit() {
	careerGoal = {
		goal: elements.careerGoalInput?.value || '',
		currTitle: elements.currTitleInput?.value || '',
		currSalary: elements.currSalaryInput?.value || '',
		targetTitle: elements.targetTitleInput?.value || '',
		targetMinSalary: elements.targetMinSalaryInput?.value || '',
		targetMaxSalary: elements.targetMaxSalaryInput?.value || '',
	};

	saveCareerGoal(careerGoal);
	renderCareerGoals(careerGoal);
}

function closeDialog() {
	elements.careerGoalDialog?.close();
}

export function initializeCareerGoal() {
	careerGoal = loadCareerGoal();
	renderCareerGoals(careerGoal);

	if (elements.editCareerGoalBtn) {
		elements.editCareerGoalBtn.addEventListener('click', openDialog);
	}

	if (elements.careerGoalDialogCloseBtn) {
		elements.careerGoalDialogCloseBtn.addEventListener('click', (event) => {
			event.preventDefault();
			closeDialog();
		});
	}

	if (elements.careerGoalForm) {
		elements.careerGoalForm.addEventListener('submit', (event) => {
			event.preventDefault();
			handleCareerGoalSubmit();
			closeDialog();
		});
	}
}
