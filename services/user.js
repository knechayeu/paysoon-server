const { pool } = require("../config");

async function createUser(id, first_name, last_name, username, avatar_url = null) {
  const user = await getUserById(id);

  if (!user) {
    const query = {
      text: `INSERT INTO users (id, first_name, last_name, username, avatar_url) VALUES ($1, $2, $3, $4, $5)`,
      values: [id, first_name, last_name, username, avatar_url]
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

  return user.rows?.[0] || null;
};

async function createRoom(id, title) {
  const query = {
    text: `INSERT INTO rooms (id, title) VALUES ($1, $2)`,
    values: [id, title],
  };
  await pool.query(query);
}
// Create an entry in the user_rooms table
async function createUserRoom(user_id, room_id) {
  const query = {
    text: `INSERT INTO user_rooms (user_id, room_id) VALUES ($1, $2)`,
    values: [user_id, room_id],
  };
  await pool.query(query);
}

module.exports = { createUser, getUserById, getUserByUsername, createRoom, createUserRoom };
