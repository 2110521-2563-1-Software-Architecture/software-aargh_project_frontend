import React from "react";
import "./../style/group.css";
import Drawer from "./drawer";
import eggie1 from "../asset/eggie1.png";
import { Link } from "react-router-dom";
import { Button, TextField } from "@material-ui/core";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
// import openSocket from "socket.io-client";
// const socket = openSocket("http://edfb4850.ngrok.io/");

class Group extends React.Component {
  state = {
    available_groups: [],
    my_groups: [],
    user: false,
    group: "",
  };

  componentDidMount() {
    try {
      //1. get user's groups {status: complete}

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

  handleCreate = () => {
    // if (!!this.state.group) {
    //   socket.emit("create", {
    //     member: this.state.user,
    //     group: this.state.group,
    //   });
    //   socket.on("groupcreation completed", () => {
    //     console.log("create group complete");
    //     socket.emit("getGroupUpdates", this.state.user);
    //     socket.on("groupinfo", (data) => {
    //       this.setState({
    //         available_groups: data.group,
    //         my_groups: data.joinedGroup,
    //       });
    //     });
    //   });
    // }
    console.log(this.state.group);
  };

  onGetMessages = (groupName) => {
    // socket.emit("join", { group: groupName, member: this.state.user });
    this.props.history.push({
      pathname: "/chat",
      state: { user: this.state.user, group: groupName },
    });
  };

  render() {
    return (
      <div className="group">
        <Drawer
          my_groups={this.state.my_groups}
          onGetMessages={this.onGetMessages}
          user={this.state.user}
        ></Drawer>
        <div className="group-panel">
          <div className="group-header">CREATE NEW GROUP</div>
          <div className="group-content">
            <o1 style={{ marginRight: "20px" }}>Group Name:</o1>
            <TextField
              style={{ marginRight: "20px" }}
              placeholder="Group Name"
              value={this.state.group}
              onChange={(e) => {
                this.setState({ group: e.target.value });
              }}
            ></TextField>
          </div>
          <div className="friend-content">
            <o1 style={{ marginRight: "20px" }}>Friend List:</o1>
            <TextField
              style={{ marginRight: "20px" }}
              placeholder="Friend List"
              value={this.state.group}
              onChange={(e) => {
                this.setState({ group: e.target.value });
              }}
            ></TextField>
            <AddCircleRoundedIcon style={{ color: "#105368" }} />
          </div>
          <div className="create-content">
            <Button
              onClick={this.handleCreate}
              style={{ borderRadius: 40, color: "white" }}
            >
              Create
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Group;
