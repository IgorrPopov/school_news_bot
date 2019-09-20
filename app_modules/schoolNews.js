const request = require('request');
const schoolNewsAdapter = require('./schoolNewsAdapter');

const schoolNews = (url, callback) => {

    request.post({ url: url, json: true }, (err, res) => {
        
        if (err) {
            callback('Unable to connect ot API!', undefined);
        } else if (Object.getOwnPropertyNames(res).length === 0) {
            callback('Empty API response!', undefined);
        } else if (res.body.status !== 200) {
            callback('API server error occured!', undefined);
        } else {
            callback(undefined, schoolNewsAdapter(res.body.data.news));
        }

    });

}

module.exports = schoolNews;