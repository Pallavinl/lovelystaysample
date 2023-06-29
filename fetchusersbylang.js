require('dotenv').config(); // Loads environment variables from .env file

const axios = require('axios'); // HTTP client for making API requests
const { Pool } = require('pg'); // PostgreSQL client library

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
}); // Creates a PostgreSQL connection pool using the provided environment variables

const fetchAndInsertData = async (langId) => {
    try {
        const url = `https://api.github.com/users/${langId}/repos`; // Constructs the URL to fetch user repositories based on langId
        const response = await axios.get(url); // Sends an HTTP GET request to the GitHub API and awaits the response
        const repos = response.data; // Extracts the repository data from the response

        const client = await pool.connect(); // Acquires a client connection from the connection pool
        try {
            console.log('Trying to insert the records...');
            for (const repo of repos) {
                const { language } = repo; // Extracts the programming language of each repository
                    const query = {
                        text: 'INSERT INTO public.programminglanguage(langid, login, expinmonths) VALUES ($1, $2, $3)',
                        values: [language, langId, 24], // Binds the language, langId, and 24 (months of experience) as parameter values
                    };
                    await client.query(query); // Executes the INSERT query using the client connection
            }

            console.log('Records inserted successfully');
        } finally {
            client.release(); // Releases the client connection back to the pool
        }
    } catch (error) {
        console.error('Error occurred:', error.message); // Handles any errors that occur during the process
    }
};

module.exports = {
    fetchAndInsertData, // Exports the fetchAndInsertData function to be used by other modules
};
