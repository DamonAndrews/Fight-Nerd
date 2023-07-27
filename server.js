const express = require('express');
const mysql = require('mysql2');


const app = express();
const port = 3000; // Choose any port you prefer
// MySQL database configuration
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Arizona31!',
  database: 'undisputedmma_db'
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to the MySQL database!');
});

// Define your API endpoint to get data from the MySQL database
app.get('/api/fighters', (req, res) => {
  // Replace this query with your own query to fetch data from the database
  const sqlQuery = 'SELECT * FROM fighters';

  db.query(sqlQuery, (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    res.json(results);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
