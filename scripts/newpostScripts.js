if (document.cookie == '/' || document.cookie == "") {
    document.getElementById('displayUsername').innerHTML = "You are not login!";
    document.getElementById('switchNavTab').innerHTML= '<li><a href="/login">Login</a></li><li><a href="/signup">Sign Up</a></li>';
  }
else {
    var txt = document.cookie.split(';');
    var name;

    for (var i=0;i<txt.length;i++) {
      //console.log("username is = " + txt[1].indexOf("username"));
        if (txt[i].indexOf("username") !=-1) name = txt[i];
    }

    var login = name.split('=')[1];
    document.getElementById('displayUsername').innerHTML = 'Welcome ' + login;
    document.getElementById('switchNavTab').innerHTML= '<li><a href="/add-post">Create new post</a></li>'
                                                      +'<li><a href="/user/'+login+'">My info</a></li>'
                                                      +'<li><a href="/logout">Log out</a></li>';

}
