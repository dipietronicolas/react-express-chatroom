import React from 'react';
import { UsernameList } from '../UsernameList/UsernameList';
import { MessagesContainer } from '../MessagesContainer/MessagesContainer';
import { UserProfile } from '../UserProfile/UserProfile';
import './ChatRoom.css';

export const ChatRoom = () => {
  return (
    <div className="Chatroom">
      <UsernameList />
      <MessagesContainer />
      <UserProfile />
    </div>
  )
}
