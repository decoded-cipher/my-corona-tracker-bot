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
    bot.sendMessage(msg.chat.id, 'I am alive on Heroku!');

})

bot.onText(/\/news/, (msg, match) => {
    const news = match.input.split(' ')[1];
    var chatId = msg.chat.id;
    if (news === undefined) {
        var url = `http://newsapi.org/v2/top-headlines?q=corona&apiKey=4a0bb231b1db4357b1278797ebc07943&country=in&pageSize=1`
        console.log('hai...')
        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                bot.sendMessage(chatId, `_Fetching today's headlines on Corona..._`, {
                        parse_mode: 'Markdown'
                    })
                    .then(function (msg) {
                        var res = JSON.parse(body);
                        console.log(res)
                    })
            }
        })

    }
})