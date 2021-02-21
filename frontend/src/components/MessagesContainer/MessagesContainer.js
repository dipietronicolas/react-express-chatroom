import React, { useContext } from 'react';
import { SendPicture } from '../SendPicture/SendPicture';
import { InputContainer } from '../InputContainer/InputContainer';
import { SocketContext } from '../../context/SocketContext';
import { Scrollbars } from 'react-custom-scrollbars';
import './MessagesContainer.css';


export const MessagesContainer = () => {

  const { sendMessage, chatHistory } = useContext(SocketContext);

  const handleInputContainer = (message) => {
    sendMessage(message);
  }


  const handleScroll = (e) => {
    if (e) {
      e.scrollToBottom();
    }
  }

  const showProfileSettings = () => {
    const user_profile = document.querySelector('.UserProfile-container');
    user_profile.classList.toggle('UserProfile-show');
    if(!user_profile.classList.contains('UserProfile-show')){
      document.querySelector('.Chatroom-input').focus();
    }
  }
  
  return (
    <div className="Chatroom-message">

      <button 
        onClick={showProfileSettings}
        className="Userprofile-show-button">Settings</button>

      <div className="Chatroom-chat">
        <Scrollbars ref={(handleScroll)}>
          {
            chatHistory.map((data, index) => {
              return (
                <div
                  key={index}
                  className="Chatroom-chat-name-message">
                  <div
                    className="Chatroom-chat-name-container"
                    style={{ color: data.color }}>{data.username}</div>
                  <div className="Chatroom-chat-message-container">{data.msg}</div>
                </div>
              )
            })
          }
        </Scrollbars>
      </div>
      <SendPicture />
      <InputContainer handleInputContainer={handleInputContainer} />
    </div>
  )
}
