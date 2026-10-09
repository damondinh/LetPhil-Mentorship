const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

app.use(cors());

app.get('/api/jobs', async (req, res) => {
	try {
		const response = await axios.get(
			'https://www.arbeitnow.com/api/job-board-api',
		);
		res.json(response.data);
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ error: 'Failed to retrieve jobs' });
	}
});

app.listen(3000, () => {
	console.log('Server running on http://localhost:3000');
});
