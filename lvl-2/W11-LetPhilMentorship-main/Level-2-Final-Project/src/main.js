import { initializeSideBar } from './ui/side-bar.js';
import { initializeCareerGoal } from './features/career-goal.js';
import { initializeCompanies } from './features/target-companies.js';
import { initializeJobTracker } from './features/job-tracker.js';

function initializeApp() {
	initializeSideBar();
	initializeCompanies();
	initializeCareerGoal();
	initializeJobTracker();
}

initializeApp();
