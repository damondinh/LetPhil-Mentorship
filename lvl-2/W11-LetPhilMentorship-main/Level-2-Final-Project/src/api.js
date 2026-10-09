const JOB_API = 'http://localhost:3000/api/jobs';

export async function getJobListings() {
	try {
		const response = await axios.get(JOB_API);
		const jobs = response.data.data;

		return jobs.map((job) => ({
			id: job.slug,
			title: job.title,
			company: job.company_name,
			location: job.location,
			description: job.description,
			remote: job.remote,
			url: job.url,
			tags: job.tags,
			jobTypes: job.job_types,
		}));
	} catch (error) {
		if (error.response && error.response.status === 404) {
			console.error('Job listings not found');
		} else if (error.respose) {
			console.error('Request failed: ', error.response.status);
		} else {
			console.error('Network error: ', error.message);
		}
		return [];
	}
}
