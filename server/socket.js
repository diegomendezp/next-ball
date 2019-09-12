const socketServer = (io) => {
  console.log('Socket Server Started!');

  io.on('connection', (socket) => {
    console.log(`a user connected with id ${socket.conn.id}`);

    socket.on('finishMatch', (data) => {
      socket.broadcast.emit(data.otherPlayerId, { otherPlayerId: data.playerId, matchId: data.matchId, type: data.type });
      socket.emit(data.playerId, { otherPlayerId: data.playerId, matchId: data.matchId, type: data.type });
    });
    socket.on('new-match', () => {
      socket.broadcast.emit('new-match');
    });
  });
};

module.exports = socketServer;
