/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const db = require('../db/connection');

router.post('/', (req, res) => {
  const queryString = `
  SELECT * FROM users
  WHERE email = '${req.body.email}';
  `;

  return db.query(queryString)
    .then(data => {
      const email = data.rows[0].email
      console.log('back end:', data.rows[0].email)
      req.session.userID = data.rows[0].id
      res.json({email})
    })
  
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;