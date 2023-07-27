const mysql = require('mysql');

// MySQL database configuration
const connection = mysql.createConnection({
  host: 'localhost',      // Change this to your MySQL server's host if it's not running locally
  user: 'root@localhost',  // Replace 'your_username' with your MySQL username
  password: 'Arizona31!',  // Replace 'your_password' with your MySQL password
  database: 'undisputedmma_db' // The name of your MySQL database
});

// Connect to the MySQL server
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
    return;
  }
  console.log('Connected to MySQL database!');
});

// Perform a sample query (you can replace this with your custom queries)
connection.query('SELECT * FROM your_table', (err, results) => {
  if (err) {
    console.error('Error executing the query:', err.message);
    return;
  }

  // Process the query results (you can customize this part)
  console.log('Query results:', results);
});

// Close the MySQL connection when the Node.js process is terminated
process.on('SIGINT', () => {
  connection.end();
  console.log('MySQL connection closed.');
  process.exit();
});
