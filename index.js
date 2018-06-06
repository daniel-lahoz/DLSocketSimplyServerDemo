// Setup basic express server
var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
  var addedUser = false;
   
  // when the client emits 'new message', this listens and executes
  socket.on('new message', (data) => {
    // we tell the client to execute 'new message'
    socket.to(socket.roomname).emit('new message', {
      username: socket.username,
      message: data
    });
  });

  // when the client emits 'add user', this listens and executes
  socket.on('add user', (infodicc) => {

    if (addedUser) return;

    var username = infodicc.username;
    var roomname = infodicc.roomname;

    console.log('New User: ' + username +' on Roomname: ' + roomname);
    socket.join(roomname);

    // we store the username in the socket session for this client
    socket.username = username;
    socket.roomname = roomname;
    addedUser = true;
  
    io.in(socket.roomname).clients((err, clients) => {
      var numUsers = clients.length;
      console.log(numUsers);

      socket.emit('login', {
        numUsers: numUsers
      });
      // echo globally (all clients) that a person has connected
      socket.to(socket.roomname).emit('user joined', {
        username: socket.username,
        numUsers: numUsers
      });

    });

    
  });

  // when the client emits 'typing', we broadcast it to others
  socket.on('typing', () => {
    socket.to(socket.roomname).emit('typing', {
      username: socket.username
    });
  });

  // when the client emits 'stop typing', we broadcast it to others
  socket.on('stop typing', () => {
    socket.to(socket.roomname).emit('stop typing', {
      username: socket.username
    });
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', () => {
    if (addedUser) {
      // echo globally that this client has left
      io.in(socket.roomname).clients((err, clients) => {
        var numUsers = clients.length;

        socket.to(socket.roomname).emit('user left', {
          username: socket.username,
          numUsers: numUsers
        });
        socket.leave(socket.roomname);
      });
      
    }
  });


});


