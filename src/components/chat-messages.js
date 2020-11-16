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
    all_users: []
  };

  async componentDidMount() {
    this.setState({ messages: this.props.messages, user: this.props.user});
    console.log(this.props.messages, this.props.user);
  }

  render() {
    return (
      <div className="container">
        {Array.isArray(this.props.messages) &&
          this.props.messages.map((message) => (
              <div
                className={
                  // TODO: message.user === this.props.user
                  message.type === "TEXT" && message.uid === "5facd430129c05000ed5b5b7"
                    ? "my-message-container order"
                    : "other-message-container order"
                }
              >
                <div style={{ fontSize: "12px", marginBottom: "3px" }}>
                  {message.user === this.props.user ? null : message.user}
                </div>
                {/* here */}
                <div>
                  {message.type === "TEXT" ? (
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <div
                        className={
                          message.user === this.props.user
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
                          message.user === this.props.user
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
