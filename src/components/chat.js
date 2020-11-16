import React, { useEffect, useState } from "react";
import "./../style/chat.css";
import Drawer from "./drawer";
import ChatMessages from "./chat-messages";
import { useLocation, withRouter } from "react-router-dom";

import { Button, TextField } from "@material-ui/core";

import axios from "axios";
import backend from "../ip";
import _ from 'lodash';

// MOCK DATA
const MESSAGE = [{ user: 'me', message: 'Hello' }, { user: 'me', message: 'I\'m me' }];

const Chat = ({ history, handleLogout,db }) => {
  const location = useLocation();
  const token = JSON.parse(localStorage.getItem('token'));
  const [currentMessage, setCurrentMessage] = useState("");
  const [image_url, setImage_url] = useState("");
  const [currentPhotoFile, setCurrentPhotoFile] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);

  //[TODO] - recheck after get real group id
  const getAllUsers = async () => { 
    let config = {
      headers: {
        'Authorization': `Bearer ${token}`
      } 
    }
    const response = await axios.post(
       backend +'/chat/detail',{id: location.state.group_id},config
    ); 
    console.log('ALL USERS')
    console.log(response.data)
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

  const uploadPhoto = () => {
    console.log("from upload",currentPhotoFile)
    if (currentPhotoFile) {

      const uploadTask = db
        .storage().ref(currentPhotoFile.name)
        .put(currentPhotoFile)

        uploadTask.on(
            'state_changed',
            null,
            err => {
              setIsLoading(false);
              console.log(err.message);
            },
            () => {
              uploadTask.snapshot.ref.getDownloadURL().then(url => {
                setIsLoading(false);
                setImage_url(url);
                onSendImage();
              })
            }
        )
    } else {
      setIsLoading(false);
      console.log('File is null');
    }
  }

  const onChoosePhoto = event => {
    if (event.target.files && event.target.files[0]) {
        //console.log("event:",event.target.files[0])
        setIsLoading(true);
        setCurrentPhotoFile(event.target.files[0]);
        //[...picture, e.target.files[0]]
        // Check this file is an image?
        const prefixFiletype = event.target.files[0].type.toString();
        if (prefixFiletype.indexOf('image/') === 0) {
            uploadPhoto();
            // console.log(this.currentPhotoFile.name)
        } else {
            setIsLoading(false);
            console.log('This file is not an image');
        }
    } else {
      setIsLoading(false);
    }
  }

  const onSendImage = async () => {
    console.log("onSent");
    console.log(location.state.group_id)
    console.log({image_url, token})
    try {
      const response = await axios.post(backend + "/message/send", {
        cid: location.state.group_id,
        content: image_url,
        type: "IMAGE"
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log({response});
      if (response.data) {
        console.log(response.data);
        console.log("sent image");
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
    console.log("get realtime message");
    var app = db.database().ref('message/'+location.state.group_id);
    app.on('value', snapshot => {
        getData(snapshot.val());
      });
    getAllUsers();
    //setMessages(MESSAGE);
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
      console.log("msg!=0:",{msg})
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
    //console.log(this.state.users)
  };

  useEffect(() => {
    onGetMessages();
  }, []);

  useEffect(() => {
    uploadPhoto();
  }, [currentPhotoFile]);

  return (
    <div className="chat">
      <Drawer
        user={location.state.username}
        handleLogout={(token) => handleLogout(token)}
        db={db}
      ></Drawer>
      <div className="chat-panel">
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
        <div
          className="chat-content"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <ChatMessages
            messages={messages}
            user={location.state.username}
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
            onKeyDown={() => onTextFiledPressEnter()}
          ></TextField>
          <Button onClick={() => onSendMessage()}>Send</Button>
        </div>
        {/* what nrefInput for? */}
        <input 
          //ref={el => { refInput = el }}
          accept="image/*"
          className="viewInputGallery"
          type="file"
          //onChange={() => onChoosePhoto()}
          onChange = {onChoosePhoto}
        />
      </div>
    </div>
  );
};

export default withRouter(Chat);