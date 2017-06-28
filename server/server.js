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
		socket.device = device;
		if(device.type === 'tv') {
			console.log(`${device.type}#${device.id} connected.`);
			tvs[device.id] = socket;
			socket.remotes = [];
		}
		if(device.type === 'remote') {
			console.log(`${device.type}#${socket.id} connected.`);
			remotes[socket.id] = socket;
		}
	});

	// incoming commands
	socket.on('cmd', cmd => {
		if(!!remotes[socket.id]) {
			Object.keys(tvs).forEach(id => {
				tvs[id].emit('cmd', cmd);
			});
		}
	})

	// incoming message
	socket.on('chat message', msg => {
		console.log(`User said: "${msg}"`);
	});

	// broken pipe
	socket.on('disconnect', _ => {
		console.log(`A device disconnected.`);
	});

});

http.listen(PORT, _ => {
	console.log(`Server listening on port ${PORT}`);
});
