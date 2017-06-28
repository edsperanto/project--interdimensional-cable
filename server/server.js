// server
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3000;

// action when connected
io.on('connection', socket => {

	// acknowledgement
	console.log(`User ${socket.id} connected.`);

	// tv functions
	io.of('/tv').clients((err, cli) => {
		if(err) throw err;
		console.log('A tv is connected');
	});

	// remote functions
	io.of('/remote').clients((err, cli) => {
		if(err) throw err;
		console.log('A remote is connected');
	});

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
