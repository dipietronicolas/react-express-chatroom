import React, { useState, useRef } from 'react';
import './SendPicture.css';

export const SendPicture = ({ handleSetPicture }) => {

  const pictureRef = useRef(null);
  const [errMsg, setErrMsg] = useState(null);
  const handleFileUpload = () => {
    pictureRef.current.click();
  }

  // Llevo la imagen por props al componente padre
  const handleChange = (e) => {
    //console.log(e.target.files[0]);
    if (e.target.files[0] && e.target.files[0].size < 999999) {
      let picture = e.target.files[0];
      
      // Obtengo height y width de la imagen.
      let _URL = window.URL || window.webkitURL;
      let img = new Image();
      img.src = _URL.createObjectURL(e.target.files[0]);
      img.onload = function () {
        if (this.height > this.width) {
          handleSetPicture({
            picture,
            type: 'higher'
          });
        } else {
          handleSetPicture({
            picture,
            type: 'wider'
          });
        }
      };
      img.onerror = function () {
        alert("not a valid file");
      };
      //Termino el manejo de la imagen

      const button = document.querySelector('.SendPicture-upload-button');
      button.style.color = "green";
    } else {
      // Si la imagen es mayor a 1 mega no la sube y muestra un error.
      setErrMsg("Image max size must be 1 MB");
      setTimeout(() => {
        const alert = document.querySelector('.alert-err');
        alert.style.opacity = 0;
        setTimeout(() => {
          setErrMsg(null);
        }, 500)
      }, 7000)
    }
    pictureRef.current.value = null;
  };

  return (
    <div className="SendPictureContainer">
      <input
        ref={pictureRef}
        type="file"
        accept="image/*"
        className="SendPicture-upload"
        onChange={handleChange}
        style={{ display: "none" }}>
      </input>

      <button
        onClick={handleFileUpload}
        className="SendPicture-upload-button">
        <i className="fas fa-image"></i>
        <p className="SendPicture-upload-text">Upload picture</p>

      </button>
      {
        errMsg && <div className="alert-err">{errMsg}</div>
      }
    </div>
  )
}
