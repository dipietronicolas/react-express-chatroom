import React from 'react';
import './InputContainer.css';

export const InputContainer = () => {

  
  return (
    <div className="Chatroom-input-container">
      <input className="Chatroom-input" type="text" max="50" name="message" autoFocus />
      <button className="Chatroom-send-btn">Send</button>
    </div>
  )
}
