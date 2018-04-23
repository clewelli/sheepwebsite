$(document).ready(function() {
    //object for easy manipulation of elements
    window.user = {};
    window.wins=0;
    window.played=0;
    window.error_bar1 = $("#err-msg-bar1");
    window.error_bar2= $("#err-msg-bar2");
    window.userInfo=$("#userInfo");
    window.video=$("#video");
    window.url={};

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

    $("#logoutbutton").click(function() { logout(); });
    
    $("#refreshbutton").click(function() { refresh(); });
});

var refresh = function() {
	$.ajax({
        "method": "POST", //Fill in your method type here (GET, POST, PUT, DELETE)
        "crossDomain": true,
        "url": "http://ec2-52-15-233-132.us-east-2.compute.amazonaws.com:3000/geturl/", //may need to change
        "success": update_url,
});
	
}

var update_url = function(data) {
		if (data.dname != ""){
			window.url="http://" + data.dname +":8080/?action=stream";
			var video=$("#video");
			video.attr('src',window.url)
		}
}

var login = function() {
    var name = $("#name").val();
    var pass = $("#password").val();

    if (name === '' || pass === '') {
        error_bar1.text("Username and password must be specified");
    }else if (name.length > 50 || pass.length > 50){
    	error_bar1.text("Username and password must be less than 50 characters");
    } else {
        error_bar1.text("");
        //console.log($("#item9").text() === "");
        $.ajax({
                "method": "POST", //Fill in your method type here (GET, POST, PUT, DELETE)
                "crossDomain": true,
                "url": "http://ec2-52-15-233-132.us-east-2.compute.amazonaws.com:3000/login/", //may need to change
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
	var realpassword=data[0].password;
	var enteredpassword=$("#password").val();
	if (realpassword!=enteredpassword){
		error_bar1.text("Incorrect password, should be"+data[0].password);
	} else{
		$('#outerlogin').hide();
		$('#login').hide();
		$('#outerna').hide();
		$('#newaccount').hide();
		$('#logout').show();
		userInfo.text("Username:" + data[0].username + "\nGames played:" + data[0].games + "\nWins: " + data[0].wins);
		window.user=data.username;
		window.wins=data.games;
		window.games=data.wins;
	}
}

var showlogin = function(name){
	$('#outerlogin').hide();
	$('#login').hide();
	$('#outerna').hide();
	$('#newaccount').hide();
	$('#logout').show();
	userInfo.text("Username:" + name + "\nGames played: 0" + "\nWins: 0" + "\nurl: " + window.url);
	window.user=name;
	window.wins=0;
	window.games=0;
}
var newAccount= function() {
	 var name = $("#namen").val();
	 var pass = $("#passwordn").val();

	 if (name === '' || pass === '') {
	        error_bar2.text("Username and password must be specified");
	 }else if (name.length > 50 || pass.length > 50){
	    	error_bar2.text("Username and password must be less than 50 characters");
	 } else {
	        error_bar2.text("");
	        //console.log($("#item9").text() === "");
	        $.ajax({
	                "method": "POST", //Fill in your method type here (GET, POST, PUT, DELETE)
	                "crossDomain": true,
	                "url": "http://ec2-52-15-233-132.us-east-2.compute.amazonaws.com:3000/create/", //may need to change
	                "data": {
	                	"name": name,
	                	"password": pass
	                },
	                "success": showlogin(name),
	                "error": function(err) {
	                    error_bar2.text(err);
	                }
	        });
	  }
}
var logout= function() {
	window.user={};
	window.wins=0;
	window.games=0;
	$('#outerlogin').show();
	$('#login').show();
	$('#outerna').show();
	$('#newaccount').show();
	$('#logout').hide();
	userInfo.text("");
}
