
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
    var login = name.split('=')[1];
    if (login!=undefined) {
      document.getElementById('displayUsername').innerHTML = 'Welcome ' + login;
      document.getElementById('switchNavTab').innerHTML= '<li><a href="/add-post">Create new post</a></li><li><a href="/user/'+login+'">My info</a></li><li><a href="/logout">Log out</a></li>';
    } else {
      document.getElementById('displayUsername').innerHTML = "You are not login!";
      document.getElementById('switchNavTab').innerHTML= '<li><a href="/login">Login</a></li><li><a href="/signup">Sign Up</a></li>';
    }
}

var xmlHttp = new XMLHttpRequest();

xmlHttp.onreadystatechange = function() {
    if (this.readyState==4 && this.status==200) {
        var myDB = JSON.parse(this.responseText);
        var thread;

        var title = document.createElement('tr');
        title.setAttribute("style","background-color: #2D90EC; color: white");
        title.setAttribute("width","100%");
        title.innerHTML = '<th width = "10%">Tag</th>'
                         +'<th width = "60%">Thread title</th>'
                         +'<th class="text-center" width = "10%">Upvote </th>'
                         +'<th class="text-center" width = "10%">Comments </th>'
                         +'<th witdh = "10%">Author </th>';
        document.getElementById("displayThread").appendChild(title);

        for (var i=0;i<Object.keys(myDB.Threads).length;i++) {
            thread = document.createElement('tr');
            var tags = document.createElement('th');
            tags.setAttribute('width',"10%");
            var inner = document.createElement('a');
            var tag = myDB.Threads[i].tags.substr(1);
            inner.setAttribute('href','/filter/tag='+tag);
            inner.innerHTML = myDB.Threads[i].tags;
            tags.appendChild(inner);
            tags.setAttribute('style',"background-color : white");
            thread.appendChild(tags);

            var title = document.createElement('th');
            title.setAttribute('width',"60%");
            title.setAttribute('style',"background-color : #E5EEFD");

            var mainTitle = document.createElement('a');
            mainTitle.setAttribute('href','/thread/'+myDB.Threads[i].id);
            mainTitle.innerHTML = myDB.Threads[i].title;
            title.appendChild(mainTitle);
            thread.appendChild(title);

            var vote = document.createElement('th');
            vote.setAttribute('class',"text-center");
            vote.setAttribute('width',"10%");
            vote.innerHTML = myDB.Threads[i].upVote;
            vote.setAttribute('style',"background-color : white");
            thread.appendChild(vote);

            var cmt = document.createElement('th');
            cmt.setAttribute('width',"10%");
            cmt.setAttribute('style',"background-color : #E5EEFD");
            cmt.setAttribute('class',"text-center");
            cmt.innerHTML = Object.keys(myDB.Threads[i].comments).length;
            thread.appendChild(cmt);

            var author = document.createElement('th');
            author.setAttribute('width',"10%");
            var inner = document.createElement('a');
            inner.setAttribute('href','/user/'+myDB.Threads[i].author);
            inner.innerHTML = myDB.Threads[i].author;
            author.appendChild(inner);
            author.setAttribute('style',"background-color : white");
            thread.appendChild(author);


            thread.setAttribute('height','30');
            document.getElementById("displayThread").appendChild(thread);
        }

        //==============================================================//
        var title = document.createElement('tr');
        title.setAttribute("class","text-center");
        title.setAttribute("height","50");
        title.setAttribute("style","background-color: #2D90EC; color: white");
        title.innerHTML = "<td><strong>TRENDING TAGS</strong></td>";
        document.getElementById("displayTrending").appendChild(title);

        var allTags = [];
        var quantity = [];

        for (var i=0;i<Object.keys(myDB.Threads).length;i++) {
            var tag = myDB.Threads[i].tags;
            if (allTags.indexOf(tag)!=-1) quantity[allTags.indexOf(tag)]++;
            else {
                allTags.push(tag);
                quantity.push(1);
            }
        }

        for (var i=0;i<allTags.length;i++)
          for (var j=i+1;j<allTags.length;j++)
            if (quantity[i] < quantity[j]) {
                var tmp = quantity[i];
                quantity[i] = quantity[j];
                quantity[j] = tmp;
                var lol = allTags[i];
                allTags[i] = allTags[j];
                allTags[j] = lol;
            }
        for (var i=0;i<allTags.length;i++) {
            var content = document.createElement('tr');
            content.innerHTML = "<td>" + allTags[i] + " " + quantity[i] + "</td>";
            document.getElementById("displayTrending").appendChild(content);
        }
    }
};

xmlHttp.open("GET", "/threads");
xmlHttp.send();
