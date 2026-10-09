const JOB_API = 'http://localhost:3000/api/jobs';

export async function getJobsTest() {
	try {
		const response = await axios.get(JOB_API);
		const jobs = response.data.data;

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
