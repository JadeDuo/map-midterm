// load .env data into process.env
require('dotenv').config();

//Cookie - encryption
const cookieSession = require("cookie-session");

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');

const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));

app.use(cookieSession({
  name: 'session',
  keys: ['charmander', 'squirtle', 'bulbasaur', 'pikachu'],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));


// Separated Routes for each Resource
const userApiRoutes = require('./routes/users-api');
const markerApiRoutes = require('./routes/markers-api');
const mapsDataApiRoutes = require('./routes/mapsData-api');



// Mount all resource routes
app.use('/api/users', userApiRoutes);
app.use('/api/markers', markerApiRoutes)
app.use('/api/mapsdata', mapsDataApiRoutes);

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get('/', (req, res) => {
  res.render('index', {path: ""});
});

app.get('/:any', (req, res) => {  // Error handling for any endpoint entered
  res.render('index', {path: req.params.any});
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
