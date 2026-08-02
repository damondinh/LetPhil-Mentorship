const TARGET_COMPANIES_KEY = 'savedTargetCompanies';
const CAREER_GOAL_KEY = 'savedCareerGoals';

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
		return { ...defaultCareerGoal }; // spread operator creates a copy of object
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
