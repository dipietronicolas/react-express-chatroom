import React, { useState, useContext, useRef } from 'react';
import { SocketContext } from '../../context/SocketContext';
import './SendPicture.css';

export const SendPicture = () => {

  const pictureRef = useRef(null);
  const { sendPicture } = useContext(SocketContext);
  const [picture, setPicture] = useState(null);
  

  const handleFileUpload = () => {
    pictureRef.current.click();
  }

  const handleChange = (e) => {
    if(e.target.files[0]){
      setPicture(e.target.files[0])
      const button = document.querySelector('.SendPicture-upload-button');
      button.style.color = "green";
    }
  };
  
  const handleSendPicture = () => {
    if(picture){
      sendPicture(picture);
      const button = document.querySelector('.SendPicture-upload-button');
      button.style.color = "rgb(150,150,150)";
    }
  }

  return (
    <div className="SendPictureContainer">
      <input 
        ref={pictureRef}
        type="file" 
        className="SendPicture-upload"
        onChange={handleChange}
        style={{ display: "none" }}>
      </input>
      <button 
        onClick={handleFileUpload}
        className="SendPicture-upload-button">
          <i className="fas fa-image"></i>
      </button>
      <button 
        onClick={handleSendPicture}
        className="SendPicture-send-button">
          <i className="fas fa-file-import"></i>
      </button>
      <p className="SendPicture-send-button-text">Enviar imagen</p>
    </div>
  )
}
