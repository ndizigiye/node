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

	socket.on('sendQ', function(query) {
		socket.broadcast.emit('query', query);
		console.log(query);
    });

    // when the user disconnects.. perform this
    socket.on('disconnect', function() {
        console.log("Connection " + socket.id + " terminated.");
    });
});
