const TelegramBot = require('node-telegram-bot-api');
const getForcastForInterval = require('./services/weatherAPI');
const { getPrivatCurrency } = require('./services/privatBankAPI');
const getMonoCurrency = require('./services/monoBankAPI');
const TOKEN = "6930013881:AAGsQ2tlptMz3k7TKvWusM2r9LDBIdVstqI"

const bot = new TelegramBot(TOKEN, {polling: true});

bot.onText(/\/start/, (msg) => {

    bot.sendMessage(msg.chat.id, "Welcome", {
        "reply_markup": {
            "keyboard": [["Forcast in Brobary"], ["Exchange rate"]]
            }
        });
    
    });

bot.on('message', (msg) => {
    const forcast = 'Forcast in Brobary'
    const exchange = 'Exchange rate'
    const previous = 'Previous menu'
    if (msg.text === forcast) {
        bot.sendMessage(msg.chat.id, "Choose interval", {
            "reply_markup": {
                "keyboard": [["at intervals of 3 hours", "at intervals of 6 hours"], ["Previous menu"]]
            }    
            });
    }

    if (msg.text === exchange) {
        bot.sendMessage(msg.chat.id, "Choose currency", {
            "reply_markup": {
                "keyboard": [["EUR", "USD"], ["Previous menu"]]
                }
            });
    }

    if (msg.text === previous) {
        bot.sendMessage(msg.chat.id, "Back to previous menu", {
            "reply_markup": {
                "keyboard": [["Forcast in Brobary"], ["Exchange rate"]]
                }
            });
    }
})

bot.on('message', async (msg) => {
    const threeHInterval = 'at intervals of 3 hours'
    const sixHInterval = 'at intervals of 6 hours'
    const EUR = 'EUR'
    const USD = 'USD'
    switch (msg.text) {
        case threeHInterval:
            const forcast3 = await getForcastForInterval(3)
            bot.sendMessage(msg.chat.id, `${forcast3}`)
            break;
        case sixHInterval:
            const forcast6 = await getForcastForInterval(6)
            bot.sendMessage(msg.chat.id, `${forcast6}`)
            break;
        case EUR:
            const dataEUR = await getPrivatCurrency(EUR)
            const rateEUR = await getMonoCurrency(EUR)
            const response = `   EUR\nPrivatBank\nBuy: ${dataEUR.buy}\nSale: ${dataEUR.sale}\n\nMonoBank\nBuy: ${rateEUR.buy}\nSale: ${rateEUR.sale}`
            bot.sendMessage(msg.chat.id, response)
            break;
        case USD:
            const dataUSD = await getPrivatCurrency(USD)
            const rateUSD = await getMonoCurrency(USD)
            const res = `   USD\nPrivatBank\nBuy: ${dataUSD.buy}\nSale: ${dataUSD.sale}\n\nMonoBank\nBuy: ${rateUSD.buy}\nSale: ${rateUSD.sale}`
            bot.sendMessage(msg.chat.id, res)
            break;
        default:
            break;
    }
})
