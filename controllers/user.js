const { pool } = require('../config');

exports.getAllUsers = async (req, res) => {
  const posts = await pool.query("SELECT * FROM user");
  res.send(posts.rows);
};

exports.createUser = async (req, res) => {
  const posts = await pool.query("INSERT INTO users (id, first_name, last_name, username) VALUES (?, ?, ?)");
  res.send(posts.rows);
};
