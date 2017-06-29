(_ => {

	// socket connection
	const socket = new io();

	// device info
	const device = {
		id: Math.random().toString(36).substr(2, 4).toUpperCase(),
		type: 'tv'
	}

	// connection
	socket.on('connect', _ => {
		console.log('tv connected');
	});
	socket.on('reconnect', _ => {
		console.log('reconnecting tv');
	});
	socket.on('reconnect_attempt', num => {
		console.log('attempt', num);
	});
	socket.on('disconnect', _ => {
		console.log('tv disconnected');
	});

	// device type identification
	socket.emit('identification', JSON.stringify(device));

	// remote commands
	socket.on('cmd', cmd => {
		console.log('incoming', cmd);
	});

})();
