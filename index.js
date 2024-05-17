// index.js

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the "public" directory
app.use(express.static('public'));

// Socket.io logic for real-time communication
io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle new message from client
  socket.on('sendMessage', (message) => {
    console.log('New message:', message);
    // Broadcast the message to all clients
    io.emit('newMessage', message);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
