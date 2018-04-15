var sqlite = require("sqplite3");
var express = require("express");
var bodyParser = require("body-parser");
var db = require("./database.js");
var app = express();

app.use(bodyParser.urlencoded({enxtend: true)));
app.use(bodyParser.json());
