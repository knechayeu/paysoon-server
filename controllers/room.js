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
  const room = await createRoom(req.body);
  console.log(room, 1)

  if (room) {
    return res.send(room)
  }

  return res.sendStatus(307);
};
