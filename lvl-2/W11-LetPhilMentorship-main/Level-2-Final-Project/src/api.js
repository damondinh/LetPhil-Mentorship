const JOB_API = 'http://localhost:3000/api/jobs';

export async function getJobListings(page = 1) {
	try {
		const response = await axios.get(JOB_API, { params: { page } });
		const jobs = response.data.data.map((job) => ({
			id: job.slug,
			title: job.title,
			company: job.company_name,
			location: job.location,
			description: job.description,
			remote: job.remote,
			url: job.url,
			tags: job.tags,
			jobTypes: job.job_types,
			createdAt: job.created_at,
		}));
		return jobs;
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
