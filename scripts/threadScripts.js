
var login;

if (document.cookie == '/' || document.cookie == "") {
    document.getElementById('displayUsername').innerHTML = "You are not login!";
    document.getElementById('switchNavTab').innerHTML= '<li><a href="/login">Login</a></li><li><a href="/signup">Sign Up</a></li>';
  }
else {
    var txt = document.cookie.split(';');
    var name="";

    for (var i=0;i<txt.length;i++) {
      //console.log("username is = " + txt[1].indexOf("username"));
        if (txt[i].indexOf("username") !=-1) name = txt[i];
    }
    login = name.split('=')[1];
    if (login!=undefined) {
      document.getElementById('displayUsername').innerHTML = 'Welcome ' + login;
      document.getElementById('switchNavTab').innerHTML= '<li><a href="/add-post">Create new post</a></li><li><a href="/user/'+login+'">My info</a></li><li><a href="/logout">Log out</a></li>';
    } else {
      document.getElementById('displayUsername').innerHTML = "You are not login!";
      document.getElementById('switchNavTab').innerHTML= '<li><a href="/login">Login</a></li><li><a href="/signup">Sign Up</a></li>';
    }
}

var numberOfThread=0;

var xmlHttp = new XMLHttpRequest();

xmlHttp.onreadystatechange = function() {
    if (this.readyState==4 && this.status==200) {
        var myDB = JSON.parse(this.responseText);
        var thread_id = window.location.pathname.split('/')[2];
        console.log(thread_id);
        var index;
        for (var i=0;i<Object.keys(myDB.Threads).length;i++)
            if (myDB.Threads[i].id == thread_id) index = i;
        for (var i=0;i<Object.keys(myDB.Threads).length;i++)
            if (myDB.Threads[i].author == myDB.Threads[index].author) numberOfThread++;
        var date = document.createElement('tr');
        var timeThread = new Date(myDB.Threads[index].date);
        date.setAttribute('style',"background-color : #0B5FEA; color : white");
        date.innerHTML = timeThread;
        document.getElementById("displayThread").appendChild(date);

        var author = document.createElement('tr');
        var inner = document.createElement('th');
        inner.innerHTML = myDB.Threads[index].author + " - " +numberOfThread + " posts";
        inner.setAttribute('style',"background-color : #E5EEFD; color : #0B5FEA");
        inner.setAttribute('height','60');
        author.appendChild(inner);
        document.getElementById("displayThread").appendChild(author);

        var title = document.createElement('tr');
        var inner = document.createElement('td');
        inner.innerHTML ='<b>' + myDB.Threads[index].title + '</b>';
        title.appendChild(inner);
        document.getElementById("displayThread").appendChild(title);

        var entry = document.createElement('tr');
        var inner = document.createElement('textarea');
        inner.innerHTML =myDB.Threads[index].entry;
        inner.setAttribute('cols',"145");
        inner.setAttribute('rows',"10");
        inner.setAttribute('readonly','readonly');
        entry.appendChild(inner);
        document.getElementById("displayThread").appendChild(entry);

        var tabFeature = document.createElement('table');
        var feature = document.createElement('tr');
        var like = document.createElement('td');
        like.setAttribute('width','2%');
        var like_link = "/like-post/"+thread_id;
        like.innerHTML = '<form method = "post" action = "' + like_link + '">'
                            + '<button class="btn" type ="submit"><i class="fa fa-thumbs-up"></i></button>'
                            +'</form>';
        feature.appendChild(like);
        var dislike = document.createElement('td');
        dislike.setAttribute('width','5%');
        var dislike_link = "/dislike-post/"+thread_id;
        dislike.innerHTML = '<form method = "post" action = "' + dislike_link + '">'
                            + '<button class="btn" type ="submit"><i class="fa fa-thumbs-down"></i></button>'
                            +'</form>';
        feature.appendChild(dislike);
        var upVote = document.createElement('th');
        upVote.setAttribute('width','10%');
        upVote.innerHTML = myDB.Threads[index].upVote + ' upvotes';
        feature.appendChild(upVote);
        var comments = document.createElement('th');
        comments.setAttribute('width','85%');
        comments.setAttribute('style','text-align: right');
        comments.innerHTML = '<i class="fa fa-comments"></i>'+' '+Object.keys(myDB.Threads[index].comments).length+ " comments";
        feature.appendChild(comments);
        tabFeature.appendChild(feature);
        document.getElementById("displayThread").appendChild(tabFeature);

        if (login!=undefined) {
            var nowUser = document.createElement('p');
            nowUser.innerHTML = "<br> Comment as " + login;
            document.getElementById("displayThread").appendChild(nowUser);

            var block = document.createElement('div');
            var commentArea = document.createElement('form');
            commentArea.setAttribute('method','post');
            var area = document.createElement('textarea');
            area.setAttribute('cols',"145");
            area.setAttribute('rows',"5");
            area.setAttribute('name','replyContent');
            area.setAttribute('placeholder','What are your thoughts ?')
            commentArea.appendChild(area);
            var author = document.createElement('input');
            author.setAttribute('type','hidden');
            author.setAttribute('name','author');
            author.setAttribute('value',login);
            commentArea.appendChild(author);
            var postButton = document.createElement('button');
            postButton.setAttribute('type','submit');
            postButton.setAttribute('class','btn btn-primary');
            postButton.setAttribute('style','float: right');
            postButton.innerHTML = "COMMENT";
            commentArea.appendChild(postButton);
            block.appendChild(commentArea);
            document.getElementById("displayThread").appendChild(block);
        }
        for (var i=0;i<Object.keys(myDB.Threads[index].comments).length;i++) {
            numberOfThread=0;
            for (var j=0;j<Object.keys(myDB.Threads).length;j++)
              if (myDB.Threads[j].author == myDB.Threads[index].comments[i].author) numberOfThread++;
            var repliesTable = document.createElement('table');
            repliesTable.setAttribute('width','100%');
            repliesTable.innerHTML = '<tr"><td align = "right" style="vertical-align:top"><button class="btn"><i class="fa fa-arrow-up"></i></button></td>'
                                +'<th width = "95%">'+myDB.Threads[index].comments[i].author + " - " +numberOfThread + " posts" + '</th></tr>'
                                +'<tr height = "80"><td align = "right" style="vertical-align:top"><button class="btn"><i class="fa fa-arrow-down"></i></button></td> '
                                +'<th width = "95%" style = "background-color : #E5EEFD; vertical-align:top">'+myDB.Threads[index].comments[i].content + '</th></tr>';
            document.getElementById("displayThread").appendChild(repliesTable);
        }

        document.getElementById("displayThread").appendChild(document.createElement('br'));
        document.getElementById("displayThread").appendChild(document.createElement('br'));
    }
};

xmlHttp.open("GET", "/threads");
xmlHttp.send();
