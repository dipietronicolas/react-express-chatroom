import './App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ChatRoomContainer } from './components/ChatRoomContainer/ChatRoomContainer';
import { Home } from './components/Home/Home';
import { CartDataProvider } from './context/UserContext';
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
      <BrowserRouter>
        <CartDataProvider>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/chatroom/">
              <ChatRoomContainer />
            </Route>
          </Switch>
        </CartDataProvider>
      </BrowserRouter>
    </div>

  );
}

export default App;
