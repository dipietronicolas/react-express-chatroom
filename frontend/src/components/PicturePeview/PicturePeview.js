import React, { useState, useEffect, useContext } from 'react';
import { PictureTag } from '../PictureTag/PictureTag';
import { SocketContext } from '../../context/SocketContext';
import './PicturePeview.css';

export const PicturePeview = ({ picture, type, handleSetPicture }) => {

  const { sendPicture } = useContext(SocketContext);
  const [picURL, setPicURL] = useState(null);
  const [picType, setPicType] = useState(null);
  // eslint-disable-next-line
  const [acceptButtonFunction, setAcceptButtonFunction] = useState(null);

  // Genero una url de la imagen que llega para insertar en <img>
  useEffect(() => {
    const urlCreator = window.URL || window.webkitURL;
    const imageUrl = urlCreator.createObjectURL(picture);
    setPicURL(imageUrl);
    setPicType(type);
  }, [picture])

  // Envio la imagen al SocketContext que la envia al servidor
  // eslint-disable-next-line
  const handleSendPicture = () => {
    if (picURL) {
      sendPicture({
        picture,
        type
      });
      handleSetPicture(null);
      const button = document.querySelector('.SendPicture-upload-button');
      button.style.color = "rgb(150,150,150)";
    }
  }



  return (
    <div className="PicturePreview-container">
      <h2 className="PicturePreview-title">Click to draw a square and tag people</h2>
      {
        picture &&
        <PictureTag
          handleSendPicture={handleSendPicture}
          picURL={picURL}
          picType={picType} />

      }
      {/** 
      <div className="PicturePreview-buttons-container">
        <button
          className="PicturePreview-button PicturePreview-accept">
          <i className="fas fa-check"></i>
          <p className="PicturePreview-send-button-text PicturePreview-accept">Accept tag</p>
        </button>
        <button
          className="PicturePreview-button PicturePreview-delete">
          <i className="far fa-times-circle"></i>
          <p className="PicturePreview-send-button-text PicturePreview-delete">Delete last tag</p>
        </button>
        <button
          onClick={handleSendPicture}
          className="PicturePreview-button PicturePreview-send">
          <i className="fas fa-file-import"></i>
          <p className="PicturePreview-send-button-text PicturePreview-send">Send picture</p>
        </button>
      </div>
      */}
    </div>
  )
}
