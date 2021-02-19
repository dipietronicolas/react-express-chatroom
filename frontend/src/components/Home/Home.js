import React from 'react';
import { InputContainer } from '../InputContainer/InputContainer';
import './Home.css';

export const Home = () => {
    return (
        <div className="Home">
            <form className="Home-form">
                <h3>WELLCOME TO FANTASTIC CHAT!</h3>
                <p>Type your username</p>
                <InputContainer />
                
            </form>
        </div>
    )
}
