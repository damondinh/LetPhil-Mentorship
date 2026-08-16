const TARGET_COMPANIES_KEY = 'savedTargetCompanies';
const CAREER_GOAL_KEY = 'savedCareerGoals';
const JOBS_KEY = 'savedJobs';
const CONTACT_MESSAGE_KEY = 'savedContactMessages';
const SETTINGS_KEY = 'savedSettings';

const defaultCareerGoal = {
	goal: 'Land a new job',
	currTitle: '',
	currSalary: '',
	targetTitle: '',
	targetMinSalary: '',
	targetMaxSalary: '',
};

export function loadTargetCompanies() {
	const savedTargetCompanies = localStorage.getItem(TARGET_COMPANIES_KEY);

	if (!savedTargetCompanies) {
		return [];
	}

	try {
		return JSON.parse(savedTargetCompanies);
	} catch (error) {
		console.error('Failed to parse saved target companies', error);
		return [];
	}
}

export function saveTargetCompanies(targetCompanies) {
	localStorage.setItem(TARGET_COMPANIES_KEY, JSON.stringify(targetCompanies));
}

export function loadCareerGoal() {
	const savedCareerGoal = localStorage.getItem(CAREER_GOAL_KEY);

	if (!savedCareerGoal) {
		return { ...defaultCareerGoal }; // spread operator returns a copy of object
	}

	try {
		return { ...defaultCareerGoal, ...JSON.parse(savedCareerGoal) };
	} catch (error) {
		console.error('Failed to parse saved career goal', error);
		return { ...defaultCareerGoal };
	}
}

export function saveCareerGoal(careerGoal) {
	localStorage.setItem(CAREER_GOAL_KEY, JSON.stringify(careerGoal));
}

export function loadJobs() {
	const savedJobs = localStorage.getItem(JOBS_KEY);

	if (!savedJobs) {
		return [];
	}

	try {
		return JSON.parse(savedJobs);
	} catch (error) {
		console.error('Failed to parse saved jobs', error);
		return [];
	}
}

export function saveJobs(jobs) {
	localStorage.setItem(JOBS_KEY, JSON.stringify(jobs));
}

export function loadContactMessages() {
	const savedContactMessages = localStorage.getItem(CONTACT_MESSAGE_KEY);
	if (!savedContactMessages) {
		return [];
	}

	try {
		return JSON.parse(savedContactMessages);
	} catch (error) {
		console.error('Failed to parse contact messages', error);
		return [];
	}
}

export function saveContactMessage(message) {
	localStorage.setItem(CONTACT_MESSAGE_KEY, JSON.stringify(message));
}
