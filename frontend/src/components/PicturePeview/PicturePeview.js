import React, { useState, useEffect, useContext } from 'react';
import { PictureTag } from '../PictureTag/PictureTag';
import { SocketContext } from '../../context/SocketContext';
import './PicturePeview.css';

export const PicturePeview = ({ picture, setPicture, type, handleSetPicture }) => {

  const { sendPicture } = useContext(SocketContext);
  const [picURL, setPicURL] = useState(null);
  const [picType, setPicType] = useState(null);
  const [coordinates, setCoordinates] = useState([]);

  // Genero una url de la imagen que llega para insertar en <img>
  useEffect(() => {
    const urlCreator = window.URL || window.webkitURL;
    const imageUrl = urlCreator.createObjectURL(picture);
    setPicURL(imageUrl);
    setPicType(type);
  }, [picture])

  // Envio la imagen al SocketContext que la envia al servidor
  const handleSendPicture = () => {
    if (picURL) {
      sendPicture({
        picture,
        type,
        coordinates
      });
      handleSetPicture(null);
      const button = document.querySelector('.SendPicture-upload-button');
      button.style.color = "rgb(150,150,150)";
    }
  }

  // Efecto de brillo en el titulo
  useEffect(() => {
    const title = document.querySelector('.PicturePreview-title');
    setTimeout(() => {
      title.style.textShadow = "0px 0px 25px white";
      title.style.height = "5.5rem";
    }, 2500);
    setTimeout(() => {
      title.style.height = "5rem";
      title.style.marginBottom = "3rem";
      title.style.textShadow = "none";
    }, 3000)
  }, [])

  // Close button handler
  const handleCloseButton = () => {
    setPicture(null);
  }

  return (
    <div className="PicturePreview-container">
      <h2 className="PicturePreview-title">Make a selection on the image to add a tag!</h2>
      <button 
        className="PicturePreview-close-button"
        onClick={handleCloseButton}>
        <i className="fas fa-times"></i>
      </button>
      {
        picture &&
        <PictureTag
          handleSendPicture={handleSendPicture}
          picURL={picURL}
          picType={picType} 
          coordinates={coordinates}
          setCoordinates={setCoordinates} />
      } 
    </div>
  )
}
