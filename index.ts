import axios from 'axios';
import { spawn } from 'child_process';
require('dotenv').config();

const express = require('express');

const app = express();

const port = process.env.PORT || 3000; // Access the PORT environment variable or use a default value
// Retrieve the GitHub username from command-line arguments
const username = process.env.GITHUB_USERNAME || process.argv[2];


async function fetchGitHubUser(username: string): Promise<void> {
  try {
    console.log('trying to pull the information for username : '+ username);
    console.log('https://api.github.com/users/'+username)
    const response = await axios.get(`https://api.github.com/users/${username}`);
    console.log('got the response from the Github')
    const userData = response.data;

    const name = userData.name || 'N/A';
    const location = userData.location || 'N/A';
    const id = userData.id || null;
    const login = userData.login || 'testuser';
    const public_repos = userData.public_repos || null;
    const followers = userData.followers || null;
    const following = userData.following || null;
    const company = userData.company || null;
    const node_id = userData.node_id || null;

    const transaction = require('./transaction');

    console.log(`GitHub User: ${username}`);
    try {
    
    transaction.performTransaction (login, id, name, public_repos, followers, following, company, node_id, location);
    } catch (error) {
        console.log(`We couldn't insert the fetched user due to below exception: ${login}`);
    console.error('The fetched Github User Error:', error);
    }
    } catch (error) {
    console.error('Error fetching GitHub user information:', error, 'username is '+ username);
  }

}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
// Call the fetchGitHubUser function with the provided username
fetchGitHubUser(username);
