const io = require('socket.io-client');

const socket = io.connect('http://127.0.0.1:5000/chat');

socket.on('welcome',(msg) => {
    console.log(msg);
})