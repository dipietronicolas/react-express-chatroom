import React, { useContext } from 'react';
import { SocketContext } from '../../context/SocketContext';
import './UsernameList.css';

export const UsernameList = () => {

  const { usernames } = useContext(SocketContext);

  return (
    <div className="Chatroom-username-container">
      <div className="Chatroom-username">
        <p className="Chatroom-username-title">Users list</p>

        <div className="Chatroom-username-list">
          {
            usernames.length > 0 &&
            usernames.map((username, index) => {
              return (
                <p key={index} className="Chatroom-username-name">
                  <i className="fas fa-user-circle Chatroom-username-icon"></i>
                  {username}
                </p>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}
