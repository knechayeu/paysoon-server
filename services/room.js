const { pool } = require('../config');

async function getAllRooms() {
  const query = {
    text: 'SELECT * FROM rooms',
  };

  return pool.query(query);
}

async function getRoom(id) {
  const query = {
    text: `SELECT rooms.id, rooms.title, users.first_name, rooms.created_user_id FROM rooms INNER JOIN users on rooms.created_user_id = users.id WHERE rooms.id=$1 `,
    values: [id],
  };

  const { rows } = await pool.query(query);

  if (!!rows[0]) {
    return {
      id: rows[0].id,
      title: rows[0].title,
      user: {
        id: rows[0].created_user_id,
        firstName: rows[0].first_name,
      }
    }
  }

  return null;
}

module.exports = {
  getAllRooms,
  getRoom,
};
