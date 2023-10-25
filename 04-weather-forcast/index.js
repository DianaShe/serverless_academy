const TelegramBot = require('node-telegram-bot-api');
const getForcastForInterval = require('./services/weatherAPI');
const TOKEN = "6930013881:AAGsQ2tlptMz3k7TKvWusM2r9LDBIdVstqI";
const bot = new TelegramBot(TOKEN, {polling: true});

bot.onText(/\/start/, (msg) => {

    bot.sendMessage(msg.chat.id, "Welcome", {
        "reply_markup": {
            "keyboard": [["Forcast in Brobary"]]
            }
        });
    
    });

bot.on('message', (msg) => {
    const forcast = 'Forcast in Brobary'
    if (msg.text === forcast) {
        bot.sendMessage(msg.chat.id, "Choose interval", {
            "reply_markup": {
                "keyboard": [["at intervals of 3 hours", "at intervals of 6 hours"]]
                }
            });
    }
})

bot.on('message', async (msg) => {
    const threeHInterval = 'at intervals of 3 hours'
    const sixHInterval = 'at intervals of 6 hours'
    if (msg.text === threeHInterval) {
        const forcast = await getForcastForInterval(0)
        bot.sendMessage(msg.chat.id, forcast)
    } else if (msg.text === sixHInterval) {
        const forcast = await getForcastForInterval(1)
        bot.sendMessage(msg.chat.id, forcast)
    }
})