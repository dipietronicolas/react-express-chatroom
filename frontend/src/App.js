import './App.css';
import React, { useContext } from "react";
import { ChatRoomContainer } from './components/ChatRoomContainer/ChatRoomContainer';
import { Home } from './components/Home/Home';
import { UserContext } from './context/UserContext';

function App() {

  const { username } = useContext(UserContext);
  return (
    <div className="App">
        {
          username
          ? <ChatRoomContainer />
          : <Home />
        }
    </div>

  );
}

export default App;
