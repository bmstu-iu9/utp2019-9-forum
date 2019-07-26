
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

var filterType = window.location.pathname.split('/')[2];
var filterTag = '#'+filterType.split('=')[1];
console.log(filterTag);

var xmlHttp = new XMLHttpRequest();

xmlHttp.onreadystatechange = function() {
    if (this.readyState==4 && this.status==200) {
        var myDB = JSON.parse(this.responseText);
        var numberOfThread=0;
        for (var i=0;i<Object.keys(myDB.Threads).length;i++) numberOfThread+=(myDB.Threads[i].tags==filterTag);
        console.log(numberOfThread);
        if (numberOfThread==0) {
            var findRes = document.createElement('tr');
            var inner = document.createElement('th');
            inner.innerHTML = '<font size="3"><i>'+"Sorry, there were no community results for " + filterTag + " tag"+'</i></font>';
            findRes.appendChild(inner);
            document.getElementById("displayThread").appendChild(findRes);
        } else {
            var findRes = document.createElement('tr');
            var inner = document.createElement('th');
            inner.setAttribute('width','100%');
            inner.innerHTML = '<font size="3"><i>'+numberOfThread + " results found with " + filterTag + " tag"+'</i></font>';
            findRes.appendChild(inner);
            document.getElementById("displayThread").appendChild(findRes);

            var tab = document.createElement('table');
            var title = document.createElement('tr');
            title.setAttribute("style","background-color: #2D90EC; color: white");
            tab.setAttribute("width","100%");
            title.innerHTML = '<th width = "10%">Tag</th>'
                             +'<th width = "60%">Thread title</th>'
                             +'<th class="text-center" width = "10%">Upvote </th>'
                             +'<th class="text-center" width = "10%">Comments </th>'
                             +'<th witdh = "10%">Author </th>';
            tab.appendChild(title);

            var thread;
            for (var i=0;i<Object.keys(myDB.Threads).length;i++) {
                if (myDB.Threads[i].tags!=filterTag) continue;
                thread = document.createElement('tr');
                var tags = document.createElement('th');
                tags.setAttribute('width',"10%");
                tags.innerHTML = myDB.Threads[i].tags;
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
                thread.appendChild(author);

                thread.setAttribute('height','30');
                tab.appendChild(thread);
            }
            tab.setAttribute('style','border-collapse: collapse;border: 1px solid black;');
            document.getElementById("displayThread").appendChild(tab);

        }
    }
};

xmlHttp.open("GET", "/threads");
xmlHttp.send();
