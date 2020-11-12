import React from "react";
import "./../style/chat.css";
import Drawer from "./drawer";
import ChatMessages from "./chat-messages";
import { TimeGrayBox, UnreadGrayBox } from "./grayBox";

import { Button, TextField } from "@material-ui/core";

import axios from "axios";
import backend from "../ip";

// MOCK DATA
const USER = 'Yinza55+';
const GROUP = 'Group 1';
const MESSAGE = [{ user: 'me', message: 'Hello' }];
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYWNkNDMwMTI5YzA1MDAwZWQ1YjViNyIsImlhdCI6MTYwNTE2Mjg1OX0.QjstVEl0PCwVMI7ZMs1QZdkQgsb58e48wvIPZfCTJ5I";

class Chat extends React.Component {
  state = {
    my_groups: [],
    cid: '1',
    user: USER,
    group: GROUP,
    currentMessage: "",
    messages: MESSAGE
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
    const { cid, currentMessage } = this.state;

    //TODO: uncomment and check after POST is connected
    // const response = await axios.post(backend + "/message/send", {
    //   cid,
    //   content: currentMessage,
    //   type: "TEXT"
    // }, {
    //   header: {
    //     // 'Authorization': `Basic ${token}`
    //     'Authorization': `Basic ${TOKEN}`
    //   }
    // });
    // const { success, message } = response.data;
    // if (success) {
    //   console.log(message);
    // } else {
    //   this.setState({ error: message });
    // }
    
    // TODO: delete this setState after complate connect API
    this.setState({ messages: { user: 'me', message: this.state.currentMessage } });

    this.setState({ currentMessage: "" });
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
            {console.log(this.state.messages)}
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
