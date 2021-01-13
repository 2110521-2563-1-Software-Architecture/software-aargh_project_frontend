import React from "react";
import "./../style/chat-messages.css";
import moment from "moment";
import axios from "axios";
import backend from "../ip"
import { PhotoSizeSelectLargeSharp } from "@material-ui/icons";

class ChatMessages extends React.Component {
  state = {
    uid: JSON.parse(localStorage.getItem('uid'))
  };

  uidToUsername = (uid) => {
    var username = ""
    if (this.props.all_users){
      this.props.all_users.uid.map((user) => {
        if (user.id == uid) {
          username = user.username
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
                  message.uid === this.state.uid
                    ? "my-message-container order"
                    : "other-message-container order"
                }
              >
                <div style={{ fontSize: "12px", marginBottom: "3px" }}>
                  {message.uid === this.state.uid ? null : this.uidToUsername(message.uid)}
                </div>
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
                            ? "my-message-image"
                            : "other-message-image"
                        }
                      >
                        <img src={message.content}></img>
                      </div>
                    </div>
                  )}
                </div>
              </div>
          ))}
      </div>
    );
  }
}

export default ChatMessages;
