const { bot } = require('../api/telegram');
const { pool } = require('../config');
const { getUserById, createUser } = require('../services/user');

exports.getAllUsers = async (req, res) => {
  const posts = await pool.query("SELECT * FROM users");
  res.send(posts.rows);
};

exports.getUser = async (req, res) => {
  const user = await getUserById(req.query.id);

  res.sendStatus()

  res.send(user);
};

exports.createUser = async (req, res) => {
  // await bot.sendMessage(req?.body?.id, 'Тебя пригласил этот писюн');
  // await bot.sendSticker(req?.body?.id, 'https://media.tenor.com/CuV5KsB9-fMAAAAM/dancing-penis.gif');
  const user = await createUser(req.body);
  res.send(user);
};
