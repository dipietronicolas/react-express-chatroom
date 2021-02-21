import React, { useRef } from 'react';
import './InputContainer.css';

export const InputContainer = ({ handleInputContainer }) => {

  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleInputContainer(inputRef.current.value);
    inputRef.current.value = '';
  }

  return (
    <div className="Chatroom-input-container">
      
      <form className="Chatroom-form" onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          className="Chatroom-input"
          type="text"
          max="80"
          min="1"
          name="message"
          autoFocus />
        <button
          className="Chatroom-send-btn">Send</button>
      </form>
    </div>
  )
}
