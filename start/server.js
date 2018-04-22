var sqlite = require("sqplite3");
var express = require("express");
var bodyParser = require("body-parser");
var db = require("./database.js");
var app = express();

app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) { // request, response, next
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, cache-control");
    return next();
});

var port = process.env.PORT || 8080; //may need to change port number later
var router = express.Router(); //create express router

router.use(function(req, res, next) {
    // do logging
    console.log("Server in use");
    next(); // make sure we go to the next routes and don't stop here
});

// this is an alias, so people don’t know the real file-path of your application
app.use('/api1', express.static(__dirname + '/session2/bb/'));
//they can ask for `static/critical.js` and get `app/important/critical.js`, but
//a hacker wouldn’t know the file path to actually get the file if they got mischievous

router.route("/get/")
    .get(function(req, res) { // GET requests respond with Hello World
    	var name=req.body.name;
        query = "SELECT * FROM users WHERE username = ?;"
        db.run(query, [name], function(err, entry) {
            if (err) {
                console.log(err.message);
                res.send("Error finding specified user");
            }
            res.json(entry);
        });
    });

router.route("/post/")
    .get(function(req, res) { // GET requests respond with Hello World
    	var name = req.body.name;
    	var password= req.body.password;
        db.run("INSERT INTO users(name, password, games, wins) VALUES (?,?,?,?);", [name, password,0,0], function(err) {
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
app.use("/api", router);

server = app.listen(port);
//console.log("Express server listening on port %d in %s mode. ", port, app.settings.env);

