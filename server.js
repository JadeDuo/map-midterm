// load .env data into process.env
require('dotenv').config();

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
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const userApiRoutes = require('./routes/users-api');
const markerApiRoutes = require('./routes/markers-api');
const mapsDataApiRoutes = require('./routes/mapsData-api');
const newmapApiRoutes = require('./routes/newmaps-api');
const usersRoutes = require('./routes/users');
const newMapRoutes = require('./routes/newmap');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/api/users', userApiRoutes);
app.use('/api/markers', markerApiRoutes)
app.use('/api/mapsdata', mapsDataApiRoutes);
app.use('/api/newmaps', newmapApiRoutes);
app.use('/users', usersRoutes);
app.use('/newmap', newMapRoutes);
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get('/', (req, res) => {
  res.render('index', {path: ""});
});

app.get('/:any', (req, res) => {
  res.render('index', {path: req.params.any});
});

//auto-login for midterm presentation
app.get('/login/:id', (req, res) => {
  // set the cookie
  req.session.user_id = req.params.id;

  //redirect the user
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
