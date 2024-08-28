const { pool } = require('../config');

exports.getAllUsers = async (req, res) => {
  const posts = await pool.query("SELECT * FROM user");
  res.send(posts.rows);
};

exports.getUser = async (req, res) => {
  const query = {
    text: `SELECT * FROM public.user WHERE id=$1`,
    values: [req.query.id]
  };
  const posts = await pool.query(query);

  res.send(posts.rows?.[0] || null);
};

exports.createUser = async (req, res) => {
  const posts = await pool.query("INSERT INTO users (id, first_name, last_name, username) VALUES (?, ?, ?)");
  res.send(posts.rows);
};
