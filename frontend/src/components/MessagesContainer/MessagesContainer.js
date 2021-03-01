import React, { useState, useContext, useEffect } from 'react';
import { SendPicture } from '../SendPicture/SendPicture';
import { InputContainer } from '../InputContainer/InputContainer';
import { SocketContext } from '../../context/SocketContext';
import { Scrollbars } from 'react-custom-scrollbars';
import { PicturePeview } from '../PicturePeview/PicturePeview';
import './MessagesContainer.css';


export const MessagesContainer = () => {

  const { sendMessage, message } = useContext(SocketContext);
  const [picture, setPicture] = useState(null);

  const handleSetPicture = (pic) => {
    setPicture(pic);
  }

  // Envio el mensaje que escribe el cliente al SocketContext
  // que se encarga de enviarlo al servidor.
  const handleInputContainer = (msg) => {
    sendMessage(msg);
  }

  // Posiciono el scroll abajo en cada mensaje enviado
  const handleScroll = (e) => {
    if (e) {
      setTimeout(() => {
        e.scrollToBottom();
      }, 50);
    }
  }

  // Manejo el boton Settings del modo tablet
  const showProfileSettings = () => {
    const user_profile = document.querySelector('.UserProfile-container');
    user_profile.classList.toggle('UserProfile-show');
    if (!user_profile.classList.contains('UserProfile-show')) {
      document.querySelector('.Chatroom-input').focus();
    }
  }

  //Convierte la imagen ArrayBuffer a img
  const arrayBufferToPic = ({ msg, type }) => {
    const arrayBufferView = new Uint8Array(msg);
    const blob = new Blob([arrayBufferView], { type: "image/jpeg" });
    const urlCreator = window.URL || window.webkitURL;
    const imageUrl = urlCreator.createObjectURL(blob);
    return `
      <img class=${type === "higher_picture"
        ? "Chatroom-chat-img-container-typeHigher"
        : "Chatroom-chat-img-container-typeWider"
      } 
        src=${imageUrl} alt="picsend"/>
    `;
  }

  // Renderiza los chats que llegan
  const renderChat = () => {
    if (message) {
      const chat = document.querySelector('.Chatroom-chat').firstChild.firstChild;
      if (message.type === "text") {
        chat.innerHTML += `
        <div class="Chatroom-chat-name-message">
          <div class="Chatroom-chat-name-container" style="color: ${message.color}">${message.username}</div>
          <div class="Chatroom-chat-message-container">${message.msg}</div>
        </div>
        `;
      } else {
        chat.innerHTML += `
        <div class="Chatroom-chat-name-message">
          <div class="Chatroom-chat-name-container" style="color: ${message.color}">${message.username}</div>
          ${arrayBufferToPic(message)}
        </div>
        `;
      }
    }
  }

  // Llama a la funcion que renderiza los mensajes cada vez que llegan
  useEffect(() => {
    renderChat();
  }, [message])

  return (
    <div className="Chatroom-message">
      <button
        onClick={showProfileSettings}
        className="Userprofile-show-button">Settings</button>

      <div className="Chatroom-chat">
        <Scrollbars
          ref={(handleScroll)}
          autoHide
          autoHideTimeout={1500}
          autoHideDuration={500}>

        </Scrollbars>
        {
          picture &&
          <PicturePeview
            picture={picture.picture}
            type={picture.type}
            handleSetPicture={handleSetPicture} />
        }
      </div>
      <SendPicture handleSetPicture={handleSetPicture} />
      <InputContainer handleInputContainer={handleInputContainer} />
    </div>
  )
}
