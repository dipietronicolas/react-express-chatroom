import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { InputContainer } from '../InputContainer/InputContainer';
import './MessagesContainer.css';

export const MessagesContainer = () => {
  return (
    <div className="Chatroom-message">
      <div className="Chatroom-chat">
        <Scrollbars>
          <div className="Chatroom-chat-name-message">
            <div className="Chatroom-chat-name-container">Nico</div>
            <div className="Chatroom-chat-message-container">Hola! como va?</div>
          </div>
          <div className="Chatroom-chat-name-message">
            <div className="Chatroom-chat-name-container">Lucia</div>
            <div className="Chatroom-chat-message-container">Hola bomboncito</div>
          </div>
          <div className="Chatroom-chat-name-message">
            <div className="Chatroom-chat-name-container">Nico</div>
            <div className="Chatroom-chat-message-container">Jee</div>
          </div>
        </Scrollbars>
      </div>
      <InputContainer />
    </div>
  )
}
