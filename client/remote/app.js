(_ => {

	// socket connection
	const socket = io.connect();

	// device type identification
	socket.emit('identification', 'remote');

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

})();
