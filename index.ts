import axios from 'axios';
import { spawn } from 'child_process';
require('dotenv').config();

// Import the Express module
const express = require('express');

// Create an Express application
const app = express();

// Access the PORT environment variable or use a default value
const port = process.env.PORT || 3000;

// Retrieve the GitHub username from environment variables or command-line arguments
const username = process.env.GITHUB_USERNAME || process.argv[2];

// Function to fetch GitHub user information
async function fetchGitHubUser(username: string): Promise<void> {
  try {
    console.log('Trying to pull information for username: ' + username);
    console.log('https://api.github.com/users/' + username);
    
    // Make a GET request to the GitHub API to fetch user information
    const response = await axios.get(`https://api.github.com/users/${username}`);
    console.log('Received response from GitHub');
    
    // Extract relevant data from the response
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

    // Import the transaction module
    const transaction = require('./transaction');

    console.log(`GitHub User: ${username}`);
    try {
      // Perform a transaction with the fetched user data
      transaction.performTransaction(login, id, name, public_repos, followers, following, company, node_id, location);
    } catch (error) {
      console.log(`We couldn't insert the fetched user due to the following exception: ${login}`);
      console.error('Error:', error);
    }
  } catch (error) {
    console.error('Error fetching GitHub user information:', error, 'Username:', username);
  }
}

// Start the Express server on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Call the fetchGitHubUser function with the provided username
fetchGitHubUser(username);
