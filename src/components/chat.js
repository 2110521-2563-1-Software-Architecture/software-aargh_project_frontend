import React from "react";
import "./../style/chat.css";
import Drawer from "./drawer";
import ChatMessages from "./chat-messages";

import { Button, TextField } from "@material-ui/core";

import axios from "axios";
import backend from "../ip";

import firebase from 'firebase';

// MOCK DATA
const CID = "5facdb7e129c05000ed5b5b9";
const USER = 'Yinza55+';
const GROUP = 'Group 1';
const MESSAGE = [{ user: 'me', message: 'Hello' }];
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYWNkNzg1MTI5YzA1MDAwZWQ1YjViOCIsImlhdCI6MTYwNTE4ODc5MH0.3bb5DdqOCrxmhqfi5LskaB364xIBFGH2J4sUeNNwcwY";

// import openSocket from "socket.io-client";
// const socket = openSocket('http://edfb4850.ngrok.io/');

const firebaseConfig = {
  apiKey: "AIzaSyBISweht8fYIVVhM3WqwfZQ_5fDZW-SGVU",
  authDomain: "web-test-6b88c.firebaseapp.com",
  databaseURL: "https://web-test-6b88c.firebaseio.com",
  projectId: "web-test-6b88c",
  storageBucket: "web-test-6b88c.appspot.com",
  messagingSenderId: "233711291286",
  appId: "1:233711291286:web:9741997a6767a49f"
};
firebase.initializeApp(firebaseConfig);

class Chat extends React.Component {
  state = {
    my_groups: [],
    cid: CID,
    user: USER,
    group: GROUP,
    currentMessage: "",
    messages: MESSAGE,
    image_url: "",
    currentPhotoFile: null,
    isLoading: false,
    token: TOKEN
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

  render() {
    return (
      <div className="chat">
        <Drawer
          my_groups={this.state.my_groups}
          onGetMessages={this.onGetMessages}
          user={this.state.user}
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
              user={this.state.user}
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
