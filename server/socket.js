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
      socket.emit('new-match');
    });

    socket.on('delete-match', () => {
      socket.emit('delete-match');
    });

    socket.on('notify', (data) => {
      socket.broadcast.emit(data.otherPlayerId, {
        otherPlayerId: data.id, matchId: data.matchId, type: data.type, name: data.username, league: data.league,
      });
    });
  });
};

module.exports = socketServer;
