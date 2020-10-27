import React from "react";
import "./../style/group.css";
import Drawer from "./drawer";
import eggie1 from "../asset/eggie1.png";
import { Link } from "react-router-dom";
import { Button, TextField } from "@material-ui/core";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import GroupIcon from "@material-ui/icons/Group";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
// import openSocket from "socket.io-client";
// const socket = openSocket("http://edfb4850.ngrok.io/");

//mock
const added_friends = ["mill","jin"]
class Group extends React.Component {
  state = {
    my_groups: [],
    added_friends: [],
    user: false,
    group: "",
    open: false
  };

  handleOpen = () => {
    if (this.state.open == true){
      this.setState({open:false})
    }
    else {
      this.setState({open:true})
    }
  }

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
            <List>
              <ListItem button onClick={this.handleOpen}>
                <ListItemIcon>
                  {" "}
                  <GroupIcon />{" "}
                </ListItemIcon>
                <ListItemText primary="Friend Added" />
                {this.state.open ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                <List>
                  {added_friends.map((text) => (
                    <ListItem
                      button
                      key={text}
                    >
                      <ListItemText primary={text} />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </List>
            <AddCircleRoundedIcon style={{ color: "#105368", marginTop: "20px"}} />
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
