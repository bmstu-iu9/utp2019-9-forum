var utils = require('./utils');
var db = require('../database/mainDatabase');
var sendMethod = require('./sendResponse');

exports.Logout = (req,res) => {
    utils.checkBody(req,res).then(result => {
        var cookie = utils.checkCookie(req);
        console.log('done read cookie');
        db.sessions.deleteSession(cookie['session_id']).then(result => {

          setTimeout(function () {
            sendMethod.sendResponse('./views/main.html', res, 'text/html', result, '/');
          }, 500);
        },
        error => {
            console.log(error);
            res.statusCode = 400;
            res.end("Error while deleting cookies");
        })
    },
    error => {
       console.log(error);
       res.statusCode = 400;
       res.end("Error while read body");
    });
}
