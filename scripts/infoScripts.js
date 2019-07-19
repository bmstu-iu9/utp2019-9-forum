var login;

if (document.cookie == '/' || document.cookie == "") {
    document.getElementById('displayUsername').innerHTML = "You are not login!";
    document.getElementById('switchNavTab').innerHTML= '<li><a href="./views/login.html">Login</a></li><li><a href="./views/signup.html">Sign Up</a></li>';
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
      document.getElementById('switchNavTab').innerHTML= '<li><a href="./views/login.html">Login</a></li><li><a href="./views/signup.html">Sign Up</a></li>';
    }
}

var xmlHttp = new XMLHttpRequest();

xmlHttp.onreadystatechange = function() {
    if (this.readyState==4 && this.status==200) {
        var myDB = JSON.parse(this.responseText);
        login = window.location.pathname.split('/')[2];
        var index;
        for (var i=0;i<Object.keys(myDB.Users).length;i++)
            if (myDB.Users[i].username == login) index = i;

        console.log(index);

        var author = document.createElement('tr');
        var inner = document.createElement('th');
        inner.innerHTML = '<font size = "+2">' + login +'</font>';
        author.appendChild(inner);
        document.getElementById("displayThread").appendChild(author);

        var joinDate = document.createElement('tr');
        var inner = document.createElement('th');
        inner.innerHTML =  'Join date - ' + new Date(myDB.Users[index].date);
        joinDate.appendChild(inner);
        document.getElementById("displayThread").appendChild(joinDate);
    }
};

xmlHttp.open("GET", "/users");
xmlHttp.send();

var numberOfThread=0;
xmlHttp = new XMLHttpRequest();

xmlHttp.onreadystatechange = function() {
    if (this.readyState==4 && this.status==200) {
        var myDB = JSON.parse(this.responseText);

        var none = document.createElement('tr');
        var inner = document.createElement('th');
        inner.setAttribute('width',"100%");
        none.setAttribute('style',"background-color : #0E61EA");
        none.setAttribute('height','5');
        none.appendChild(inner);
        document.getElementById("displayThread").appendChild(none);

        var numberOfThread=0;
        for (var i=0;i<Object.keys(myDB.Threads).length;i++) numberOfThread+=(myDB.Threads[i].author == login);


        var title = document.createElement('tr');
        var inner = document.createElement('th');
        inner.setAttribute('width',"100%");
        inner.innerHTML = 'All posts - ' + numberOfThread + ' posts';
        inner.setAttribute('style',"background-color : #E5EEFD");
        title.appendChild(inner);
        document.getElementById("displayThread").appendChild(title);

        var none1 = document.createElement('tr');
        var inner = document.createElement('th');
        none1.appendChild(inner);
        none1.setAttribute('height','20');
        document.getElementById("displayThread").appendChild(none1);

        var all = document.createElement('table');
        var navbar = document.createElement('tr');
        var inner = document.createElement('th');
        inner.setAttribute('width',"10%");
        inner.innerHTML = 'Tags';
        inner.setAttribute('style',"background-color : #126DA5; color : white");
        navbar.appendChild(inner);
        var inner = document.createElement('th');
        inner.setAttribute('width',"70%");
        inner.innerHTML = 'Thread title';
        inner.setAttribute('style',"background-color : #126DA5; color : white");
        navbar.appendChild(inner);
        var inner = document.createElement('th');
        inner.setAttribute('width',"10%");
        inner.innerHTML = 'Upvotes';
        inner.setAttribute('style',"background-color : #126DA5; color : white");
        navbar.appendChild(inner);
        var inner = document.createElement('th');
        inner.setAttribute('width',"10%");
        inner.innerHTML = 'Comments';
        inner.setAttribute('style',"background-color : #126DA5; color : white");
        navbar.appendChild(inner);
        all.appendChild(navbar);
        all.setAttribute('width',"100%");
        document.getElementById("displayThread").appendChild(all);

        var tab = document.createElement('table');
        for (var i=0;i<Object.keys(myDB.Threads).length;i++) {
            if (myDB.Threads[i].author != login) continue;
            thread = document.createElement('tr');

            var tags = document.createElement('th');
            tags.setAttribute('width',"10%");
            var inner = document.createElement('a');
            var tag = myDB.Threads[i].tags.substr(1);
            inner.setAttribute('href','/filter/tag='+tag);
            inner.innerHTML = myDB.Threads[i].tags;
            tags.appendChild(inner);
            thread.appendChild(tags);

            var title = document.createElement('th');
            title.setAttribute('width',"70%");
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
            thread.setAttribute('height','30');

            tab.appendChild(thread);
        }
      tab.setAttribute('width',"100%");
      document.getElementById("displayThread").appendChild(tab);
    }
};

xmlHttp.open("GET", "/threads");
xmlHttp.send();
