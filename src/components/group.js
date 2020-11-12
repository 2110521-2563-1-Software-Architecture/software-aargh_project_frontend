import React, { useState } from "react";
import PropTypes from "prop-types";
import "./../style/group.css";
import Drawer from "./drawer";
import { Link } from "react-router-dom";

import { Button, TextField } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import GroupIcon from "@material-ui/icons/Group";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

import axios from "axios";
import backend from "../ip"

//mock
var ADDED_FRIENDS = [];
var ALL_FRIENDS = [{"id":"5fa6f0ca45eb51877885fb1b","username":"focus","name":"focus"},{"id":"5fa6f1b045eb51877885fb1c","username":"focus2","name":"focus"},{"id":"5facd430129c05000ed5b5b7","username":"ajin","name":"jin"},{"id":"5facd785129c05000ed5b5b8","username":"millmill","name":"mill"}] //["mill", "jin", "yin", "nut", "pam", "focus"];

function FriendsDialog(props) {
  const { onClose, selectedValue, open, all_friends } = props;
  const [checked, setChecked] = useState([]);

  const handleClose = () => {
    ADDED_FRIENDS.length = 0
    {checked.map((value, index) => {
      ADDED_FRIENDS.push(value) 
    })}   
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>All Friends</DialogTitle>
      <DialogContent
        dividers={true}
        style={{ width: "400px", height: "250px" }}
      >
        <List>
          {all_friends.map((friend) => (
            <ListItem button key={friend}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked.indexOf(friend) !== -1}
                    onChange={handleToggle(friend)}
                    color="primary"
                  />
                }
                label={friend}
              />
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
}

FriendsDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  all_friends: PropTypes.array.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

const Group = () => {
  const [my_groups, setMy_groups] = useState([]);
  const [added_friends, setAdded_friends] = useState([]);
  const [user, setUser] = useState(false);
  const [group, setGroup] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [all_friends,setall_friends] = useState([]);

  const getAllUsers = async () => {
    let config = {
      headers: {
        'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYWNkNzg1MTI5YzA1MDAwZWQ1YjViOCIsImlhdCI6MTYwNTE2Mjk0Mn0.M3Y20V24T71_x7COAILYEdkY60RGDUtnHpvo0XBKclg' // + validToken() //[TODO - ADD TOKEN FROM LOGIN] -- and replace it at validToken()
      }
    }
    const response = await axios.get(
      backend+'/users',config
    ); 
    const { success, request } = response.data;
    if (success) {
      this.setState({ list: request });
    }
    console.log('All',ALL_FRIENDS)
    setall_friends(ALL_FRIENDS) // allfriend list
  }

  const handleDialogOpen = () => {
    getAllUsers();
    setDialogOpen(true);
  };

  const handleDialogClose = (value) => {
    setDialogOpen(false);
    setSelectedValue(value);
  };

  const handleToggle = () => {
    if (toggle == true) {
      setToggle(false);
    } else {
      setToggle(true);
    }
  };

  const handleCreate = async () => {
    //[TODO : add create method]
    try {
      const response = await axios.post(backend + "/chat/create", {
        //[TODO] add information needed to be sent to backend 
        // ...form,
        // photo: userImage,
      });
      //[TODO] recheck parameter received from the 
      const { success, information, message } = response.data;
      // if (success) {
      // } else {
      //   console.log(message);
      // }
    } catch (e) {
      console.log(e);
    }
    console.log(group);
  };

  const onGetMessages = (groupName) => {
    // socket.emit("join", { group: groupName, member: this.state.user });
    // this.props.history.push({
    //   pathname: "/chat",
    //   state: { user: this.state.user, group: groupName },
    // });
  };

  return (
    <div className="group">
      <Drawer
        my_groups={my_groups}
        onGetMessages={onGetMessages}
        user={user}
      ></Drawer>
      <div className="group-panel">
        <div className="group-header">CREATE NEW GROUP</div>
        <div className="group-content">
          <o1 style={{ marginRight: "20px" }}>Group Name:</o1>
          <TextField
            style={{ marginRight: "20px" }}
            placeholder="Group Name"
            value={group}
            onChange={(e) => setGroup(e.target.value)}
          ></TextField>
        </div>
        <div className="friend-content">
          <List>
            <ListItem button onClick={handleToggle}>
              <ListItemIcon>
                {" "}
                <GroupIcon />{" "}
              </ListItemIcon>
              <ListItemText primary="Friend Added" />
              {toggle ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={toggle} timeout="auto" unmountOnExit>
              <List>
                {ADDED_FRIENDS.map((text) => (
                  <ListItem button key={text}>
                    <ListItemText primary={text} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </List>
          <AddCircleRoundedIcon
            style={{ color: "#105368", marginTop: "20px", marginLeft: "10px" }}
            onClick={handleDialogOpen}
          />
          <FriendsDialog
            selectedValue={selectedValue}
            open={dialogOpen}
            all_friends={all_friends}
            onClose={handleDialogClose}
          />
        </div>
        <div className="create-content">
          <Button onClick={handleCreate} style={{ color: "white" }}>
            Create
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Group;
