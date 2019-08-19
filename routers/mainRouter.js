var path = require('path');
var fs = require('fs');

class Router {

    routing(req,res) {
      var fileUrl;
      if (req.url=='/') fileUrl = './views/main.html';
      else if (req.url[0]!='.') fileUrl = '.'+req.url;
      else fileUrl = req.url;
      if (req.method == 'GET') {
        var sendMethod = require('./sendResponse');

        var filePath = path.resolve(fileUrl);

        var fileExt = path.extname(filePath);
        if (fileExt == '.js') sendMethod.sendResponse(filePath,res,'text/javascript',null,null);
        else if (fileExt == '.css') sendMethod.sendResponse(filePath,res,'text/css',null,null);
        else if (fileExt == '.html') sendMethod.sendResponse(filePath,res,'text/html',null,null);
        else {
            var tmp = req.url.split('/')[1];
            if (req.url == '/logout') {
                var out = require('./logout');
                out.Logout(req,res);
            }
            else if (req.url == '/threads') {
                var post = require('./thread');
                post.getThreads(req,res);
            }
            else if (req.url == '/users') {
                var user = require('./user');
                user.getAllUsers(req,res);
            }
            else if (req.url == '/login') {
              fileUrl = './views/login.html';
              filePath = path.resolve(fileUrl);
              sendMethod.sendResponse(filePath,res,'text/html',null,null);
            }
            else if (req.url == '/signup') {
              fileUrl = './views/signup.html';
              filePath = path.resolve(fileUrl);
              sendMethod.sendResponse(filePath,res,'text/html',null,null);
            }
            else if (tmp == 'thread') {
                fileUrl = './views/thread.html';
                filePath = path.resolve(fileUrl);
                sendMethod.sendResponse(filePath,res,'text/html',null,null);
            }
            else if (tmp == 'filter') {
                fileUrl = './views/filter.html';
                filePath = path.resolve(fileUrl);
                sendMethod.sendResponse(filePath,res,'text/html',null,null);
            }
            else if (req.url == "/add-post") {
                fileUrl = './views/newpost.html';
                filePath = path.resolve(fileUrl);
                sendMethod.sendResponse(filePath,res,'text/html',null,null);
            }
            else if (tmp == "user") {
                fileUrl = './views/info.html';
                filePath = path.resolve(fileUrl);
                sendMethod.sendResponse(filePath,res,'text/html',null,null);
            }
        }
      }
      else if (req.method == 'POST') {
          var tmp = req.url.split('/')[1];
          console.log(tmp);
          if (req.url == '/signup') {
              var reg = require('./signup');
              reg.Signup(req,res);
          }
          else if (req.url == '/login') {
              var auth = require('./login');
              auth.Login(req,res);
          }
          else if (req.url == "/add-post") {
              var post = require('./thread');
              post.createThread(req,res);
          }
          else if (req.url == "/filter") {
              var post = require('./thread');
              post.filter(req,res);
          }
          else if (tmp == 'thread') {
              var post = require('./thread');
              post.addComment(req,res);
          }
          else if (tmp == 'like-post') {
              var post = require('./thread');
              post.like(req,res);
          }
          else if (tmp == 'dislike-post') {
              var post = require('./thread');
              post.dislike(req,res);
          }
          else if (tmp == 'editComment') {
              var post = require('./thread');
              post.editComment(req,res);
          }
      }
      else {
        res.writeHead(404, {'Content-Type' : 'text/html'});
        res.end('<h1> Error 404: ' + req.method + ' not supported</h1>');
      }
    }

}

module.exports = Router;
