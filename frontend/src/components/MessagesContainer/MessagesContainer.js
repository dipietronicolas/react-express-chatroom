import React, { useState, useContext, useEffect } from 'react';
import { SendPicture } from '../SendPicture/SendPicture';
import { InputContainer } from '../InputContainer/InputContainer';
import { ChatShowPicture } from '../ChatShowPicture/ChatShowPicture';
import { PicturePeview } from '../PicturePeview/PicturePeview';
import { SocketContext } from '../../context/SocketContext';
import { Scrollbars } from 'react-custom-scrollbars';
import './MessagesContainer.css';


export const MessagesContainer = () => {

  const { sendMessage, message } = useContext(SocketContext);
  const [picture, setPicture] = useState(null);
  const [pictureClick, setPictureClick] = useState(null);
  

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
  const arrayBufferToPic = ({ msg, type, coordinates }) => {
    const arrayBufferView = new Uint8Array(msg);
    const blob = new Blob([arrayBufferView], { type: "image/jpeg" });
    const urlCreator = window.URL || window.webkitURL;
    const imageUrl = urlCreator.createObjectURL(blob);
    const img = document.createElement('img');
    img.classList.add(
      type === "higher_picture" 
        ? "Chatroom-chat-img-container-typeHigher" 
        : "Chatroom-chat-img-container-typeWider"
    );
    img.src = imageUrl;
    img.onclick = () => {
      setPictureClick([imageUrl, type, coordinates]);
    };
    return img;
  }

  // Renderiza los chats que llegan
  const renderChat = () => {
    if (message) {
      const chat = document.querySelector('.Chatroom-chat').firstChild.firstChild;
      let divContainer = document.createElement('div');
      divContainer.classList.add('Chatroom-chat-name-message');

      let divName = document.createElement('div');
      divName.classList.add('Chatroom-chat-name-container');
      divName.style.color = `${message.color}`
      divName.innerText = `${message.username}`;
      
      if (message.type === "text") {
        let divMessage = document.createElement('div');
        divMessage.classList.add('Chatroom-chat-message-container');
        divMessage.innerText = `${message.msg}`;

        divContainer.appendChild(divName);
        divContainer.appendChild(divMessage);
        //chat.appendChild(divContainer);
      } else {
        divContainer.appendChild(divName);
        divContainer.appendChild(arrayBufferToPic(message));
      }
      chat.appendChild(divContainer);
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
            setPicture={setPicture}
            type={picture.type}
            handleSetPicture={handleSetPicture} />
        }
        {
          pictureClick &&
            <ChatShowPicture 
              picture={pictureClick}
              setPicture={setPictureClick}/>
        }
      </div>
      <SendPicture handleSetPicture={handleSetPicture} />
      <InputContainer handleInputContainer={handleInputContainer} />
    </div>
  )
}
