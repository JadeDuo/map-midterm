const db = require('../connection');

const getMaps = () => {
  const queryString = `
  SELECT creator_id, maps.id, title, north, south, east, west, zoom, center_lat, center_lng
  FROM maps
  JOIN users ON users.id = maps.creator_id;
  `
  return db.query(queryString)
    .then(data => {
      return data.rows;
    });

}

module.exports = { getMaps };
