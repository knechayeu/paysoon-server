const { getAllRooms, getRoom, createRoom } = require('../services/room');

exports.getAllRooms = async (req, res) => {
  const posts = await getAllRooms();

  res.send(posts.rows);
};

exports.getRoom = async (req, res) => {
  const room = await getRoom(req.params.id);

  if (room) {
    return res.send(room)
  }

  return res.sendStatus(307);
};

exports.createRoom = async (req, res) => {
  const { id, title, owner_id } = req.body; 

  try {
    const newRoom = await createRoom({ id, title, owner_id });
    return res.status(201).send(newRoom);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: 'Failed to create room' });
  }
};
