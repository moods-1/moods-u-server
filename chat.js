module.exports = function (server) {
	const io = require('socket.io')(server, {
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
};
