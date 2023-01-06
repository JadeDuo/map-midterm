const express = require('express');
const router  = express.Router();
const db = require('../db/connection');


//----------------- FAVORITES -----------------//
router.get('/fav_list', (req, res) => {  // <---- Get all Favorites by user

});

router.post('/add_fav', (req, res) => { // <---- Add favorite for user

});

router.post('/rem_fav', (req, res) => { // < --- remove favorite for user

});


//--------------- Login -----------------//
router.post('/', (req, res) => {
  const queryString = `
  SELECT * FROM users
  WHERE email = '${req.body.email}';
  `;

  return db.query(queryString)
    .then(data => {
      const email = data.rows[0].email
      req.session.userID = data.rows[0].id
      res.json({email})
    })
  
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});


// --------------- logout -----------------//
router.post('/logout', (req, res) => {
  console.log(req.session)
  req.session = null;
  req.session.destroy();
  console.log(req.session)
})

module.exports = router;