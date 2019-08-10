var utils = require('./utils');
var db = require('../database/mainDatabase');
var sendMethod = require('./sendResponse');

exports.Login = (req,res) => {
    utils.checkBody(req,res).then(result => {
      console.log('done check Login Signal'+ result.username + ' ' + result.password);
      db.users.getUser(result.username,result.password).then(result => {
          console.log('done find user');
          db.sessions.createSession(result.username).then(cookie => {
              console.log('done add new session to database');
              console.log(cookie);
              setTimeout(function () {
                sendMethod.sendResponse('./views/main.html', res, 'text/html', cookie, '/');
              }, 500);
          })
          .catch(err => {
              console.log(err);
              res.statusCode = 400;
              res.end('Something go wrong');
          })
        });
    },
    err => {
      console.log(err);
      res.statusCode = 400;
      res.end('Something go wrong');
    });
}
