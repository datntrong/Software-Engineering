const http = require('http');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const pool = require('./config/db.config');
const index = require('./routes/index.route');
const { dirname } = require('path');

const app = express();
// body-parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/',require('./routes/auth'))
// database connection
pool.query(`USE ${process.env.DATABASE}`);
global.pool = pool;

app.use(express.static('../Bus'));

// all the api routes
app.use('/', index);
// port initialized
const PORT = process.env.PORT || 5000;

// server setup
const server = http.createServer(app);

server.listen(`${PORT}`, () => {
  console.log(`Server started on port ${PORT}`);
});