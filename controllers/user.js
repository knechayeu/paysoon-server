const pool = require('../db');

exports.getAllUsers = async (req, res) => {
  const posts = await pool.query("SELECT * FROM users;");
  res.send(posts.rows);
};
