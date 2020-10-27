import React from "react";
import { Link } from "react-router-dom";
import { Button, TextField } from "@material-ui/core";
import "./../style/chat.css";
// import eggie1 from './../asset/eggie1.png'
import Drawer from "./drawer";
import ChatMessages from "./chat-messages";
import DeleteIcon from "@material-ui/icons/Delete";
import { TimeGrayBox, UnreadGrayBox } from "./grayBox";

// import openSocket from "socket.io-client";
// const socket = openSocket('http://edfb4850.ngrok.io/');

class Chat extends React.Component {
  state = {
    available_groups: [],
    my_groups: [],
    user: false,
    group: "",
    currentMessage: "",
    messages: [],
  };

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

  handleDelete = () => {
    this.props.history.push({
      pathname: "/emptyChat",
      state: { user: this.state.user, group: this.state.group },
    });
    // socket.emit("leave", { member: this.state.user, group: this.state.group });
    // socket.on("groupinfo", (data) => {
    //   this.setState({ messages: data });
    // });
  };

  onSendMessage = (e) => {
    console.log("send message");
    // if (!!this.state.currentMessage) {
    //   socket.emit("send", {
    //     user: this.state.user,
    //     group: this.state.group,
    //     time: new Date(),
    //     message: this.state.currentMessage,
    //   }); // chat = {user,group,time,message}
    //   this.onGetMessages(this.state.group);
    //   this.setState({ currentMessage: "" });
    // }
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
          available_groups={this.state.available_groups}
          my_groups={this.state.my_groups}
          onGetMessages={this.onGetMessages}
          user={this.state.user}
        ></Drawer>
        <div className="chat-panel">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              padding: "16px 16px",
            }}
          >
            <div className="chat-group-name" style={{ fontSize: "18px" }}>
              {this.state.group.toUpperCase()}
            </div>
            <DeleteIcon onClick={this.handleDelete}></DeleteIcon>
          </div>
          <div
            className="chat-content"
            style={{ display: "flex", flexDirection: "column" }}
          >
            {/* <TimeGrayBox /> */}
            {/* <UnreadGrayBox /> */}
            <ChatMessages
              messages={this.state.messages[this.state.group]}
              user={this.props.location.state.user}
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
            <Button onClick={(e) => this.onSendMessage(e)}>Send</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Chat;
