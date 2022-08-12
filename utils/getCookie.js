function getCookie(cookie,name) {
    // Split cookie string and get all individual name=value pairs in an array
    var cookieArr = cookie.split(";");
    // Loop through the array elements
    for(var i = 0; i < cookieArr.length; i++) {
        var cookiePair = cookieArr[i].split("=");
        /* Removing whitespace at the beginning of the cookie name
        and compare it with the given string */
        if(name == cookiePair[0].trim()) {
            // Decode the cookie value and return
            return decodeURIComponent(cookiePair[1]);
        }
    } 
    // Return null if not found
    return null;
}
function delete_cookie(name) {
    var d = new Date();
    d.setTime(d.getTime() + (0*60*1000));
    var expires = "expires="+d.toUTCString();  
    document.cookie = name + "=" + '' + ";" + expires + ";path=/";
}
export {
    getCookie,
    delete_cookie
}