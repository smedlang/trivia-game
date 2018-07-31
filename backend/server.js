var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var socketIO = require('socket.io')

let app = express();

// app.use(cors());
// const server = http.Server(app)
const server = require('http').Server(app);
const io = socketIO(server)


app.get('/getScoreBoard', (req, res) => {

});

io.on('connection', socket => {
  console.log('connection');
  io.emit('waitingForAnotherPlayer');

  //room = id
  socket.on('join', () => {
    console.log('joined');
  });
      //one person


});

server.listen(1337);
