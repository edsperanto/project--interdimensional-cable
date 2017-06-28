(_ => {
	const url = "https://www.edwardgao.com/projects/idc";
	const socket = io(url);
	socket.emit('chat message', 'Establishing Connection...');
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
