

module.exports = (io, socket) => {
    const sendMessage = (message, roomId) => {
      io.to(roomId).emit(SOCKET_EVENT.SERVER.SEND_MESSAGE, message);
    };
  
}