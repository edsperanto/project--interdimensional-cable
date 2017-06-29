(_ => {

	// socket connection
	var socket = new WebSocket('wss://www.edwardgao.com/projects/idc/api/');

	// device info
	const device = {
		id: Math.random().toString(36).substr(2, 8).toUpperCase(),
		type: 'remote'
	}

	// process incoming data stream
	socket.addEventListener('message', msg => {

		// parse incoming
		data = JSON.parse(msg.data);

		// identification
		const identity = {action: 'identify', device};
		if(data.action === 'identify') {
			socket.send(JSON.stringify(identity));
		}

	});

	socket.addEventListener('open', e => {

		// pseudo command
		var command = {
			action: 'cmd',
			target: null,
			cmd: Math.random().toString(36).substr(2, 20)
		}

		// send pseudo commands for testing
		setInterval(_ => {
			socket.send(JSON.stringify(command));
		}, 1000);

	});

})();
