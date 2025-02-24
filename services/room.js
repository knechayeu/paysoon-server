const { pool } = require('../config');

async function createRoom(data) {
  const { id, title, owner_id } = data;

  const query = {
    text: `INSERT INTO rooms (id, title, owner_id) VALUES ($1, $2, $3) RETURNING *`,
    values: [id, title, owner_id],
  };

  const result = await pool.query(query);
  return result.rows?.[0] || null;
}

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

async function addUserToRoom(data) {
  const { roomId, userId } = data;

  console.log(data, 111)

  if (userId.length === 0 || roomId.length === 0) {
    return null;
  }

  const checkQuery = {
    text: `SELECT * FROM user_rooms WHERE room_id = $1 AND user_id = $2`,
    values: [roomId, userId],
  };

  const existingRecord = await pool.query(checkQuery);
  if (existingRecord.rows.length > 0) {
    return null;
  }

  const insertQuery = {
    text: `INSERT INTO user_rooms (room_id, user_id) VALUES ($1, $2)`,  
    values: [roomId, userId],
  };

  return pool.query(insertQuery);
}

module.exports = {
  getAllRooms,
  getRoom,
  createRoom,
  addUserToRoom,
};
