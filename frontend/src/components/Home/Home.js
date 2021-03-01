import React, { useState, useContext, useRef } from 'react';
import { UserContext } from '../../context/UserContext';
import { SocketContext } from '../../context/SocketContext';
// CSS
import './Home.css';

export const Home = () => {

  const { addUsername } = useContext(UserContext);
  const { newUser } = useContext(SocketContext);
  const [errorMsg, setErrorMsg] = useState(null);


  let inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(inputRef.current.value){
      addUsername(inputRef.current.value, (callback) => {
        if (callback) {
          newUser(inputRef.current.value);
        } else {
          setErrorMsg('Username not available')
        }
      })
    }
  }
  
  return (
    <div className="Home">
      <form className="Home-form" onSubmit={handleSubmit}>
        <div className="Home-title-coontainer">
          <h2>WELLCOME TO FANTASTIC CHAT!</h2>
          <p>Type your username</p>

        </div>
        {
          errorMsg && <div className="alert-error">{errorMsg}</div>
        }
        <input
          ref={inputRef}
          name="username"
          className="Home-input"
          type="text"
          maxLength="30"
          minLength="2"
          autoFocus />
        <button
          className="Home-submit-button"
          type="submit">CONFIRM</button>
      </form>
    </div>
  )
}
