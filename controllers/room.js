const { getAllRooms, getRoom } = require('../services/room');

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
