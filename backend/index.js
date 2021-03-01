const express = require('express'),
  http = require('http'),
  socketio = require('socket.io'),
  app = express(),
  server = http.createServer(app);


// Conexion de web sockets
const io = socketio(server, {
  cors: {
    origin: 'http://localhost:3000',
  }
});

// Requiero mi archivo socket
require('./socket/socket')(io);

// Settings
app.set('port', process.env.PORT || 4001);


// Routes
app.use(require('./routes/index.routes'));



server.listen(app.get('port'), () => {
  console.log('listen on port ' + app.get('port'));
})