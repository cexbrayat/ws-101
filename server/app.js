var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

app.use(express.static(__dirname + '/'));

server.listen(9003);

var votes = [0, 0, 0, 0, 0];

io.sockets.on('connection', function (socket) {
  socket.emit('votes', { votes: votes });
  socket.on('vote', function(msg){
  	console.log(msg.vote);
  	votes[msg.vote-1] = votes[msg.vote-1] + 1;
  	socket.broadcast.emit('votes', { votes: votes });
  	socket.emit('votes', { votes: votes });
  })
});