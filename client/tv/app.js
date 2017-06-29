(_ => {

	// DOM elements
	const info = document.getElementById('info');

	// socket connection
	var socket = new WebSocket('wss://www.edwardgao.com/projects/idc/api/');

	// device info
	const device = {
		id: Math.random().toString(36).substr(2, 4).toUpperCase(),
		type: 'tv'
	}
	info.innerText = device.id;

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
	});

})();
