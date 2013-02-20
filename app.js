  var express = require("express");
  var app = express();
  http = require('http');
  server = http.createServer(app);
  var io = require('socket.io').listen(server);

//io.configure(function() {
    //io.set("transports", [ "xhr-polling" ]);
    //io.set("polling duration", 100000);
//});

server.listen(8080/*process.env.PORT*/);

// routing
app.get('/prettyphoto_css', function(req, res) {
    res.sendfile(__dirname + '/lib/prettyPhoto/prettyphoto.css');
});

app.get('/prettyphoto_js', function(req, res) {
    res.sendfile(__dirname + '/lib/prettyPhoto/prettyphoto.js');
});

app.get('/images', function(req, res) {
    res.sendfile(__dirname + '/images/'+req.query["image"]+'.png');
});

app.get('/', function(req, res) {
    res.sendfile(__dirname + '/mobile.html');
});

app.get('/monitor', function(req, res) {
    res.sendfile(__dirname + '/monitor.html');
});


io.sockets.on('connection', function(socket) {

    // console.log(message+ " Client " + socket.id);
	socket.broadcast.emit('uchat', socket.id + ' is connected');

	socket.on('click', function(message) {
		var string = socket.id+message;
		socket.broadcast.emit('clicked', string);
    });

    // when the user disconnects.. perform this
    socket.on('disconnect', function() {
        console.log("Connection " + socket.id + " terminated.");
    });
});

/*var mysql      = require('mysql');
var connection = mysql.createConnection({
host     : 'localhost',
user     : 'root',
password : 'armand11',
database : 'node',
});
connection.connect(function(err) {
	if (null == err){
		console.log('----------------connected----------------');
	}
	else{
		console.log('----------------'+err+'----------------');
	}
});

//insert a table
connection.query(
		'CREATE TABLE node'+
		'(id INT(11) AUTO_INCREMENT, '+
		'title VARCHAR(255), '+
		'text TEXT, '+
		'created DATETIME, '+
		'PRIMARY KEY (id));', function(err, results) {
			if (err && err.number != connection.ERROR_TABLE_EXISTS_ERROR) {
				console.log("------------------ERROR: " + err.message);
				throw err;
			}});
---------------------------------------	
			var query = "INSERT INTO node (title, text) VALUES ("+socket.id+","+socket.id+")";
		connection.query(query,function(err,results){
			if (null == err){
				console.log('----------------'+results+'----------------');
			}
			else{
				console.log('----------------'+err+'----------------');
			}
		});
*/