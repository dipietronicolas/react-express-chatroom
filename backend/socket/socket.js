const socketIo = (io) => {
  
  // io connection event emit
  io.on("connection", (socket) => {
    console.log("New client connected");
  
    const response = 'FromAPI message'
  
    socket.emit("FromAPI", response);
  
    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  
  
  
  });
}

module.exports = socketIo;
