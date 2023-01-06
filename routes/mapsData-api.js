const express = require('express');
const router  = express.Router();
const db = require('../db/connection');


// -------------------------- GET ALL MAPS FOR USER -------------//
router.get('/my_maps', (req, res) => {
  return db.query(`
  SELECT maps.id, title
  FROM maps
  JOIN users ON users.id = creator_id
  WHERE creator_id = ${req.session.userID};
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

})


// ---------------GET ALL MAPS FOR HOME PAGE --------------------- //
router.get('/all_maps', (req, res) => {
  return db.query(`
  SELECT maps.id, title
  FROM maps;
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

})


// ---------------GET ALL MAPS JSON --------------------- //
router.get('/maps_json', (req, res) => {
  const queryString = `
  SELECT creator_id, maps.id, title, north, south, east, west, zoom, center_lat, center_lng
  FROM maps
  `
  return db.query(queryString)
    .then(data => {
      data.rows;
    })
    .then(maps => {
      res.json({ maps });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});


// -------------------- GET SINGLE MAP BY ID ---------------- //
router.get('/:id', (req, res) => {
  const id = req.params.id
  const viewMapQuery = `
  SELECT north, south, east, west, zoom, center_lat AS lat, center_lng AS lng, id
  FROM maps
  WHERE id = ${id || 1};
  `
  
  db.query(viewMapQuery)
  .then(data => {
    const mapsData = data.rows;
    console.log('back-end:', id, mapsData)
    res.json({mapsData})
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });
  
})


//---------- ADD NEW MAP TO DATABASE  ----------//

router.post('/newmap', (req, res) => {

  const addMap = function (map) {

    const insertNewMap = `
    INSERT INTO maps (creator_id, title, north, south, east, west, zoom, center_lat, center_lng)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *;
    `;
    const values = [req.session.userID, map.title, map.north, map.south, map.east, map.west, map.zoom, map.center_lat, map.center_lng]

    return db.query(insertNewMap, values)
      .then(() => {})
      .catch((err) => {
        console.log(err.message);
      })
  }

  addMap(req.body)
})

module.exports = router;

