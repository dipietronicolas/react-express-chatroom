import React, { useState, useContext, useRef } from 'react';
import { UserContext } from '../../context/UserContext';
import { SocketContext } from '../../context/SocketContext';
// CSS
import './UserProfile.css';
// Font Awesome
import '@fortawesome/fontawesome-free/js/all.js';

export const UserProfile = () => {

  const inputRef = useRef(null);
  const { username, addUsername } = useContext(UserContext);
  const { updateUser } = useContext(SocketContext);
  const [showEditName, setShowEditName] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');


  const changeUsername = (e) => {
    e.preventDefault();
    if (inputRef.current.value) {
      addUsername(inputRef.current.value, (callback) => {
        if (callback) {
          updateUser(inputRef.current.value);
        } else {
          setErrorMsg('Username not available')
        }
      });
      handleCancelButton();
    }
  }

  const handleEditName = () => {
    setErrorMsg(null);
    setShowEditName(true);
    const edit_button = document.querySelector('.UserProfile-edit-button');
    edit_button.style.display = "none";
  }

  const handleCancelButton = () => {
    setShowEditName(false);
    const edit_button = document.querySelector('.UserProfile-edit-button');
    edit_button.style.display = "block";
  }

  return (
    <div className="UserProfile-container">
      <div className="UserProfile">
        <div className="UserProfile-username-container">
          <div className="UserProfile-img-container">
            <i className="far fa-user-circle"></i>
          </div>
          <div className="UserProfile-edit">
            {
              showEditName
                ?
                <div className="UserProfile-editInputContainer">
                  <form onSubmit={changeUsername}>
                    <input
                      className="UserProfile-edit-input"
                      type="text"
                      ref={inputRef}
                      maxLength="30"
                      minLength="2"
                      autoFocus>
                    </input>
                    <button
                      className="UserProfile-edit-input-button">
                      <i className="fas fa-check"></i>
                    </button>
                  </form>
                  <button
                    onClick={handleCancelButton}
                    className="UserProfile-edit-input-cancel-button">
                    <i className="fas fa-times"></i>
                  </button>
                </div>
                :
                <p className="UserProfile-username">{username}</p>

            }
            <button
              className="UserProfile-edit-button"
              onClick={handleEditName}>
              <i className="fas fa-edit"></i>
            </button>
          </div>
        </div>
        {
          errorMsg && <div className="alert">{errorMsg}</div>
        }

      </div>
    </div>
  )
}
