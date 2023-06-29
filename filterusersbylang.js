require('dotenv').config();

// Import the Pool class from pg module
const { Pool } = require('pg');

// Create a new instance of Pool with database connection details from environment variables
const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

// Function to fetch data from the database based on login
const fetchDataByLogin = async (login) => {
    try {
        const query = {
            text: 'SELECT * FROM public.programminglanguage WHERE login = $1',
            values: [login],
        };

        // Connect to the database using the pool
        const client = await pool.connect();
        try {
            // Execute the query and get the result
            const result = await client.query(query);
            const data = result.rows;

            console.log(`Data for login '${login}':`);
            console.log(data);
        } finally {
            // Release the client back to the pool
            client.release();
        }
    } catch (error) {
        console.error('Error occurred:', error.message);
    }
};

// Retrieve the login from command line arguments
const login = process.argv[2];

// Check if login is provided
if (!login) {
    console.error('Please provide a login as a command line argument.');
    process.exit(1);
}

// Call the fetchDataByLogin function and handle the promise resolution
fetchDataByLogin(login)
    .then(() => {
        console.log('Data fetched successfully');
        process.exit(0); // Optional: Exit the process with a success code
    })
    .catch(error => {
        console.error('Error:', error.message);
        process.exit(1); // Optional: Exit the process with an error code
    });
