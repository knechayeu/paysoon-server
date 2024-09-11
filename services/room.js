const { pool } = require('../config');

async function getAllRooms() {
  const query = {
    text: 'SELECT * FROM rooms',
  };

  return pool.query(query);
}

async function getRoom(id) {
  try {
    const query = {
      text: `SELECT rooms.id, rooms.title, users.first_name, rooms.owner_id FROM rooms INNER JOIN users on rooms.owner_id = users.id WHERE rooms.id=$1 `,
      values: [id],
    };

    const { rows } = await pool.query(query);

    if (!!rows[0]) {
      return {
        id: rows[0].id,
        title: rows[0].title,
        user: {
          id: rows[0].owner_id,
          firstName: rows[0].first_name,
        },
      };
    }

    return null;
  } catch (e) {
    return null;
  }
}

async function createRoom(data) {
  const { title, description, ownerId, photoUrl } = data;

  try {
    const query = {
      text: `INSERT INTO rooms (title, description, owner_id) VALUES ($1, $2, $3) RETURNING *`,
      values: [title, description, ownerId],
    };

    const { rows } = await pool.query(query);

    return rows[0];
  } catch (e) {
    return null;
  }
}

module.exports = {
  getAllRooms,
  getRoom,
  createRoom,
};
