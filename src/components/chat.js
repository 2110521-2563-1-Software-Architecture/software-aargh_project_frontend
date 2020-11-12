import React from "react";
import "./../style/chat.css";
import Drawer from "./drawer";
import ChatMessages from "./chat-messages";

import { Button, TextField } from "@material-ui/core";

import axios from "axios";
import backend from "../ip";

// MOCK DATA from get message
const CID = "5fad2eccbd84bb000e50cfc3";
const USER = 'Yinza55+';
const GROUP = 'Group 1';
const MESSAGE = [{ user: 'me', message: 'Hello' }];
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYWNkNDMwMTI5YzA1MDAwZWQ1YjViNyIsImlhdCI6MTYwNTE4NjQwNH0.FTf74zzgeqdWe9Y3Q9mU3yRKISymxset1ywsv1SzDUI";

class Chat extends React.Component {
  state = {
    my_groups: [],
    cid: CID,
    user: USER,
    group: GROUP,
    currentMessage: "",
    messages: MESSAGE,
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
        </div>
      </div>
    );
  }
}

export default Chat;
