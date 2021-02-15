import React from 'react';
import { UsernameList } from '../UsernameList/UsernameList';
import { MessagesContainer } from '../MessagesContainer/MessagesContainer';
import './ChatRoom.css';

export const ChatRoom = () => {
  return (
    <div className="Chatroom">
      <UsernameList />
      <MessagesContainer />
    </div>
  )
}
