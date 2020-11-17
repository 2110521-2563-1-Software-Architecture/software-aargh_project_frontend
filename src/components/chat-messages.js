import React from "react";
import "./../style/chat-messages.css";
import moment from "moment";
import axios from "axios";
import backend from "../ip"
import { PhotoSizeSelectLargeSharp } from "@material-ui/icons";

class ChatMessages extends React.Component {
  state = {
    messages: [],
    user: false,
    all_users: [],
    uid: JSON.parse(localStorage.getItem('uid'))
  };

  uidToUsername = (uid) => {
    var username = ""
    if (this.props.all_users){
      this.props.all_users.uid.map((user) => {
        if (user.id == uid) {
          username = user.username
          console.log('UID')
          console.log(user.uid)
          console.log('TO USERNAME')
          console.log(user.username)
        }
      })
    }
    if (username != ""){
      return username
    } else {
      return "UNKNOWN USER"
    }
  }

  render() {
    return (
      <div className="container">
        {Array.isArray(this.props.messages) &&
          this.props.messages.map((message) => (
              <div
                className={
                  // TODO: message.user === this.props.user
                  message.type === "TEXT" && message.uid === this.state.uid
                    ? "my-message-container order"
                    : "other-message-container order"
                }
              >
                <div style={{ fontSize: "12px", marginBottom: "3px" }}>
                  {message.uid === this.state.uid ? null : this.uidToUsername(message.uid)}
                </div>
                {/* here */}
                <div>
                  {message.type === "TEXT" ? (
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <div
                        className={
                          message.uid === this.state.uid
                            ? "my-message"
                            : "other-message"
                        }
                      >
                        {message.content}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div
                        className={
                          message.uid === this.state.uid
                            ? "my-message"
                            : "other-message"
                        }
                      >
                        <img src={message.content}></img>
                        {/* {message.content} */}
                      </div>
                    </div>
                  )}
                </div>
                {/* till here */}
              </div>
          ))}
      </div>
    );
  }
}

export default ChatMessages;
