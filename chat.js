const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const port = process.env.SOCKET_PORT;
const server = http.createServer(app);
app.use(cors());

const io = new Server(server, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST'],
	},
});

io.on('connection', (socket) => {
	socket.on('join_room', (data) => {
		const { room, originator } = data;
		socket.join(room);
		// console.log(`User with ID: ${socket.id} joined room ${room}`);
	});

	socket.on('send_message', (data) => {
		socket.to(data.room).emit('receive_message', data);
	});

	socket.on('disconnect', () => {
		console.log('User disconnected', socket.id);
	});
});

module.exports = function () {
	try {
		server.listen(port, () => {
			console.log(`Chat server listening on port ${port}`);
		});
	} catch (err) {
		console.log(err);
	}
};
