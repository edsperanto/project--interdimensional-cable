const WebSocket = require('ws');
const wss = new WebSocket.Server({port: 4007});

var tvs = {};
var remotes = {};

console.log('Server listening on port 4007');

wss.on('connection', (socket, req) => {

	var deviceType = null;
	var deviceId = null;

	// acknowledgement
	const ack = {action: 'identify'};
	if(!deviceType)
		socket.send(JSON.stringify(ack));

	// incoming message
	socket.on('message', msg => {

		// parse incoming
		data = JSON.parse(msg); 
		
		// identification
		if(data.action === 'identify' && deviceType === null) {
			deviceType = data.device.type;
			deviceId = data.device.id;
			console.log(`${deviceType}#${deviceId} connected`);
			if(deviceType === 'tv') {
				tvs[deviceId] = {
					remotes: [],
					socket
				};
			} else if(deviceType === 'remote') {
				remotes[deviceId] = {
					socket,
					tv: null
				};
			} else {
				deviceType = null;
				deviceId = null;
			}
		}

	});

	socket.on('close', _ => {
		console.log(`${deviceType}#${deviceId} disconnected`);
	});

});
