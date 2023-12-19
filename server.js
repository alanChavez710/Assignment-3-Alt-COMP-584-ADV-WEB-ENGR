const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 1337;
app.use(cors());

// Database connection configuration
const dbConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'example',
  database: 'assign',
  port: 13313
});

// Connect to the database
dbConnection.connect(err => {
  if (err) {
    console.error('Error connecting to the database: ', err);
    return;
  }
  console.log('Connected to the database.');
});
// dbConnection.query(query, queryParams, (err, results) => {
//     if (err) {
//         res.status(500).send('Error fetching data');
//         return;
//     }
//     console.log(results); // Log the results here
//     res.json(results);
// });


// Define a route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Route to get filtered business data with pagination
app.get('/business', (req, res) => {
    const { name, location, revenue, page = 1, limit = 25 } = req.query;

    let query = 'SELECT * FROM business WHERE 1=1';
    const queryParams = [];

    if (name) {
        query += ' AND name = ?';
        queryParams.push(name);
    }

    if (location) {
        query += ' AND location = ?';
        queryParams.push(location);
    }

    if (revenue) {
        query += ' AND revenue = ?';
        queryParams.push(revenue);
    }

    // Pagination logic
    const offset = (page - 1) * limit;
    query += ' LIMIT ?, ?';
    queryParams.push(offset, parseInt(limit));

    dbConnection.query(query, queryParams, (err, results) => {
        if (err) {
            res.status(500).send('Error fetching data');
            return;
        }
        res.json(results);
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
