require('dotenv').config();
const axios = require('axios');
const { Pool } = require('pg');

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

const fetchAndInsertData = async (langId) => {
    try {
        const url = `https://api.github.com/users/${langId}/repos`;
        const response = await axios.get(url);
        const repos = response.data;

        const client = await pool.connect();
        try {
            console.log('Trying to insert the records...');
            for (const repo of repos) {
                const { language } = repo;

                //if (language) {
                    const query = {
                        text: 'INSERT INTO public.programminglanguage(langid, login, expinmonths) VALUES ($1, $2, $3)',
                        values: [language,langId,24],
                    };

                    await client.query(query);
                //}
            }

            console.log('Records inserted successfully');
        } finally {
            client.release();
        }
    } catch (error) {
        console.error('Error occurred:', error.message);
    }
};

module.exports = {
    fetchAndInsertData,
};
