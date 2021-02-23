const socketIo = (io) => {

  let usernames = [];
  const colors = ["slateblue", "blueviolet", 
    "darkblue", "darkgreen", "darkred", "dodgerblue",
    "goldenrod", "hotpink", "sienna", 
    "darkolivegreen", "darkslategrey"];

  // io connection event emit
  io.on("connection", (socket) => {

    console.log("New client connected");

    socket.on('new_user', (data) => {
      socket.username = data;
      socket.color = colors[Math.floor(Math.random() * colors.length)];
      usernames.push(socket.username);
      updateUsernames();
      console.log('Nuevo usuario conectado: ' + socket.username);
    });

    socket.on('update_user', (data) => {
      const index = usernames.indexOf(socket.username);
      socket.username = data;
      usernames.splice(index, 1, socket.username);
      updateUsernames();
      console.log('Usuario modificado: ' + socket.username);
    });

    socket.on('send_message', data => {
      console.log(data);
      const new_message = {
        msg: data.msg,
        type: data.type,
        username: socket.username,
        color: socket.color
      }
      sendMessage(new_message);
    });

    
    const updateUsernames = () => {
      io.sockets.emit('usernames', usernames);
    }
    updateUsernames();

    const sendMessage = (msg) => {
      io.sockets.emit('send_msg', msg);
    }

    socket.on("disconnect", () => {
      if (!socket.username) return;
      usernames.splice(usernames.indexOf(socket.username), 1)
      updateUsernames();
      console.log(`Client ${socket.username} disconnected`);
    });
  });
}

module.exports = socketIo;
