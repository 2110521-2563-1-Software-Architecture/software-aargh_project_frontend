import React from "react";
import "./../style/chat.css";
import Drawer from "./drawer";
import ChatMessages from "./chat-messages";

import { Button, TextField } from "@material-ui/core";

import axios from "axios";
import backend from "../ip";

import firebase from 'firebase';
import _ from 'lodash';

// MOCK DATA
const CID = "5facdb7e129c05000ed5b5b9";
const USER = 'Yinza55+';
const GROUP = 'Group 1';
const MESSAGE = [{ user: 'me', message: 'Hello' }];
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYWNkNzg1MTI5YzA1MDAwZWQ1YjViOCIsImlhdCI6MTYwNTE4ODc5MH0.3bb5DdqOCrxmhqfi5LskaB364xIBFGH2J4sUeNNwcwY";

// import openSocket from "socket.io-client";
// const socket = openSocket('http://edfb4850.ngrok.io/');

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};
firebase.initializeApp(firebaseConfig);

class Chat extends React.Component {
  constructor(props){
    super(props);
  this.state = {
    my_groups: [],
    cid: CID,
    user: USER,
    group: GROUP,
    currentMessage: "",
    messages: [],
    image_url: "",
    currentPhotoFile: null,
    isLoading: false,
    token: TOKEN,
    users: []
  }
  let db = firebase
  let app = db.database().ref('message/'+this.state.cid);
    app.on('value', snapshot => {
      this.getData(snapshot.val());
    });
  }

  componentDidMount() {
    try {
      console.log("componentDidMount");
      // socket.emit("fetchMessages", "hello");
      // socket.on("all messages", (data) => {
      //   this.setState({ messages: data });
      // });
      // socket.emit("getGroupUpdates", this.props.location.state.user);
      // socket.on("groupinfo", (data) => {
      //   this.setState({
      //     available_groups: data.group,
      //     my_groups: data.joinedGroup,
      //     user: this.props.location.state.user,
      //     group: this.props.location.state.group,
      //   });
      // });
    } catch (e) {
      console.log(e);
    }
  }

  onSendMessage = async () => {
    const { cid, currentMessage, token } = this.state;

    // TODO: uncomment and check after POST is connected
    const response = await axios.post(backend + "/message/send", {
      cid: cid,
      content: currentMessage,
      type: "TEXT"
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.data === "sent") {
      console.log("send message");
      this.setState({ currentMessage: "" });
    } else {
      console.log("ERROR");
    }

  };

  onChoosePhoto = event => {
    if (event.target.files && event.target.files[0]) {
        this.setState({isLoading: true})
        this.currentPhotoFile = event.target.files[0]
        // Check this file is an image?
        const prefixFiletype = event.target.files[0].type.toString()
        if (prefixFiletype.indexOf('image/') === 0) {
            this.uploadPhoto()
            // console.log(this.currentPhotoFile.name)
        } else {
            this.setState({isLoading: false})
            console.log('This file is not an image')
        }
    } else {
        this.setState({isLoading: false})
    }
}

uploadPhoto = () => {
  if (this.currentPhotoFile) {

    const uploadTask = firebase
      .storage().ref(this.currentPhotoFile.name)
      .put(this.currentPhotoFile)

      uploadTask.on(
          'state_changed',
          null,
          err => {
              this.setState({isLoading: false})
              console.log(err.message)
          },
          () => {
              uploadTask.snapshot.ref.getDownloadURL().then(url => {
                this.setState({isLoading: false, image_url:url})
                this.onSendImage()
                // console.log(this.state)
              })
          }
      )
  } else {
      this.setState({isLoading: false})
      console.log('File is null')
  }
}

  onSendImage = async () => {
    const { cid, image_url, token } = this.state;
    const response = await axios.post(backend + "/message/send", {
      cid: cid,
      content: image_url,
      type: "IMAGE"
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    //const { success, message } = response.data;
    if (response.data === "sent") {
      console.log("sent");
    } else {
      // this.setState({ error: message });
      console.log("error")
    }
  };

  onTextFiledPressEnter = (e) => {
    if (e.keyCode === 13) {
      this.onSendMessage();
    }
  };

  onGetMessages = (groupName) => {
    console.log("fetch message:" + groupName);
    // socket.emit("join", { group: groupName, member: this.state.user });
    // socket.on("all messages", (data) => {
    //   this.setState({ messages: data });
    //   console.log(this.state.messages);
    // });
    this.setState({ group: groupName });
  };

  getData(values){
    let messagesVal = values;
    let messages = _(messagesVal)
                    .keys()
                    .map(messageKey => {
                      let cloned = _.clone(messagesVal[messageKey]);
                      cloned.key = messageKey;
                      return cloned;
                    }).value();
    //console.log(messages)
    var users_id = []
    {messages.map((message) => {
      users_id.push(message.uid)
    })}
    this.setState({
      messages: messages,
      users: users_id
    });
    console.log(this.state.messages)
    //console.log(this.state.users)
  }

  render() {
    return (
      <div className="chat">
        <Drawer
          // my_groups={this.state.my_groups}
          // onGetMessages={this.onGetMessages}
          // user={this.state.user}
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
            {this.state.group.toUpperCase()}
          </div>
          <div
            className="chat-content"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <ChatMessages
              // messages={this.state.messages[this.state.group]}
              // user={this.props.location.state.user}
              messages={this.state.messages}
              user={this.state.user}q
              group={this.state.group}
            ></ChatMessages>
          </div>
          <div className="message-box">
            <TextField
              variant="outlined"
              size="small"
              placeholder="Type your message"
              fullWidth="true"
              value={this.state.currentMessage}
              onChange={(e) => {
                this.setState({ currentMessage: e.target.value });
              }}
              onKeyDown={this.onTextFiledPressEnter}
            ></TextField>
            <Button onClick={this.onSendMessage}>Send</Button>
          </div>
          <input ref={el => { this.refInput = el }}
            accept="image/*"
            className="viewInputGallery"
            type="file"
            onChange={this.onChoosePhoto}
          />
        </div>
      </div>
    );
  }
}

export default Chat;
