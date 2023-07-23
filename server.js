const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000; // Choose a port number for your server

// Replace this with your database connection and query code
const uMMA_DBStats = {
  fighters: [
    { name: 'Fighter 1', wins: 10, losses: 2, draws: 1 },
    { name: 'Fighter 2', wins: 15, losses: 3, draws: 0 },
    // Add more data as needed
  ],
};

app.use(bodyParser.json());
app.use(cors());

app.get('/stats', (req, res) => {
  // Replace this with your database query to fetch stats from your database
  // For now, we'll just send fake data from the fakeDBStats object
  res.json(uMMA_DBStats.fighters);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
