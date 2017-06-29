const WebSocket = require('ws');
const wss = new WebSocket.Server({port: 4007});

wss.on('connection', ws => {
	console.log('connection established');
});
