const TOKEN = process.env.TELEGRAM_TOKEN || '991436394:AAHxBLFxCl7aAkh91bhDNCJIKrVdRAhdmzI';
const TelegramBot = require('node-telegram-bot-api');
const options = {
    webHook: {
        port: process.env.PORT
    }
};

const url = process.env.APP_URL || 'https://my-corona-tracker-bot.herokuapp.com:443';
const bot = new TelegramBot(TOKEN, options);

bot.setWebHook(`${url}/bot${TOKEN}`);

bot.on('message', function onMessage(msg) {
    //   bot.sendMessage(msg.chat.id, 'I am alive on Heroku!');

    const request = require('request-promise')
    const getData = async function () {
        const json = await request({
            url: 'http://newsapi.org/v2/top-headlines?q=corona&apiKey=4a0bb231b1db4357b1278797ebc07943&country=in&pageSize=1',
            json: true
        })
        console.log(res)   
    }
    (async function () {
        try {
            await getData();
        } catch (e) {
            console.log('Error: ', e);
        }
        debugger;
    })()
})