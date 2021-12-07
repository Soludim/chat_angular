const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const app = express();

const port = process.env.PORT || "3000";
app.set("port", port);

const server = http.createServer(app);






app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
  });

const io = require('socket.io').listen(server);

io.on('connection', (socket) => {
  console.log("new connection made");

  socket.on('join',(data) => {
     socket.join(data.group);

     console.log(data.user + ' joined the room : ' + data.group);
     socket.broadcast.to(data.group).emit('new user joined', {user: data.user, message: 'has joined this group'});
  });

  socket.on('leave',(data) => {
    socket.leave(data.group);

    console.log(data.user + ' left the room : ' + data.group);
    socket.broadcast.to(data.group).emit('left room', {user: data.user, message: 'has left this group'});
  });

  socket.on('message', (data) => {
    io.in(data.group).emit('new message', {user:data.user, message: data.message});
  });

});

server.listen(port);

module.exports = app;