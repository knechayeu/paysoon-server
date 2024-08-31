require('dotenv').config();

// const express = require('express');  

const TelegramBot = require('node-telegram-bot-api');
const TOKEN = process.env.token || '';
const { getUserByUsername, createUser, createRoom, createUserRoom } = require('../services/user');

if (TOKEN?.length) {
  const bot = new TelegramBot(TOKEN, { polling: true });

  bot.on('message', async (msg) => {
    const { customAlphabet } = await import('nanoid');
    const nanoid = customAlphabet('1234567890', 8);
    const room_id = nanoid();

    const { id, first_name, last_name, username } = msg.from;
    await createUser(id, first_name, last_name, username);
    await createRoom(room_id, msg.text);
    await createUserRoom(id, room_id);




    // const formatUsername = (str) => str.startsWith('@') ? str.slice(1) : str;
    // const username = formatUsername(msg.text);
    // const user = await getUserByUsername(msg.text);
    // const userPresence = user?.username;
    // const message = `Пользователь @${username} ${userPresence ? 'найден' : 'не найден'}`;

    // await bot.sendMessage(msg.chat.id, message);

  });

  module.exports = { bot };
}
