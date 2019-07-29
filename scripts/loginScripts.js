var xmlHttp = new XMLHttpRequest();
var myDB;

xmlHttp.onreadystatechange =function() {
    if (this.readyState==4 && this.status==200) {
       myDB = JSON.parse(this.responseText);
    }
};

xmlHttp.open("GET", "/users");
xmlHttp.send();

var exceptionHandle = (form) => {
    var pwd = form.password.value;
    var index = -1;
    for (var i=0;i<Object.keys(myDB.Users).length;i++)
        if (myDB.Users[i].username == form.username.value) index = i;
    if (index == -1) {
        alert('No such this user');
        return false;
    }
    else if (pwd != myDB.Users[index].password) {
        alert("Password isn't correct");
        return false;
    }

}
