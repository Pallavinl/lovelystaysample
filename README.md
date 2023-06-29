# sampleapp
The project aims to develop a command-line application using Node.js, TypeScript/JavaScript, and PostgreSQL. The application's purpose is to fetch user data from the GitHub API and store it in a PostgreSQL database. It provides various functionalities for querying and displaying user information.

**Project Usage Documentation**

This documentation provides instructions on how to use the Node.js sample project. This project is a command-line application that interacts with the GitHub API and PostgreSQL database to fetch and store user information.

**Prerequisites:**
- Node.js and npm installed on your machine.
- PostgreSQL database setup and running.
- GitHub account and API access token (if required).

**Installation:**
1. Clone the repository:
   ```
   git clone https://github.com/xxxxxxxxxxxxxxxxxxxxxxx/nodejssample.git
   ```

2. Navigate to the project directory:
   ```
   cd nodejssample
   ```

3. Install the project dependencies:
   ```
   npm install
   ```

4. Configure environment variables:
   - Create a `.env` file in the project root directory.
   - Set the following environment variables in the `.env` file:
     ```
     DB_HOST=<your_database_host>
     DB_PORT=<your_database_port>
     DB_DATABASE=<your_database_name>
     DB_USER=<your_database_username>
     DB_PASSWORD=<your_database_password>
     GITHUB_TOKEN=<your_github_api_token>
     ```

**Usage:**
1. Fetch information about a GitHub user and store it in the database:
   ```
   npm run fetch <username>
   ```
   Replace `<username>` with the GitHub username you want to fetch information for.

2. Display all users already stored in the database:
   ```
   npm run display
   ```

3. Filter users by location:
   ```
   npm run filter --location=<location>
   ```
   Replace `<location>` with the desired location to filter the users.

4. Query users by programming languages:
   ```
   npm run query --language=<language>
   ```
   Replace `<language>` with the desired programming language to query the users.

**Examples:**
- To fetch information for a GitHub user named "johnsmith" and store it in the database:
  ```
  npm run fetch johnsmith
  ```

- To display all users stored in the database:
  ```
  npm run display
  ```

- To filter users by location and display the results:
  ```
  npm run filter --location=New York
  ```

- To query users by programming language and display the results:
  ```
  npm run query --language=JavaScript
  ```

**Note:**
- Make sure your PostgreSQL database is properly configured and accessible.
- If the GitHub API rate limit is exceeded, you may encounter errors. In that case, consider using a valid GitHub API access token in the `.env` file.
- Ensure that the environment variables in the `.env` file match your database and GitHub API configuration.

Feel free to reach out if you have any questions or need further assistance!
