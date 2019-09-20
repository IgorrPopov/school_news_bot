const config = {

    news_api_url: 'https://back.programming.kr.ua/api/news',

    telegraph_api_url_for_page_creation: 'https://api.telegra.ph/createPage',

    telegram_bot_token: '937256919:AAHEWa6pNwVWALZZZvuMonz459hvRXrNML4',

    telegraph_access_token: '98047c37f80c37a5a58aeb6ba9e2a26fd6a5b484e32d69efef8623047dcd',

    firebase_initializer: {
        apiKey: "AIzaSyDurJAzu_XzcwN59Kx5FNUEw0CmuCPn61c",
        authDomain: "shpp-news-bot.firebaseapp.com",
        databaseURL: "https://shpp-news-bot.firebaseio.com",
        projectId: "shpp-news-bot",
        storageBucket: "shpp-news-bot.appspot.com",
        messagingSenderId: "483567593683",
        appId: "1:483567593683:web:264d3a2dd32aad4d768c26"
    },

    telegram_bot_reply_markup: {
        reply_markup: {
          inline_keyboard: [[
            {
              text: 'UA',
              callback_data: 'ua'
            },{
              text: 'RU',
              callback_data: 'ru'
            },{
              text: 'EN',
              callback_data: 'en'
            }
          ]]
        }
    },

    language: {
        ua: 'Ukraine',
        ru: 'Russian',
        en: 'English'
    },

    main_path_to_img_files: 'https://back.programming.kr.ua/storage/img/news/'
}

module.exports = config;