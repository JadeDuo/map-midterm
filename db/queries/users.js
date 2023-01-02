const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

module.exports = { getUsers };
//SELECT markers.lat AS lat, markers.lng AS lng, locationName, info, imgLink, imgSrc
// FROM markers
// JOIN markersInfo ON markersInfo.id = markerInfo_id
// JOIN icons ON icons.id = icon_id;