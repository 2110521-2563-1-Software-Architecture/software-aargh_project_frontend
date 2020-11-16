import React from "react";
import "./../style/chat-messages.css";
import moment from "moment";
import axios from "axios";
import backend from "../ip"
import { PhotoSizeSelectLargeSharp } from "@material-ui/icons";

var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYWNkNzg1MTI5YzA1MDAwZWQ1YjViOCIsImlhdCI6MTYwNTE4ODE1M30.15j1gNc5BmCbflJt0lTax_GyKIb4jDCC87ZzOxufC9k" //[todo : pass token]

// const getAllUsers = async (id) => { 
//   let config = {
//     headers: {
//       'Authorization': `Bearer ${token}`
//     } 
//   }
//   const response = await axios.post(
//      backend +'/chat/detail',{id: id},config
//   ); 
//   return response.data
// }

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
                message.user === this.props.user
                  ? "my-message-container order"
                  : "other-message-container order"
              }
            >
              <div style={{ fontSize: "12px", marginBottom: "3px" }}>
                {message.user === this.props.user ? null : message.user}
              </div>
              <div>
                {message.user === this.props.user ? (
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div className="time">
                      {moment(message.time).format("h:mm a")}
                      <br />
                      {moment(message.time).format("L")}
                    </div>
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
                      {message.content}
                    </div>
                    {/* <div className="time">
                      {moment(message.time).format("h:mm a")}
                      <br />
                      {moment(message.time).format("L")}
                    </div> */}
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
