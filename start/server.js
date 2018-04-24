var sqlite = require("sqlite3");
var express = require("express");
var bodyParser = require("body-parser");
var db = require("./database.js");
var app = express();
var url={};
var p1="";
var p2="";
var winner="";
var loser="";

app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) { // request, response, next
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
	res.header("Access-Control-Allow-Headers", "Content-Type, cache-control");
	return next();
});

var port = process.env.PORT || 3000; //may need to change port number later
var router = express.Router(); //create express router

router.use(function(req, res, next) {
	// do logging
	console.log("Server in use");
	next(); // make sure we go to the next routes and don't stop here
});
router.route("/login/")
	.post(function(req, res) { // GET requests respond with Hello World
    	var name=req.body.name;
    	console.log(name);
    	query = "SELECT * FROM users WHERE username = ?;"
    	db.all(query, [name], function(err, entry) {
        	if (err) {
            	var fail="yes";
            	console.log("no such user");
            	res.send({fail});
        	}
        	if (entry==""){
            	var fail="yes";
            	console.log("no such user");
            	res.send({fail});
        	}else{
            	res.json(entry);
            	console.log(entry);
        	}
    	});
	});

router.route("/play/")
	.post(function(req, res) {
    	var name=req.body.name;
    	var player="";
    	if (p1==""){
            	p1=name;
            	player="p1";
            	console.log("p1 is "+ p1);
    	}else if (p2==""){
            	p2=name;
            	player="p2"
            	console.log("p2 is " + p2);
    	}
    	res.json({player});
	});

router.route("/winner/")
	.post(function(req, res) {
    	var name=req.body.name;
    	var win="";
    	console.log(winner + " " +loser);
    	if (name==winner){
            	win="yes";
            	winner="";
    	}else if(name==loser){
            	win="no";
            	loser="";
            	console.log("found loser");
    	}
    	res.json({win});
    	console.log("win request");
	});

router.route("/endgame/")
	.post(function(req, res) {
    	if (req.headers.winner=="p1"){
            	winner=p1;
            	loser=p2;
    	} else{
            	winner=p2;
            	loser=p1;
    	}
    	console.log("winner is " + winner + "loser is " + loser);
    	query="UPDATE users SET games=games+1, wins=wins+1 WHERE username=?";
    	db.all(query,[winner], function(err, entry) {
            	if (err) {
            	console.log(err.message);
            	res.send("Error finding specified user");
        	}
    	});

    	query="UPDATE users SET games=games+1, wins=wins+1 WHERE username=?";
    	db.all(query,[loser], function(err, entry) {
            	if (err) {
            	console.log(err.message);
            	res.send("Error finding specified user");
        	}
    	});


    	p1="";
    	p2="";
    	res.json({message: "Success" });

	});

router.route("/url/")
	.put(function(req, res) { // GET requests respond with Hello World
    	url=req.headers.domain;
    	res.json({message: "Success" });
    	console.log(url);
	});

router.route("/geturl/")
    	.post(function(req,res) {
    	var dname=""+ url;
    	res.json({dname});
});


router.route("/create/")
	.post(function(req, res) { // GET requests respond with Hello World
    	var name = req.body.name;
    	var password= req.body.password;
    	console.log("recieved create request\n");
    	db.run("INSERT INTO users(username, password, games, wins) VALUES (?,?,?,?);", [name, password,0,0], function(err) {
            	if (err) {
            	console.log("User already exists...");
            	res.send("User already exists...");
        	} else {
            	console.log("Making user...");
            	res.json({ message: "Success" });
        	}
        	return;
    	});
	});


// -----------------------------------------------------------------------------
//add-on to the IP address and port #, for minor security and/or personal flair
app.use("", router);

server = app.listen(port);
//console.log("Express server listening on port %d in %s mode. ", port, app.settings.env);
