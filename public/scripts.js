// public/scripts.js

document.addEventListener('DOMContentLoaded', () => {
    const socket = io();
  
    const messageForm = document.getElementById('messageForm');
    const messageInput = document.getElementById('messageInput');
    const messageList = document.getElementById('messageList');
  
    // Function to add a new message to the list
    const addMessage = (message) => {
      const li = document.createElement('li');
      li.textContent = message;
      messageList.appendChild(li);
    };
  
    // Handle form submission
    messageForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const message = messageInput.value.trim();
      if (message) {
        // Emit new message to the server
        socket.emit('sendMessage', message);
        messageInput.value = ''; // Clear input field
      }
    });
  
    // Listen for new messages from the server
    socket.on('newMessage', addMessage);
  });
  