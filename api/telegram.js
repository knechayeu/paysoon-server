require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const TOKEN = process.env.token || '';
const { createUser } = require('../services/user');

if (TOKEN?.length) {
  const bot = new TelegramBot(TOKEN, { polling: true });

  bot.on('message', async (msg) => {
    const { id, first_name, last_name, username } = msg.from;
    console.log(msg);
    console.log(await bot.getChat(188981082), 1)
    await createUser({ id, first_name, last_name, username })

    console.log('я покакал');
  });
}
