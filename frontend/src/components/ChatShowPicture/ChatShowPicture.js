import React, { useEffect } from 'react';
import './ChatShowPicture.css';

export const ChatShowPicture = ({ picture, setPicture }) => {

  useEffect(() => {
    let picturePreview = document.querySelector('.PicturePreview-container');
    let img = document.createElement('img');
    let coordinates = picture[2];
    img.src = picture[0];
    img.classList.add(
      picture[1] === 'higher' 
        ? 'PicturePreview-img-typeA' 
        : 'PicturePreview-img-typeB'
    )
    
    let selection_container = document.createElement('div');
    selection_container.classList.add('ChatShowPicture-selection-container');
    selection_container.appendChild(img);

    for (let i = 0; i < coordinates.length; i++) {
      let tag_container = document.createElement('div');
      let tag = document.createElement('input');
      tag.value = coordinates[i].tag;
      tag.classList.add('ChatShowPicture-tag');
      tag.disabled = true;
      tag_container.classList.add('ChatShowPicture-tag-container');
      tag_container.style.top = coordinates[i].top;
      tag_container.style.right = coordinates[i].right;
      tag_container.style.bottom = coordinates[i].bottom;
      tag_container.style.left = coordinates[i].left;
      tag_container.style.height = coordinates[i].height;
      tag_container.style.width = coordinates[i].width;
      tag_container.appendChild(tag);
      selection_container.appendChild(tag_container);
    }
    picturePreview.appendChild(selection_container);
    
  }, [])

  const handleCloseButton = () => {
    setPicture(null);
  }

  return (
    <div className="PicturePreview-container">
      <button 
        className="PicturePreview-close-button"
        onClick={handleCloseButton}>
        <i className="fas fa-times"></i>
      </button>
    </div>
  )
}
