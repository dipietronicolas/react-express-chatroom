import React, { useState, useEffect } from 'react';
import './PictureTag.css';

export const PictureTag = ({ handleSendPicture, picURL, picType, coordinates, setCoordinates }) => {

  const [fondo, setFondo] = useState(null);
  const [x_firstPosition, setX_firstPosition] = useState(0);
  const [y_firstPosition, setY_firstPosition] = useState(0);
  const [x_secondPosition, setX_secondPosition] = useState(0);
  const [y_secondPosition, setY_secondPosition] = useState(0);
  const [box_width, setBox_width] = useState(0);
  const [box_height, setBox_height] = useState(0);
  const [box_amount, setBox_amount] = useState(0);
  const [selection_flag, setSelection_flag] = useState(true);
  const [startRenderSquare, setStartRenderSquare] = useState(false);

  useEffect(() => {
    console.log('re-render');
    console.log(box_amount);
    console.log(selection_flag);
  })

  useEffect(() => {
    setFondo(document.querySelector('.selection-container'));
  }, [])

  const mouseDownListener = (e) => {
    if (selection_flag) {
      console.log("mousedown");
      console.log(e);
      setX_firstPosition(e.nativeEvent.layerX);
      setY_firstPosition(e.nativeEvent.layerY);
      setBox_width(e.target.clientWidth);
      setBox_height(e.target.clientHeight);
      setStartRenderSquare(true);
    }
  }

  const mouseUpListener = (e) => {
    console.log("mouseUp");
    setStartRenderSquare(false);
    if ((document.querySelector('.test')) && (selection_flag === true)) {
      tagSelection();
    }
  }

  const tagSelection = () => {
    console.log("tagSelection");
    const div = document.getElementById(`selection#0${box_amount + 1}`);
    if (div) {
      // contenedor input + boton de confirmacion 
      let inputContainer = document.createElement('div');
      inputContainer.classList.add('tag-input-container');

      // Creo el boton de confirmacion
      let confirmButton = document.createElement('button');
      confirmButton.classList.add('tag-confirm-button');
      confirmButton.id = `confirm#0${box_amount + 1}`
      confirmButton.innerHTML = '<i class="fas fa-check"></i>';
      confirmButton.onclick = () => acceptButtonHandler();

      // Creo el input para el nombre del tag
      let input = document.createElement('input');
      input.type = "text";
      input.autofocus = true;
      input.classList.add('tag-input');
      input.id = `input#0${box_amount + 1}`;
      input.maxLength = '15';

      div.classList.add('test-with-tag');
      inputContainer.appendChild(input);
      inputContainer.appendChild(confirmButton);
      div.appendChild(inputContainer);
      setBox_amount(box_amount + 1);
      setSelection_flag(false);
    }
  }

  const acceptButtonHandler = () => {
    let input = document.getElementById(`input#0${box_amount + 1}`);
    if (input) {
      input.classList.add('test-finished');
    }
    setSelection_flag(true);
    
    // Envio las coordenadas de la seleccion para ser enviadas al socket
    const square = document.getElementById(`selection#0${box_amount + 1}`);
    const selection = {
      top: square.style.top,
      left: square.style.left,
      right: square.style.right,
      bottom: square.style.bottom,
      height: square.style.height,
      width: square.style.width,
      tag: input.value
    }
    setCoordinates([
      ...coordinates,
      selection
    ])
  }

  const deleteButtonHandler = () => {
    const square = document.getElementById(`selection#0${box_amount}`);
    if (square) {
      square.remove();
    }
    if (box_amount > 0) {
      setBox_amount(box_amount - 1);
    }
    setSelection_flag(true);
    let new_coordinates = [...coordinates];
    new_coordinates.pop();
    setCoordinates(new_coordinates);
  }

  const renderSquare = (e) => {
    if ((startRenderSquare) && (e.target.className === 'selection-container')) {
      
      setX_secondPosition(e.nativeEvent.layerX);
      setY_secondPosition(e.nativeEvent.layerY);

      const square = document.getElementById(`selection#0${box_amount + 1}`);
      if (square) {
        square.remove();
      }

      let div = document.createElement('div');
      div.classList.add('test');
      div.id = `selection#0${box_amount + 1}`;

      if ((x_secondPosition - x_firstPosition >= 0) && (y_secondPosition - y_firstPosition >= 0)) {
        const ladoX = x_secondPosition - x_firstPosition;
        const ladoY = y_secondPosition - y_firstPosition;
        div.style.height = `${ladoY}px`;
        div.style.width = `${ladoX}px`;
        div.style.top = `${y_firstPosition}px`;
        div.style.left = `${x_firstPosition}px`;
        console.log(`
          recA
          ladoX = ${ladoX}
          ladoY = ${ladoY}
        `);
      } else if ((x_secondPosition - x_firstPosition <= 0) && (y_secondPosition - y_firstPosition >= 0)) {
        const ladoX = x_firstPosition - x_secondPosition;
        const ladoY = y_secondPosition - y_firstPosition;
        div.style.height = `${ladoY}px`;
        div.style.width = `${ladoX}px`;
        div.style.top = `${y_firstPosition}px`;
        div.style.right = `${box_width - x_firstPosition}px`;
        console.log(`
          recB
          ladoX = ${ladoX}
          ladoY = ${ladoY}
        `);
      } else if ((x_secondPosition - x_firstPosition >= 0) && (y_firstPosition - y_secondPosition >= 0)) {
        const ladoX = x_secondPosition - x_firstPosition;
        const ladoY = y_firstPosition - y_secondPosition;
        div.style.height = `${ladoY}px`;
        div.style.width = `${ladoX}px`;
        div.style.bottom = `${box_height - y_firstPosition}px`;
        div.style.left = `${x_firstPosition}px`;
        console.log(`
          recC
          ladoX = ${ladoX}
          ladoY = ${ladoY}
        `);
      } else if ((x_secondPosition - x_firstPosition <= 0) && (y_firstPosition - y_secondPosition >= 0)) {
        const ladoX = x_firstPosition - x_secondPosition;
        const ladoY = y_firstPosition - y_secondPosition;
        div.style.height = `${ladoY}px`;
        div.style.width = `${ladoX}px`;
        div.style.bottom = `${box_height - y_firstPosition}px`;
        div.style.right = `${box_width - x_firstPosition}px`;
        console.log(`
          recD
          ladoX = ${ladoX}
          ladoY = ${ladoY}
        `);
      }
      fondo.appendChild(div);

    } else if (startRenderSquare) {
      const square = document.getElementById(`selection#0${box_amount + 1}`);
      if (square) {
        square.remove();
      }
    }
  }

  useEffect(()=> {
    if(box_amount > 0){
      for (let i = box_amount; i > 0; i--){
        let square = document.getElementById(`selection#0${i}`);
        if (square) {
          square.remove();
        }
      }
      setBox_amount(0);
    }
  }, [picURL])

  return (
    <>
      <div className="PictureTag">
        <img
          src={picURL}
          alt="picPreview"
          className={picType === 'higher' ? 'PicturePreview-img-typeA' : 'PicturePreview-img-typeB'} />
        <div
          onMouseDown={mouseDownListener}
          onMouseMove={renderSquare}
          onMouseUp={mouseUpListener}
          className="selection-container"></div>
      </div>
      <div className="PicturePreview-buttons-container">
        <button
          className="PicturePreview-button PicturePreview-delete"
          onClick={deleteButtonHandler}>
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
    </>
  )
}
