## DLSocketSimplyServerDemo ##

This is very a simple demo of the implementation of **Socket.io** server on Node.js.

I use the **Socket.io** chat example as based and added support por rooms.

You can see the original sample [Here](https://github.com/socketio/socket.io/tree/master/examples/chat)

I also have an iOS Demo Chat Client App for this server, you can see here: [DLSocketSimplyiOS](https://github.com/daniel-lahoz/DLSocketSimplyiOS)

## How to use

```
$ cd DLSocketSimplyServerDemo
$ npm install
$ npm start
```

And point your browser to `http://localhost:3000`. Optionally, specify a port by supplying the `PORT` env variable.

## Features

- Multiple users can join a specify chat room by each entering a unique username and chatroom on website load.
- Users can type chat messages to that chat room.
- A notification is sent to all users when a user joins or leaves
the chatroom.

### Make One Yourself ###

Be free of use this simple example as you pleased.
