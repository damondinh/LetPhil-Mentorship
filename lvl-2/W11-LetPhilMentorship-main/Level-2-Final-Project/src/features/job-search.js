import { elements } from '../dom.js';
import { getJobListings } from '../api.js';

let allJobs = [];
let filteredJobs = [];
let visibleCount = 10;
let locations = [];

const JOBS_PER_BATCH = 10;

async function loadJobListings(page) {
	try {
		const result = await getJobListings(page);
		allJobs.push(...result);
		applyFilters();
	} catch (error) {
		console.error('Failed to load jobs\n', error);
	}
}
function createJobCard(job) {
	// 1. create job card
	const jobCard = document.createElement('li');
	jobCard.classList.add('listing-card');
	jobCard.classList.add('container');
	jobCard.dataset.id = job.id;

	jobCard.innerHTML = `
							<div class="listing-header">
								<p class="listing-title">${job.title}</p>
								<button id="saveBtn">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										height="24px"
										viewBox="0 -960 960 960"
										width="24px"
										fill="#e3e3e3">
										<path
											d="M200-120v-640q0-33 23.5-56.5T280-840h400q33 0 56.5 23.5T760-760v640L480-240 200-120Zm80-122 200-86 200 86v-518H280v518Zm0-518h400-400Z" />
									</svg>
								</button>
							</div>
							<p class="listing-text">${job.company}</p>
							<p class="listing-text">📍 ${job.location}</p>
	`;

	// 2. create meta
	const meta = document.createElement('div');
	meta.classList.add('listing-meta');
	job.jobTypes.forEach((type) => {
		const span = document.createElement('span');
		span.classList.add('badge', 'listing-badge');
		span.innerText = type;
		meta.appendChild(span);
	});

	// 3. create posted date
	const postedDate = document.createElement('p');
	postedDate.classList.add('listing-posted-date');
	postedDate.innerText = getPostedDate(job.createdAt);

	// 4. append
	jobCard.append(meta, postedDate);

	return jobCard;
}

function renderJobListings() {
	// 1. clear job jobListings
	elements.jobList.innerHTML = ``;

	// 2. loop through jobs, and create jobs
	const visibleJobs = filteredJobs.slice(0, visibleCount);

	visibleJobs.forEach((job) => {
		const card = createJobCard(job);
		elements.jobList.append(card);
	});

	// 3. Update Counts
	updateJobCount();

	// 4. auto select first job on re render
	if (filteredJobs.length > 0) {
		updateJobDetail(filteredJobs[0]);
		document.querySelector('.listing-card').classList.add('active');
	} else {
		elements.jobDetails.hidden = true;
	}
}

function applyFilters() {
	const searchTerm = elements.jobSearchInput.value.trim().toLowerCase();
	const selectedLocation = elements.locationFilter.value;

	filteredJobs = allJobs.filter((job) => {
		// Keyword filter
		const matchesSearch =
			job.title.toLowerCase().includes(searchTerm) ||
			job.company.toLowerCase().includes(searchTerm);

		// Location filter
		const matchesLocation =
			selectedLocation === '' || job.location === selectedLocation;
		return matchesSearch && matchesLocation;
	});

	visibleCount = JOBS_PER_BATCH;
	renderJobListings();
}

function updateJobCount() {
	elements.jobCount.innerText = `${filteredJobs.length} jobs found`;
}

function handleColumnClick(event) {
	// 1. Get the card
	const card = event.target.closest('.listing-card');
	if (!card) {
		return;
	}

	// 2. Get the Id
	const jobId = card.dataset.id;
	const job = filteredJobs.find((job) => job.id === jobId);

	// 3. Handle card clicked
	// remove active from all job cards
	const allJobCards = document.querySelectorAll('.listing-card');
	allJobCards.forEach((card) => {
		card.classList.remove('active');
	});
	// add active to clicked job card
	card.classList.add('active');
	updateJobDetail(job);
	elements.jobDetails.scrollTop = 0;

	// 4. Handle save button clicked
}

function updateJobDetail(job) {
	elements.jobDetails.hidden = false;
	elements.detailsTitle.innerText = job.title;
	elements.detailsCompany.innerText = job.company;
	elements.detailsLocation.innerText = job.location;
	elements.detailsRemote.innerText = job.remote ? 'Remote' : 'On-Site';
	elements.detailsDescription.innerHTML = htmlToText(job.description);
	elements.detailsMeta.innerHTML = ``;
	job.tags.forEach((tag) => {
		const span = document.createElement('span');
		span.classList.add('badge', 'listing-badge');
		span.innerText = tag;
		elements.detailsMeta.appendChild(span);
	});
	// change apply button to direct to apply url
	elements.detailsApply.onclick = () => {
		window.open(job.url, '_blank', 'noopener,noreferrer');
	};
}
function updateLocationFilter() {
	// 1. save selected value
	const selectedLocation = elements.locationFilter.value;
	// 2. Get all unique locations
	const allLocations = allJobs.map((job) => job.location);
	locations = [...new Set(allLocations)].filter((location) => location).sort();

	// 3. clear previous locations from filter
	elements.locationFilter.innerHTML = `<option value="">All locations</option>`;

	// 4. add locations to select filter
	locations.forEach((l) => {
		elements.locationFilter.add(new Option(l, l));
	});
	elements.locationFilter.value = selectedLocation;
}

// TODO: Save job to local storage and show in job tracker
function saveJob() {}

export async function initializeJobSearch() {
	if (elements.jobList) {
		elements.jobList.addEventListener('click', handleColumnClick);
	}

	if (elements.loadMoreBtn) {
		elements.loadMoreBtn.addEventListener('click', showMoreJobs);
	}

	if (elements.jobSearchInput) {
		elements.jobSearchInput.addEventListener('input', applyFilters);
	}
	if (elements.locationFilter) {
		elements.locationFilter.addEventListener('input', applyFilters);
	}

	await loadJobListings(1);

	updateLocationFilter();
}

// HELPER FUNCTIONS
function showMoreJobs() {
	visibleCount += JOBS_PER_BATCH;
	renderJobListings();
	console.log(visibleCount);
}
function getPostedDate(timestamp) {
	const days = getDaysAgo(timestamp);
	if (days === 0) return 'Posted today';
	if (days === 1) return 'Posted yesterday';
	if (days < 7) return `Posted ${days} days ago`;
	if (days < 30) return `Posted ${Math.floor(days / 7)} weeks ago`;
	return `Posted ${Math.floor(days / 30)} months ago`;
}

function getDaysAgo(timestamp) {
	const createDate = new Date(Number(timestamp) * 1000);
	const today = new Date();
	const difference = today - createDate;
	return Math.floor(difference / (1000 * 60 * 60 * 24));
}

function htmlToText(html) {
	const textarea = document.createElement('textarea');
	textarea.innerHTML = html;
	const decodedHtml = textarea.value;
	return decodedHtml;
}
