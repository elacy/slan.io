var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


if(process.env.NODE_ENV === 'development'){
  app.use(express.static('.tmp'));
  app.use(express.static('client'));
  app.use('/bower_components', express.static('bower_components'));
}
else{
  app.use(express.static('client'));
}

io.on('connection', function(socket){
  socket.on('channel message', function(msg){
    io.emit('channel message', msg);
  });
});

var port = process.env.port || 3000;
http.listen(port, function(){
  console.log(`listening on *:${port}`);
});
