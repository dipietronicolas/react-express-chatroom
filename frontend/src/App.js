import './App.css';
import React, { useState, useEffect } from "react";
import { ChatRoomContainer } from './components/ChatRoomContainer/ChatRoomContainer';
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://127.0.0.1:4001";

function App() {

  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("FromAPI", data => {
      setResponse(data);
    });
  }, []);

  return (
    <div className="App">
      <h1>Chat Room</h1>
      <p>{response}</p>
      <ChatRoomContainer />
    </div>
  );
}

export default App;
