const socketio = require('socket.io');
const chalk = require('chalk');

let io;
const activeAuctions = [];
function init(server) {
  io = socketio(server);
  io.sockets.on('connection', (socket) => {
    console.log(chalk.magenta('[SOCKET] connected:', socket.id));
    io.emit('askForUserId');

    socket.on('userIdReceived', (userId) => {
      console.log(activeAuctions.length);
      activeAuctions[userId] = socket.id;
    });

    socket.on('disconnect', () => {
      activeAuctions.filter((disconnectedId) => disconnectedId === socket.id);
      console.log(chalk.red('[SOCKET] disconnected', socket.id));
      io.emit('auction disconnected', socket.id);
    });
  });
  return { io, activeAuctions };
}

export default { init };
