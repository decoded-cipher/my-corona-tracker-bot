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
    if(msg.text == "/news") {
        var chatId = msg.chat.id;
        request(`http://newsapi.org/v2/top-headlines?q=corona&apiKey=4a0bb231b1db4357b1278797ebc07943&country=in`,function(error,response,body) {
    if(!error && response.statusCode == 200) {
        bot.sendMessage(chatId, `_Fetching today's headlines on Corona..._`, {parse_mode: 'Markdown'})
        .then(function(msg) {
        var res = JSON.parse(body);

        for (var result = 1; result <= res.totalResults; result++) {
          
            // var d = new Date(res.articles[result-1].publishedAt);
            // var presentTime = d.toLocaleTimeString();
            // var presentDate = d.toLocaleDateString();

            bot.sendMessage(chatId,
                'Source :  ' + res.articles[result-1].source.name + '\n' +
                'Author:  '  + res.articles[result-1].author + '\n' +
                'Published At :  ' + presentDate + ', ' + presentTime + '\n\n' +
                res.articles[result-1].title + '\n\n' +
                res.articles[result-1].description + '\n\n' +
                res.articles[result-1].content + '\n\n' +
                'Link :\n' + res.articles[result-1].url
              )
            }
          })
        }
      })
    }
});
