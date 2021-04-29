const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const pool = require('./config/db.config');
const index = require('./routes/index.route');

const app = express();

// body-parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// database connection
pool.query(`USE ${process.env.DATABASE}`);
global.pool = pool;

// all the api routes
app.use('/api', index);

// port initialized
const PORT = process.env.PORT || 5000;

// server setup
const server = http.createServer(app);

server.listen(`${PORT}`, () => {
  console.log(`Server started on port ${PORT}`);
});
