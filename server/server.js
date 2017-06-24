// server
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3000;

io.on('connection', socket => {

	// acknowledgement
	console.log('A user connected.');

	// incoming message
	socket.on('chat message', msg => {
		console.log(`User said: "${msg}"`);
	});

	// broken pipe
	socket.on('disconnect', _ => {
		console.log('A user disconnected.');
	});

});

http.listen(PORT, _ => {
	console.log(`Server listening on port ${PORT}`);
});
