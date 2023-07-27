const express = require('express');

const mysql = require('mysql2'); // Import the mysql2 library
const app = express();

const cors = require('cors');
app.use(cors());

// Create the database connection pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Arizona31!',
    database: 'undisputedmma_db',
  connectionLimit: 10, // Adjust the number of connections in the pool as needed
});

// Endpoint to fetch fighters from the database
app.get('/api/fighters', (req, res) => {
  // Use the database connection pool to execute the query
  pool.query('SELECT * FROM fighters', (err, results) => {
    if (err) {
      console.error('Error fetching data from the database:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(results);
    }
  });
});

// Start the server
const PORT = 3000; // Replace with your desired port number
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
