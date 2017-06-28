// server
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 4007;

var tvs = {};
var remotes = {};

// action when connected
io.on('connection', socket => {

	// identification
	socket.on('identification', device => {
		device = JSON.parse(device);
		console.log(`${device.type}#${device.id} connected.`);
		if(device.type === 'tv') {
			tvs[device.id] = socket;
			socket.remotes = [];
		}
		if(device.type === 'remote') {
			remotes[socket.id] = socket;
		}
	});

	// incoming message
	socket.on('chat message', msg => {
		console.log(`User said: "${msg}"`);
	});

	// broken pipe
	socket.on('disconnect', _ => {
		console.log(`${device.type}#${device.id} disconnected.`);
	});

});

http.listen(PORT, _ => {
	console.log(`Server listening on port ${PORT}`);
});
