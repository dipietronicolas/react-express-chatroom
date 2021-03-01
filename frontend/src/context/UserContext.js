import React, { useState, useContext } from 'react';
import { SocketContext } from '../context/SocketContext';
export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {

  const { usernames } = useContext(SocketContext);
  const [username, setUsername] = useState('');

  const addUsername = (new_name, callback) => {
    if (usernames.includes(new_name)) {
      callback(false);
      console.log("No esta disponible");
    } else {
      setUsername(new_name);
      callback(true);
    }
  }

  return (
    <UserContext.Provider
      value={{
        username,
        addUsername
      }}>
      { children}
    </UserContext.Provider>
  )
}