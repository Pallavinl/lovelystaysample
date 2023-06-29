/* eslint-disable */

///////////////////////////////////////////////
// This is to show a complete test application;
///////////////////////////////////////////////
require('dotenv').config();

const promise = require('bluebird'); // or any other Promise/A+ compatible library;

const initOptions = {
    promiseLib: promise // overriding the default (ES6 Promise);
};

const pgp = require('pg-promise')(initOptions);
// See also: http://vitaly-t.github.io/pg-promise/module-pg-promise.html

// Database connection details;
const cn = {
    host: process.env.DB_HOST, // 'localhost' is the default;
    port: process.env.DB_PORT, // 5432 is the default;
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,

    // to auto-exit on idle, without having to shut-down the pool;
    // see https://github.com/vitaly-t/pg-promise#library-de-initialization
    allowExitOnIdle: true
};
// You can check for all default values in:
// https://github.com/brianc/node-postgres/blob/master/packages/pg/lib/defaults.js

const db = pgp(cn); // database instance;
// Define the parameters to be inserted
const login = process.argv[2] || 'testuser';
const id = process.argv[3] || 987;
const name = process.argv[4] || 'test';
const public_repos = process.argv[5] || 2;
const followers = process.argv[6] || 2;
const following = process.argv[7] || 0;
const company = process.argv[8] || 'N/A';
const node_id = process.argv[9] || 'MDQ6VXNlcj';
const location = process.argv[10] || 'N/A';
const performTransaction = async (login, id, name, public_repos, followers, following, company, node_id, location) => {
    try {
      let insertQuery = 'INSERT INTO ...';
      await db.tx(async t => {
        console.log('Trying to insert the record using the query : ', insertQuery);
        insertQuery = `INSERT INTO public."Users" (login, id, name, public_repos, followers, following, company, node_id, location)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
          RETURNING login;`;
    
        const Users = await t.one(insertQuery, [login, id, name, public_repos, followers, following, company, node_id, location]);
        console.log('Inserted record:', Users);
        return { Users };
      });
    } catch (error) {
      if (error.code === '23505') {
        // Handle the duplicate key violation error
        console.error('Since we already have this user in our repository, we cannot insert this record due to Duplicate key violation:', error.detail);
      } else {
        // Handle other errors
        console.error('Error:', error.message);
        //console.log('ERROR:', error);
      }
    }
  };
  
  module.exports = {
    performTransaction
  };

const { fetchAndInsertData } = require('./fetchusersbylang');

// Replace 'langId' with the actual language ID
fetchAndInsertData(login)
    .then(() => {
        console.log('Data fetched and inserted successfully');
        process.exit(0); // Optional: Exit the process
    })
    .catch(error => {
        console.error('Error:', error.message);
        process.exit(1); // Optional: Exit the process with an error code
    });
