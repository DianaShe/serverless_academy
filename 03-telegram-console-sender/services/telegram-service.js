const TelegramBot = require("node-telegram-bot-api");

const bot = new TelegramBot(TOKEN, { polling: true });

const sendMessage = async (text) => {
  await bot.sendMessage(chatID, text);
  return;
};

const sendPhoto = async (url) => {
  await bot.sendPhoto(chatID, url);
};

module.exports = { sendMessage, sendPhoto };
