var PORT = process.env.PORT || 3000;
process.env.NTBA_FIX_319 = 1;

var request = require('request');
const TelegramBot = require('node-telegram-bot-api');

// Bot config
const token = '1060187211:AAG4N-2oGbyLQRf-VPPJ2sOIXhOKRyyv25M';
const bot = new TelegramBot(token, {polling: true});

// Reply to /start
bot.onText(/\/start/, (msg, match) => {
    const start = match.input.split(' ')[1];
  
    // var start = match[1];
    // console.log(start);
    
    var chatId = msg.chat.id;
    if (start === undefined) {
      bot.sendMessage(
        chatId, 'Welcome, " ' + msg.chat.first_name + ' ' + msg.chat.last_name
        + ' " to " My Cipher Bot ",\nThe personalized Telegram Bot for self-learning and '
        + '\nself-experimenting adventures on anything and everything, \nfor own creator " Mr. Arjun Krishna ".\n🙂'
        );
      return;
    }
  });
  
  