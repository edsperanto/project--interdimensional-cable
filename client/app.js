console.log('sanity check');
(_ => {
	const socket = io('http://localhost:3000');
	socket.emit('chat message', 'Establishing Connection...');
})();
