const JOB_API = 'https://www.arbeitnow.com/api/job-board-api';

export async function getJobsTest() {
	try {
		const response = await axios.get(JOB_API);
		jobs = response.data.jobs;

		jobs.forEach((job) => {
			console.log(job.title);
			console.log(job.company_name);
			console.log(job.location);
			console.log(job.url);
		});
	} catch (error) {
		if (error.response && error.response.status === 404) {
			console.log('Not found');
		} else if (error.response) {
			console.log(`Request failed: ${error.response.status}`);
		} else {
			console.log(`Network error: ${error.message}`); // no response
		}
	}
}
