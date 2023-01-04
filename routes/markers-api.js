/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/markers');

router.get('/', (req, res) => {
  userQueries.getMarkers()
    .then(markers => {
      res.json({ markers });
      console.log(markers)
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.post('/marker', (req, res) => {

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
