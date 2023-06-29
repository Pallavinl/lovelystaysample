require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

const fetchDataByLogin = async (login) => {
    try {
        const query = {
            text: 'SELECT * FROM public.programminglanguage WHERE login = $1',
            values: [login],
        };

        const client = await pool.connect();
        try {
            const result = await client.query(query);
            const data = result.rows;

            console.log(`Data for login '${login}':`);
            console.log(data);
        } finally {
            client.release();
        }
    } catch (error) {
        console.error('Error occurred:', error.message);
    }
};

// Retrieve the login from command line arguments
const login = process.argv[2];

if (!login) {
    console.error('Please provide a login as a command line argument.');
    process.exit(1);
}

fetchDataByLogin(login)
    .then(() => {
        console.log('Data fetched successfully');
        process.exit(0); // Optional: Exit the process
    })
    .catch(error => {
        console.error('Error:', error.message);
        process.exit(1); // Optional: Exit the process with an error code
    });
