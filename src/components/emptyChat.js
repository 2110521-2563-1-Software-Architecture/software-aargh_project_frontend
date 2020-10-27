import React from "react";
import { Link } from "react-router-dom";
import { Button, TextField } from "@material-ui/core";
import "./../style/chat.css";
import eggie1 from "./../asset/eggie1.png";
import Drawer from "./drawer";
import ChatMessages from "./chat-messages";
import DeleteIcon from "@material-ui/icons/Delete";

// import openSocket from "socket.io-client";
// const socket = openSocket("http://edfb4850.ngrok.io/");

class EmptyChat extends React.Component {
  state = {
    available_groups: [],
    my_groups: [],
    user: false,
    group: "",
  };

  componentDidMount() {
    try {
      console.log("componentDidMount");
      // socket.emit('getGroupUpdates', this.props.location.state.user)
      // socket.on('groupinfo', (data) => {
      //     this.setState({ available_groups: data.group, my_groups: data.joinedGroup, user: this.props.location.state.user })
      //     console.log(this.state)
      // })
    } catch (e) {
      console.log(e);
    }
  }

  onGetMessages = (groupName) => {
    // socket.emit("join", { group: groupName, member: this.state.user });
    this.props.history.push({
      pathname: "/chat",
      state: { user: this.state.user, group: groupName },
    });
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
              EMPTY CHAT
            </div>
            <DeleteIcon />
          </div>
          <div className="chat-content"></div>
          <div className="message-box">
            <TextField
              disabled
              variant="outlined"
              size="small"
              placeholder="Type your message"
              fullWidth="true"
            ></TextField>
            <Button disabled>Send</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default EmptyChat;
