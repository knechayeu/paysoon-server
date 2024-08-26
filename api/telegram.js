const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();
const TOKEN = process.env.token || '';

if (TOKEN?.length) {
  const bot = new TelegramBot(TOKEN, { polling: true });

  bot.on('message', async (msg) => {
    console.log(await bot.getChat(188981082), 1)
    console.log(msg)
    const chatId = msg.chat.id;
    const text = msg.text;

    if (text === '/start') {
      // await bot.sendMessage(chatId, 'Ниже появится кнопка', {
      //     reply_markup: {
      //         keyboard: [
      //             [
      //                 {
      //                     text: 'Заполни форму'
      //                 }
      //             ]
      //         ]
      //     }
      // })

      await bot.sendMessage(chatId, 'Zahodi', {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: 'Заполни форму111',
                web_app: {
                  url: 'https://www.google.co.jp/'
                }
              }
            ]
          ]
        }
      })
      // bot.sendMessage(chatId, 'Recieved new message');
    }

  })

  bot.on('chat_member', async (chat_member) => {
    console.log(chat_member.chat());
  });

}
