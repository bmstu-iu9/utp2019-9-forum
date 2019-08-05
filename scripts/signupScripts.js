var exceptionHandle = (form) => {
    var pwd = form.password.value;
    var repwd = form.verify.value;
    if (pwd != repwd) {
        alert('verify password seem incorrect');
        return false;
    }

}
