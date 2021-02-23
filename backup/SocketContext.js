import React, { useState, useEffect } from 'react';
import socketIOClient from "socket.io-client";


const ENDPOINT = "http://127.0.0.1:4001";
const socket = socketIOClient(ENDPOINT);
/*
const socket = socketIOClient('/', {
  transports: ['websocket'],
  path: '/socket', // added this line of code
});
*/
export const SocketContext = React.createContext();

export const SocketProvider = ({ children }) => {
  
  const [usernames, setUsernames] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  
  useEffect(() => {
    socket.on("usernames", data => {
      setUsernames(data);
    });
  }, []);

  const newUser = (name) => {
    socket.emit('new_user', name);
    socket.on("usernames", data => {
      setUsernames(data);
    });
    socket.on("chat_history", (data) => {
      setChatHistory(data);
    })
  }

  const updateUser = (name) => {
    socket.emit('update_user', name);
    socket.on("usernames", data => {
      setUsernames(data);
    });
    socket.on("chat_history", (data) => {
      setChatHistory(data);
    })
  }

  const sendMessage = (message) => {
    socket.emit('send_message', {
      msg: message,
      type: "text"
    });
  }

  const sendPicture = (message) => {
    socket.emit('send_message', {
      msg: message,
      type: "picture"
    });
  }

  return (
    <SocketContext.Provider
      value={{
        usernames,
        newUser,
        sendMessage,
        chatHistory,
        updateUser,
        sendPicture
      }}>
      { children }
    </SocketContext.Provider>
  )
}