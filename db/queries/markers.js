const db = require('../connection');

const getMarkers = () => {
  const queryString = `
  SELECT markers.lat AS lat, markers.lng AS lng, location_name, info, img_link, img_src
  FROM markers
  JOIN markers_info ON markers_info.id = markers.marker_info_id
  JOIN icons ON icons.id = icon_id;
  `
  return db.query(queryString)
    .then(data => {
      return data.rows;
    });

}

module.exports = { getMarkers };
