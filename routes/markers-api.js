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

//add new marker
module.exports = router;

router.post('/newmarker', (req, res) => {

  console.log(req.body)

  const addMarker = function (marker) {

    const insertNewMarker = `
    INSERT INTO markers_info (location_name, info, img_link)
    VALUES ($1, $2, $3)
    RETURNING *;
    `;
    const values = [marker.location_name, marker.info, marker.img_link]

    return db.query(insertNewMarker, values)
      .then(() => {
        console.log('successful')
        return 'success'
      })
      .catch((err) => {
        console.log(err.message);
      })
  }

  addMarker(req.body)
})

module.exports = router;
