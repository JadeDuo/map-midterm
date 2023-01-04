/*
 * All routes for Widget Data are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /api/widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const db = require('../db/connection');


router.get('/', (req, res) => {
  const query = `
  SELECT north, south, east, west, zoom, center_lat AS lat, center_lng AS lng
  FROM maps
  WHERE creator_id = 1;
  `;
  console.log(query);
  db.query(query)
    .then(data => {
      const mapsData = data.rows;
      res.json({ mapsData });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.post('/newmap', (req, res) => {

  console.log(req.body)

  const addMap = function (map) {

    const insertNewMap = `
    INSERT INTO maps (creator_id, title, north, south, east, west, zoom, center_lat, center_lng)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *;
    `;
    const values = [map.creator_id, map.title, map.north, map.south, map.east, map.west, map.zoom, map.center_lat, map.center_lng]
  
    return db.query(insertNewMap, values)
      .then(() => {
        console.log('succesful')
        return 'success'
      })
      .catch((err) => {
        console.log(err.message);
      })
  }

  addMap(req.body)
})

module.exports = router;
