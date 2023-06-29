/* eslint-disable */
require('dotenv').config();

const promise = require('bluebird');
const initOptions = {
  promiseLib: promise
};

const pgp = require('pg-promise')(initOptions);

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

const db = pgp(cn);

// Function to query the database with optional parameters
const getUsers = (params = {}) => {
  const { login, id, name, public_repos, followers, following, company, node_id, location } = params;

  let query = 'SELECT login, id, name, public_repos, followers, following, company, node_id, location FROM public."Users" WHERE 1=1';
  const values = [];

  if (login) {
    query += ' AND login = $1';
    values.push(login);
  }

  if (location) {
    query += ' AND location = $2';
    values.push(location);
  }

  // Add more conditions for other optional parameters as needed

  return db.any(query, values);
};

const loginFilter = process.argv[2] || null;
const locationFilter = process.argv[3] || null;
const followersFilter = process.argv[4] || null;

if (loginFilter && locationFilter) {
    getUsers({ login: loginFilter, location: locationFilter })
      .then(data => {
        console.log(`Filtered by login '${loginFilter}' and location '${locationFilter}':`, data);
      })
      .catch(error => {
        console.log('ERROR:', error);
      });
  } else if (loginFilter) {
    getUsers({ login: loginFilter })
      .then(data => {
        console.log(`Filtered by login '${loginFilter}':`, data);
      })
      .catch(error => {
        console.log('ERROR:', error);
      });
  } else if (locationFilter) {
    getUsers({ location: locationFilter })
      .then(data => {
        console.log(`Filtered by location '${locationFilter}':`, data);
      })
      .catch(error => {
        console.log('ERROR:', error);
      });
  } else {
    getUsers()
      .then(data => {
        console.log('All users:', data);
      })
      .catch(error => {
        console.log('ERROR:', error);
      });
  }

