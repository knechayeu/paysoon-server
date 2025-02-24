const { getAllRooms, getRoom, createRoom, addUserToRoom } = require('../services/room');

exports.getAllRooms = async (req, res) => {
  const posts = await getAllRooms();

  res.send(posts.rows);
};

exports.getRoom = async (req, res) => {
  const room = await getRoom(req.params.id);
  await addUserToRoom({ roomId: room.id, userId: req.body.userId });

  if (room) {
    return res.send(room)
  }

  return res.sendStatus(307);
};

exports.createRoom = async (req, res) => {
  try {
    const room = await createRoom(req.body);
    await addUserToRoom({ roomId: room.id, userId: req.body.userId });

    return res.send(room)
  } catch (error) {
    console.log(error);

    return res.sendStatus(307);
  }
};
