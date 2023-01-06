const express = require('express');
const router  = express.Router();
const db = require('../db/connection');


//----------------- FAVORITES -----------------//
router.get('/fave_list', (req, res) => {  // <---- Get all Favorites by user
  return db.query(`
  SELECT maps.id, maps.title
  FROM maps
  JOIN users ON users.id = creator_id
  JOIN favorites on maps.id = map_id
  WHERE user_id = ${req.session.userID};
  `)
  .then(data => {
    const maps = data.rows;
    res.json({ maps });
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });

});

router.post('/add_fave', (req, res) => { // <---- Add favorite for user
  const values = [req.session.userID, req.body.map_id]
  const queryString = `
  INSERT INTO favorites (user_id, map_id)
  VALUES ($1, $2);
  `
  return db.query(queryString, values)
    .then (data => {
      res.json({data})
    })
    .catch((err) => {
      console.log(err.message);
    })
});

router.post('/rem_fave', (req, res) => { // < --- remove favorite for user

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