const express = require('express');
const router  = express.Router();
const db = require('../db/connection');


// ---------------------- GET ALL MARKERS ---------------------- //
router.get('/', (req, res) => {
  const queryString = `
  SELECT markers.lat AS lat, markers.lng AS lng, location_name, info, img_link, img_src, markers.id
  FROM markers
  JOIN markers_info ON markers_info.id = markers.marker_info_id
  JOIN icons ON icons.id = icon_id;
  `
  return db.query(queryString)
    .then(data => {
      const markers = data.rows
      res.json({markers})
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});


// ------------------- DELETE MARKERS ---------------------- //
router.get('/:id', (req, res) => {
  const id = req.params.id
  const viewMapQuery = `
  DELETE FROM markers
  WHERE id = ${id};
  `

  db.query(viewMapQuery)
  .then(data => {
    res.json({data})
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });
  
})


// ------------------- ADD NEW MARKERS ---------------------- //
router.post('/newmarker', (req, res) => {
  const addMarker = function (marker) {

    const insertNewMarker = `
    INSERT INTO markers_info (location_name, info, img_link)
    VALUES ($1, $2, $3) RETURNING id as marker_info_id;
    `;
    const values = [marker.location_name, marker.info, marker.img_link]

    return db.query(insertNewMarker, values)
      .then(data => {

        const markerID = data.rows[0].marker_info_id
        const values = [marker.map_id, marker.lat, marker.lng, markerID, marker.icon_id]
        const insertNewMarker = `
        INSERT INTO markers (map_id, lat, lng, marker_info_id, icon_id)
        VALUES ($1, $2, $3, $4, $5) RETURNING id as marker_info_id;
        `;

        db.query(insertNewMarker, values)
          .then(()=> {})
        })
      .catch((err) => {
        console.log(err.message);
      })
  }

  addMarker(req.body)
});

module.exports = router;
