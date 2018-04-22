$(document).ready(function() {
    //object for easy manipulation of elements
    window.user = {};
    window.wins=0;
    window.played=0;
    window.error_bar1 = $("#err-msg-bar1");
    window.error_bar2= $("#err-msg-bar2");
    window.userInfo=$("#userInfo");

    //makeColumns(getGroceries);

    // Different ways to use jQueyr (tied to the $ symbol) to make listeners for clicking on an element
    /* 
        This is grabbing onto any div child of id=wrapper's that has a class 'filled'
        because the actual classes that we want to make clickable are rendered through JavaScript
        and won't be there when we try to tie this listener to them quite yet
    */
    $("#wrapper").on("click", "div.filled", function() { prepInfo(this); });

    $(".gtype").click(function() { setType($(this).text()); });

    $("#loginbutton").click(function() { login(); });
    
    $("#nabutton").click(function() { newAccount(); });


});

var login = function() {
    var name = $("#name").val();
    var pass = $("#password").val();

    if (name === '' || pass === '') {
        error_bar1.text("Username and password must be specified");
    }else if (name.length > 50 || pass.length > 50){
    	error_bar1.txt("Username and password must be less than 50 characters");
    } else {
        error_bar.text("");
        //console.log($("#item9").text() === "");
        $.ajax({
                "method": "GET", //Fill in your method type here (GET, POST, PUT, DELETE)
                "crossDomain": true,
                "url": "http://electricsheepparty.me/API/users/", //may need to change
                "data": {
                	"name": name
                },
                "success": checkinfo,
                "error": function(err) {
                    error_bar1.text(err);
                }
        });
    }
}

var checkinfo=function(data){
	var realpassword=data.password;
	var enteredpassword=$("#password").val();
	if (realpassword!=enteredpassword){
		error_bar1.txt("Incorrect password");
	} else{
		showlogin(data);
	}
}

var showlogin = function(data){
	document.getElementById("login").display = 'none';
	document.getElementById("logbutton").display = 'none';
	document.getElementById("newaccount").display = 'none';
	document.getElementById("nabutton").display = 'none';
	document.getElementById("logout").display = 'none';
	userInfo.txt("Username:" + data.username + "\nGames played:" + data.games + "\nWins:" + data.wins);
}
var newAccount= function() {
	 var name = $("#namen").val();
	 var pass = $("#passwordn").val();

	 if (name === '' || pass === '') {
	        error_bar2.text("Username and password must be specified");
	 }else if (name.length > 50 || pass.length > 50){
	    	error_bar2.txt("Username and password must be less than 50 characters");
	 } else {
	        error_bar2.text("");
	        //console.log($("#item9").text() === "");
	        $.ajax({
	                "method": "POST", //Fill in your method type here (GET, POST, PUT, DELETE)
	                "crossDomain": true,
	                //"url": "http://electricsheepparty.me/API/users/", //may need to change
	                "data": {
	                	"name": name,
	                	"password": pass
	                },
	                "success": showlogin,
	                "error": function(err) {
	                    error_bar2.text(err);
	                }
	        });
	  }
}
