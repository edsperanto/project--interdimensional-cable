(_ => {

	// socket connection
	const socket = new io();

	// device info
	const device = {
		type: 'remote'
	}

	// connection
	socket.on('connect', _ => {
		console.log('connected remote');
	});
	socket.on('reconnect', _ => {
		console.log('reconnecting remote');
	});
	socket.on('reconnect_attempt', num => {
		console.log('attempt', num);
	});
	socket.on('disconnect', _ => {
		console.log('remote disconnected');
	});

	// device type identification
	socket.emit('identification', JSON.stringify(device));

	// pseudo commands for testing
	setInterval(_ => {
		socket.emit('cmd', Math.random().toString(36).substr(2,7));
	}, 1000);

})();
