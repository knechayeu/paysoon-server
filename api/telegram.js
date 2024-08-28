require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const TOKEN = process.env.token || '';
const { getUserByUsername } = require('../services/user');

if (TOKEN?.length) {
  const bot = new TelegramBot(TOKEN, { polling: true });

  bot.on('message', async (msg) => {
    const formatUsername = (str) => str.startsWith('@') ? str.slice(1) : str;
    const username = formatUsername(msg.text);
    const user = await getUserByUsername(msg.text);
    const userPresence = user[0]?.username || null;
    const message = `Пользователь @${username} ${userPresence ? 'найден' : 'не найден'}`;

    await bot.sendMessage(msg.chat.id, message);


    // const { id, first_name, last_name, username } = msg.from;
    // console.log(msg);
    // console.log(await bot.getChat(188981082), 1)
    // await createUser({ id, first_name, last_name, username })

    // console.log('я покакал');
  });
}
