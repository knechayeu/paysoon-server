const { pool } = require("../config");

async function createUser({ id, first_name, last_name, username }) {
  const user = await getUserById(id);

  if (!user.length) {
    const query = {
      text: `INSERT INTO users (id, first_name, last_name, username) VALUES ($1, $2, $3, $4)`,
      values: [id, first_name, last_name, username]
    };
    await pool.query(query);
  }
}

async function getUserById(id) {
  const query = {
    text: `SELECT * FROM users WHERE id=$1`,
    values: [id],
  };
  const user = await pool.query(query);

  return user.rows?.[0] || null;
};

async function getUserByUsername(username) {
  const query = {
    text: `SELECT * FROM users WHERE username=$1`,
    values: [username],
  };
  const user = await pool.query(query);

  return user.rows;
};

module.exports = { createUser, getUserById, getUserByUsername };
