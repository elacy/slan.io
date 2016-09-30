var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('.tmp'));
app.use('/bower_components', express.static('bower_components'));

io.on('connection', function(socket){
  socket.on('channel message', function(msg){
    io.emit('channel message', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
