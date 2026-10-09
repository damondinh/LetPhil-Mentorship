import { elements } from '../dom.js';
import { getJobListings } from '../api.js';

let jobs = [];

export async function initializeJobSearch() {
	try {
		jobs = await getJobListings();
		console.log(jobs);
	} catch (error) {
		console.error('Failed to load jobs\n', error);
	}
}
