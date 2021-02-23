import React, { useRef } from 'react';
import './InputContainer.css';

export const InputContainer = ({ handleInputContainer }) => {

  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    inputRef.current.value &&
      handleInputContainer(inputRef.current.value);
    inputRef.current.value = '';
    document.querySelector('.Chatroom-input').focus();
  }

  return (
    <div className="Chatroom-input-container">
      <form className="Chatroom-form" onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          className="Chatroom-input"
          type="text"
          maxLength="80"
          minLength="1"
          name="message"
          autoFocus />
        <button
          className="Chatroom-send-btn">Send</button>
      </form>
    </div>
  )
}
