const db = require('../connection');

const addMap = () => {
  const queryString = `
  INSERT INTO maps (creator_id, title, north, south, east, west, zoom, center_lat, center_lng)
  VALUES ('something');
  `
  return db.query(queryString)
    .then(data => {
      return data.rows;
    });

}

module.exports = { addMap };

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} map
 * @return {Promise<{}>} A promise to the user.
 */
 const newMap = function (map) {

  const insertNewMap = `INSERT INTO maps (creator_id, title, north, south, east, west, zoom, center_lat, center_lng)
  VALUES ('something')RETURNING *;`;
  const values = [map.creator_id, map.title, map.north, map.south, map.east, map.west, map.zoom, map.center_lat, map.center_lng]

  return pool.query(insertNewMap, values)
    .then((map) => {
      return (map.rows[0]);
    })
    .catch((err) => {
      console.log(err.message);
    })
}
exports.addUser = addUser;
