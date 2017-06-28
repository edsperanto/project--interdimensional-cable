(_ => {

	// socket connection
	const socket = io.connect();

	setInterval(_ => {
		socket.emit('chat message', 'remote controlling');
	}, 1000);

})();
