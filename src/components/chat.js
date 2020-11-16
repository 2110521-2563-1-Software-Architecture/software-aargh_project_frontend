import React, { useEffect, useState } from "react";
import "./../style/chat.css";
import Drawer from "./drawer";
import ChatMessages from "./chat-messages";
import { useLocation, withRouter } from "react-router-dom";

import { Button, TextField } from "@material-ui/core";

import axios from "axios";
import backend from "../ip";
import _ from 'lodash';

const Chat = ({ history, handleLogout,db }) => {
  const location = useLocation();
  const token = JSON.parse(localStorage.getItem('token'));
  const [currentMessage, setCurrentMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [all_users,setAllUsers] = useState([]);

  const getAllUsers = async () => { 
    let config = {
      headers: {
        'Authorization': `Bearer ${token}`
      } 
    }
    console.log('GID',location.state.group_id)

    const response = await axios.post(
       backend +'/chat/detail',{id: location.state.group_id},config
    ); 
    return response.data
  }

  const onSendMessage = async () => {
    const response = await axios.post(backend + "/message/send", {
      cid: location.state.group_id,
      content: currentMessage,
      type: "TEXT"
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.data === "sent") {
      console.log("send message");
      setCurrentMessage("");
    } else {
      console.log("ERROR");
    }
  };

  const uploadPhoto = (currentPhotoFile) => {
    if (currentPhotoFile) {
      const uploadTask = db
        .storage().ref(currentPhotoFile.name)
        .put(currentPhotoFile)

        uploadTask.on(
            'state_changed',
            null,
            err => {
              console.log(err.message);
            },
            () => {
              uploadTask.snapshot.ref.getDownloadURL().then(url => {
                onSendImage(url);
              })
            }
        )
    } else {
      console.log('File is null');
    }
  }

  const onChoosePhoto = event => {
    if (event.target.files && event.target.files[0]) {
        // Check this file is an image?
        const prefixFiletype = event.target.files[0].type.toString();
        if (prefixFiletype.indexOf('image/') === 0) {
          uploadPhoto(event.target.files[0]);
        } else {
          console.log('This file is not an image');
        }
    } else {
      console.log('Choose file error')
    }
  }

  const onSendImage = async (url) => {
    try {
      const response = await axios.post(backend + "/message/send", {
        cid: location.state.group_id,
        content: url,
        type: "IMAGE"
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.data) {
        console.log(response.data);
        console.log("sent image");
        onGetMessages();
      } else {
        console.log("error");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onTextFiledPressEnter = (e) => {
    if (e.keyCode === 13) {
      onSendMessage();
    }
  };

  const onGetMessages = async () => {
    var app = db.database().ref('message/'+location.state.group_id);
    app.on('value', snapshot => {
        getData(snapshot.val());
      });
    var  all_users = await getAllUsers();
    setAllUsers(all_users)
  };

  const getData = (values) => {
    let messagesVal = values;
    let msg = _(messagesVal)
                    .keys()
                    .map(messageKey => {
                      let cloned = _.clone(messagesVal[messageKey]);
                      cloned.key = messageKey;
                      return cloned;
                    }).value();
    if (msg.length!=0){
      var users_id = []
      var all_msg = []
      {msg.map((m) => {
        all_msg.push(m)
        users_id.push(m.uid)
      })}
      setMessages(all_msg)
    } else {
      console.log("NO MESSAGE")
      setMessages([])
    }
  };

  return (
    <div className="chat">
      <Drawer
        user={location.state.username}
        handleLogout={(token) => handleLogout(token)}
        onGetMessages={onGetMessages}
        db={db}
      ></Drawer>
      <div className="chat-panel">
        {location.state.group_name ?   
          <div
            className="chat-group-name" 
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              padding: "16px 16px",
              fontSize: "18px"
            }}
          >
            {location.state.group_name.toUpperCase()}
          </div>
          : <div/>
        }
        <div
          className="chat-content"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <ChatMessages
            messages={messages}
            user={location.state.username}
            all_users = {all_users}
          ></ChatMessages>
        </div>
        <div className="message-box">
          <TextField
            variant="outlined"
            size="small"
            placeholder="Type your message"
            fullWidth="true"
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyDown={onTextFiledPressEnter}
          ></TextField>
          <Button onClick={() => onSendMessage()}>Send</Button>
        </div>
        <input 
          accept="image/*"
          className="viewInputGallery"
          type="file"
          onChange = {onChoosePhoto}
        />
      </div>
    </div>
  );
};

export default withRouter(Chat);