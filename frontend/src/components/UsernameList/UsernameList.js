import React from 'react';

import './UsernameList.css';

export const UsernameList = () => {
  return (
    <div className="Chatroom-username-container">
      <div className="Chatroom-username">
        <p className="Chatroom-username-title">Users list</p>
        
          <div className="Chatroom-username-list">
            <p className="Chatroom-username-name">Nico</p>
            <p className="Chatroom-username-name">Lucia</p>
          </div>
      </div>
    </div>
  )
}
