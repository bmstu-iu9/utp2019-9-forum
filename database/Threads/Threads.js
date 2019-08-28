var fs = require('fs');

var dbPath = __dirname + '/threads.json';

class Comment {
    constructor(author,content,date) {
        this.author = author;
        this.content = content;
        this.upVote = 0;
        this.date = date;
    }
}

class Thread {
    constructor(id,author,title,entry,tags,date) {
        this.id = id;
        this.author = author;
        this.title = title;
        this.entry = entry;
        this.tags = tags;
        this.comments = [];
        this.upVote = 0;
        this.date = date;
    }
}

var get_post = (db, id) => {
    for (var i = 0; i < db.Threads.length; i++) {
        if (db.Threads[i].id == id) return i;
    }
    return -1
}

exports.connect = () => {
    // Create new json file if don't exist
    try {
      console.log('Reading to ' + dbPath);
      var users = JSON.parse(fs.readFileSync(dbPath,'utf-8'));
      console.log('Successful reading threads.json');
    } catch (err) {
        if (err.message.indexOf("ENOENT") == 0) { // error no suck directory
            console.log('Creating database with threads');
            var threads = { "Threads": [] };
            fs.writeFileSync(dbPath, JSON.stringify(threads, '', 4), 'utf-8');
        } else console.log(err);
    }
}

exports.createThread = (author,title,entry,tags) => {
    return new Promise((resolve,reject) => {
        fs.readFile(dbPath,'utf-8',(err,db) => {
            if (err) {
                console.log('Error when request to Users database');
                reject(err);
            } else {
                db = JSON.parse(db);

                var thread = new Thread(Math.random().toString(36).slice(2),author,title,entry,tags,new Date().getTime());
                db.Threads.push(thread);

                db_to_json = JSON.stringify(db,'',4);
                fs.writeFile(dbPath, db_to_json, 'utf-8', (err) => {
                    if (err) {
                        console.log('Error while writing to db');
                        reject(err);
                    } else {
                        resolve(thread);
                    }
                })
            }
        });
    });
}

exports.getThreads = () => {
    return new Promise((resolve,reject) => {
        fs.readFile(dbPath,'utf-8',(err,db) => {
            if (err) {
              console.log('Error when request to Users database');
              reject(err);
            } else {
                db = JSON.parse(db);
                resolve(db);
            }
        });
    });
}

exports.addReplyToThread = (id,author,content) => {
    return new Promise((resolve,reject) => {
        fs.readFile(dbPath,'utf-8',(err,db) => {
            if (err) {
                console.log('Error when request to Users database');
                reject(err);
            }
            else {
                db = JSON.parse(db);
                var threadID = get_post(db,id);
                if (threadID == -1) {
                    reject('No such this thread');
                } else {
                    var newComment = new Comment(author,content,new Date().getTime());
                    db.Threads[threadID].comments.push(newComment);

                    db_to_json = JSON.stringify(db,'',4);
                    fs.writeFile(dbPath, db_to_json, 'utf-8', (err) => {
                        if (err) {
                            console.log('Error while writing thread.json');
                            reject(err);
                        } else {
                            resolve(true);
                        }
                    })
                }
            }
        });
    });
};

exports.vote = (id,type) => {
    return new Promise((resolve,reject) => {
        fs.readFile(dbPath,'utf-8',(err,db) => {
            if (err) {
                console.log('Error when request to Users database');
                reject(err);
            }
            else {
                db = JSON.parse(db);
                var threadID = get_post(db,id);
                if (threadID == -1) {
                    reject('No such this thread');
                } else {
                    db.Threads[threadID].upVote += type;

                    db_to_json = JSON.stringify(db,'',4);
                    fs.writeFile(dbPath, db_to_json, 'utf-8', (err) => {
                        if (err) {
                            console.log('Error while writing thread.json');
                            reject(err);
                        } else {
                            resolve(true);
                        }
                    })
                }
            }
        });
    });
};

exports.editReply = (id,editContent,indexReply) => {
    return new Promise((resolve,reject) => {
        fs.readFile(dbPath,'utf-8',(err,db) => {
            if (err) {
                console.log('Error when request to Users database');
                reject(err);
            }
            else {
                db = JSON.parse(db);
                var threadID = get_post(db,id);
                if (threadID == -1) {
                    reject('No such this thread');
                } else {
                    if (editContent!="") db.Threads[threadID].comments[indexReply].content = editContent;
                    db.Threads[threadID].comments[indexReply].date = new Date().getTime();

                    db_to_json = JSON.stringify(db,'',4);
                    fs.writeFile(dbPath, db_to_json, 'utf-8', (err) => {
                        if (err) {
                            console.log('Error while writing thread.json');
                            reject(err);
                        } else {
                            resolve(true);
                        }
                    })
                }
            }
        });
    });
};
