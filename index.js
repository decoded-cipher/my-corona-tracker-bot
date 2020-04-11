const express = require('express');
const bodyParser = require('body-parser');
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('YOUR-API-KEY-HERE');
const server = express();

server.use(bodyParser.urlencoded({
    extended: true
}));
server.use(bodyParser.json());





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
    bot.sendMessage(msg.chat.id, 'Hey, I am alive on Heroku!... But still under Construction:');

})




bot.onText(/\/news/, (msg, match) => {
    const query = msg.query.query;
    newsapi.v2.topHeadlines({
        q: query || 'corona',
        sources: 'abc-news, al-jazeera-english, bbc-news, bbc-sport, bloomberg, business-insider, business-insider-uk, buzzfeed, cbs-news, cnbc, cnn, crypto-coins-news, daily-mail, el-mundo, engadget, entertainment-weekly, espn, espn-cric-info, financial-times, fortune, fox-news, fox-sports, hacker-news, independent, info-money, liberation, mashable, mirror, mtv-news, mtv-news-uk, national-geographic, nbc-news, news24, newsweek, new-york-magazine, reuters, techcrunch, techradar, the-economist, the-globe-and-mail, the-guardian-au, the-guardian-uk, the-hindu, the-huffington-post, the-lad-bible, the-new-york-times, the-next-web, the-telegraph, the-times-of-india, the-verge, the-wall-street-journal, the-washington-post, time, usa-today, wired',
    }).then(response => {
        let responseToSend;
        if (response.status === 'ok' && response.articles.length > 0) {
            const articles = response.articles.map(article => {
                return {
                    "title": article.title,
                    "image_url": article.urlToImage,
                    "subtitle": article.description,
                    "buttons": [{
                        "type": "web_url",
                        "url": article.url,
                        "title": "Read Full Article"
                    }]
                }
            });
            bot.sendMessage(msg.chat.id, article.title)

        }
    })
})