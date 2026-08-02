import { initializeSideBar } from './ui/side-bar.js';
import { initializeCareerGoal } from './features/career-goal.js';
import { initializeCompanies } from './features/target-companies.js';

function initializeApp() {
	initializeSideBar();
	initializeCompanies();
	initializeCareerGoal();
}

initializeApp();
