(_ => {

	// socket connection
	const socket = io.connect();

	setInterval(_ => {
		socket.emit('chat message', 'Establishing Connection...');
	}, 1000);

	socket.on('connect', _=> {
		console.log('connected');
	});

	socket.on('reconnect', _=> {
		console.log('reconnect');
	});

	socket.on('reconnect_attempt', num => {
		console.log(num);
	});

	socket.on('disconnect', _=> {
		console.log('disconnected');
	});

})();
