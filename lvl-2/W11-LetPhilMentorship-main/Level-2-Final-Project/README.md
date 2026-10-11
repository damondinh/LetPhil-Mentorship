# Level 2 Final Project

A web application built with vanilla HTML, CSS, and JavaScript. It includes a job search feature powered by the Arbeitnow API and a job tracker for saved listings.

## Features

Goal Setting

- Set current and target job title and salaries
- Create a list of target companies and store name, industry, size, location, expected salary, rating and hiring manager
- Edit/Delete target companies details

Job Tracker

- Create a list current job applications and store name, position, status, date applied, and notes
- Edit/Delete application details
- Filer job applications by status using a drop down menu
- Filter job applications by position or name using a search bar with live searching
- Dashboard to display total number of applications and number of job applications in each stage (applied, interview, offer, accepted)

Contact Us

- Send an enquiry email that gets validated and stored into local storage

Job Search

- Search for jobs using Arbeitnow API
- Filter job listings by location using a drop down menu
- Filter job listings by title or company using a search bar with live searching

## Future work

- Saving searched jobs to the tracker

## Prerequisites

- [Node.js](https://nodejs.org/) and npm
- A modern web browser

## Getting started

1. Clone the repository and open the project folder:

   ```bash
   git clone <repository-url>
   cd Level-2-Final-Project
   ```

   Alternatively, open the project folder if you already have a copy.

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the frontend and backend together:

   ```bash
   npm start
   ```

4. Open the app in your browser:
   - Home: http://localhost:5501/index.html
   - Job search: http://localhost:5501/job-search.html
   - Job tracker: http://localhost:5501/job-tracker.html

The start script runs the Express API server on **port 3000** and Live Server on **port 5501**. Leave the terminal running while using the app. Press **Ctrl+C** to stop both servers.

## Tech

- HTML, CSS, and JavaScript
- Node.js and Express (backend proxy)
- Axios (HTTP requests)
- Arbeitnow Job Board API (job listings)
- Browser localStorage (saved jobs)

## Troubleshooting

- **Job listings aren't loading:** Make sure `npm start` is still running and http://localhost:3000/api/jobs responds.
- **Port already in use:** Stop any existing Live Server or Node server running on ports 5501 or 3000, then retry.
- **Missing dependencies:** Run `npm install` from the project root.

An internet connection is required to retrieve job listings. Listings come from a third-party API and may change over time.
