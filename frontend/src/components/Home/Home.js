import React, { useState, useContext, useRef } from 'react';
import { UserContext } from '../../context/UserContext';
import { SocketContext } from '../../context/SocketContext';
import './Home.css';

export const Home = () => {

  const { addUsername } = useContext(UserContext);
  const { newUser } = useContext(SocketContext);
  const [errorMsg, setErrorMsg] = useState(null);
 
  let inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    addUsername(inputRef.current.value, (callback) => {
      if(callback){
        newUser(inputRef.current.value);
      } else {
        setErrorMsg('El nombre de usuario no se encuentra disponible')
      }
    })
  }

  return (
    <div className="Home">
      <form className="Home-form" onSubmit={handleSubmit}>
        <h3>WELLCOME TO FANTASTIC CHAT!</h3>
        <p>Type your username</p>
        {
          errorMsg && <div className="alert-error">{errorMsg}</div>
        }
        <input
          ref={inputRef}
          name="username"
          className="Home-input"
          type="text"
          max="20"
          min="3"
          autoFocus/>
        <button
          className="Home-submit-button"
          type="submit">CONFIRM</button>
      </form>
    </div>
  )
}
