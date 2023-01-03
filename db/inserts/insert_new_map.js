const db = require('../connection');

/**
 * Add a new map to the database.
 * @param {{name: string, password: string, email: string}} map
 * @return {Promise<{}>} A promise to the user.
 */
 const addMap = function (map) {

  const insertNewMap = `
  INSERT INTO maps (creator_id, title, north, south, east, west, zoom, center_lat, center_lng)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
  RETURNING *;
  `;
  const values = [map.creator_id, map.title, map.north, map.south, map.east, map.west, map.zoom, map.center_lat, map.center_lng]

  return pool.query(insertNewMap, values)
    .then((map) => {
      return (map.rows[0]);
    })
    .catch((err) => {
      console.log(err.message);
    })
}
exports.addMap = addMap;
