$(document).ready(function() {
    //object for easy manipulation of elements
    window.user = {};
    window.wins=0;
    window.played=0;
    window.error_bar1 = $("#err-msg-bar1");
    window.errir_bar2= $("#err-msg-bar2");

    //makeColumns(getGroceries);

    // Different ways to use jQueyr (tied to the $ symbol) to make listeners for clicking on an element
    /* 
        This is grabbing onto any div child of id=wrapper's that has a class 'filled'
        because the actual classes that we want to make clickable are rendered through JavaScript
        and won't be there when we try to tie this listener to them quite yet
    */
    $("#wrapper").on("click", "div.filled", function() { prepInfo(this); });

    $(".gtype").click(function() { setType($(this).text()); });

    $("#Login").click(function() { login(); });
    
    $("#Create Account").click(function() { newAccount(); });


});

var login = function() {
    var name = $("#name").val();
    var pass = $("#password").val();

    //console.log("name: " + name + " price: " + price + " type: " + type + "? " + type.startsWith("Choose a type: "));

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
                "url": "http://electricsheepparty.me/API/users/"+ name, //may need to change
                "success": checkinfo,
                "error": function(err) {
                    error_bar1.text(err);
                }
        });
    }
}

var checkinfo=function(){
	var 
}
