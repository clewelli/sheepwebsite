var sqlite3=require('sqlite3').verbose(); //use sqlite3

var db=new sqlite3.Database('./project.db',sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) =>{
	if (err){
		return console.error(err.message);
	}
	console.log('Connected to sqlite database');//comment out later
});
db.run ("CREATE TABLE IF NOT EXISTS users("+
		"name varchar(50) NOT NULL," +
		"password varchar(50) NOT NULL," +
		"games INTEGER," +
		"wins INTEGER," +
		"UNIQUE(name));",
  function(err) {
	if (err){
		throw err;
	}
	console.log ("created users table");
});
module.exports=db
