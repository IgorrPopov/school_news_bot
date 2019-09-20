const TelegramBot = require('node-telegram-bot-api');
const firebase = require('firebase');
const _ = require('lodash');
const request = require('request');
const jsdom = require("jsdom");
const schoolNews = require('./app_modules/schoolNews');
const domToNode = require('./app_modules/domToNode');
const config = require('./config/config')

const bot = new TelegramBot(config.telegram_bot_token, { polling: true });

const { JSDOM } = jsdom;

let language = 'en';
let chatId = '';

firebase.initializeApp(config.firebase_initializer);

const ref = firebase.database().ref();
const sitesRef = ref.child("school_news");



// communication with telegram bot
bot.onText(/\/start|\/switch_lan/, (msg) => {
    bot.sendMessage(msg.chat.id,'Please, choose the news language)', config.telegram_bot_reply_markup);
});

bot.on('callback_query', (callbackQuery) => {
    chatId = callbackQuery.message.chat.id;

    language = callbackQuery.data;

    bot.sendMessage(chatId,'Now you will read the news in ' + config.language[language]);

    newsUpdate();
});



// news update logic
async function newsUpdate() {

    const allNewsFromDB = (await sitesRef.once('value')).val();

    schoolNews(config.news_api_url, (err, allNewsFromAPI) => {

        allNewsFromAPI = _.reverse(allNewsFromAPI);


        let lastApiNewsId = lastDbNewsId = 0;

        allNewsFromAPI.forEach(one_news => lastApiNewsId = one_news.id > lastApiNewsId ? one_news.id : lastApiNewsId);
        
        for (let key in allNewsFromDB) {
            lastDbNewsId = allNewsFromDB[key].id > lastDbNewsId ? allNewsFromDB[key].id : lastDbNewsId;
        }

      

        if (lastApiNewsId > lastDbNewsId) {
            let newNews = [];

            allNewsFromAPI.forEach(one_news => {
                if (one_news.id > lastDbNewsId) {
                    sitesRef.push().set(one_news);
                    newNews.push(one_news);
                }
            });

            if (newNews.length > 0) {
                newNews.forEach(one_news => createTelegraphPage(one_news));
            }
        }
        
    });

    setTimeout(newsUpdate, 10000);
}


function createTelegraphPage(oneNews) {

  const rawHtmlString = `<img src="${config.main_path_to_img_files + oneNews.image}">${oneNews[language].text}`

  const dom = new JSDOM(rawHtmlString);

  const content = domToNode(dom.window.document.body).children;


  const formData = {
      access_token: config.telegraph_access_token,
      title: oneNews[language].title,
      content: JSON.stringify(content),
      return_content: 'true'
  };
  

  request.post({ url: config.telegraph_api_url_for_page_creation, json: true, formData }, (err, httpResponse, body) => {
    bot.sendMessage(chatId, body.result.url);;
  });

}