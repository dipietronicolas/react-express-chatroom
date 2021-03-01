import React, { useContext } from 'react';
import { SocketContext } from '../../context/SocketContext';
import './UsernameList.css';
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  root: {
    padding:0,
    width: '100%',
    maxWidth: 360,
  },
}));

export const UsernameList = () => {

  const classes = useStyles();
  const { usernames } = useContext(SocketContext);

  return (
    <div className="Chatroom-username-container">
      <div className="Chatroom-username">
        <p className="Chatroom-username-title">Users list</p>

        <List component="nav" className={classes.root} aria-label="mailbox folders">
          {
            usernames.length > 0 &&
            usernames.map((username, index) => {
              return (
                <ListItem button key={index}>
                  <i className="fas fa-user-circle Chatroom-username-icon"></i>
                  <ListItemText primary={username} />
                  <Divider />
                </ListItem>
              )
            })
          }
        </List>

        {/** 
        <div className="Chatroom-username-list">
          {
            usernames.length > 0 &&
            usernames.map((username, index) => {
              return (
                <p key={index} className="Chatroom-username-name">
                  <i className="fas fa-user-circle Chatroom-username-icon"></i>
                  {username}
                </p>
              )
            })
          }
        </div>
        */}
      </div>
    </div>
  )
}
