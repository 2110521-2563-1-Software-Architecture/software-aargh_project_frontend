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
//var ALL_FRIENDS = [{"id":"5fa6f0ca45eb51877885fb1b","username":"focus","name":"focus"},{"id":"5fa6f1b045eb51877885fb1c","username":"focus2","name":"focus"},{"id":"5facd430129c05000ed5b5b7","username":"ajin","name":"jin"},{"id":"5facd785129c05000ed5b5b8","username":"millmill","name":"mill"}] //["mill", "jin", "yin", "nut", "pam", "focus"];
var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYWNkNzg1MTI5YzA1MDAwZWQ1YjViOCIsImlhdCI6MTYwNTE4ODE1M30.15j1gNc5BmCbflJt0lTax_GyKIb4jDCC87ZzOxufC9k" //[todo : pass token]
var id = "5facd785129c05000ed5b5b8" //[todo: pass id]
function FriendsDialog({ 
  onClose, 
  open, 
  all_friends, 
  setAdded_friends,
  setAdded_friends_id
}) {
  const [checked, setChecked] = useState([]);
  const [selected_id, setSelected_id] = useState([]);

  const handleClose = () => {
    var friends = [];
    {checked.map((username, index) => {
      friends.push(username) 
    })}
    setAdded_friends(friends);
    setAdded_friends_id(selected_id);
    onClose();
  };

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value.username);
    const newChecked = [...checked];
    const id_list = [...selected_id];

    if (currentIndex === -1) {
      newChecked.push(value.username);
      id_list.push(value.id);
    } else {
      newChecked.splice(currentIndex, 1);
      id_list.splice(currentIndex, 1);
    }
    console.log(newChecked)
    setChecked(newChecked);
    setSelected_id(id_list);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>All Friends</DialogTitle>
      <DialogContent
        dividers={true}
        style={{ width: "400px", height: "250px" }}
      >
        <List>
          {all_friends.map(({id, username}) => (
            <ListItem button key={id}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked.indexOf(username) !== -1}
                    onChange={handleToggle({id,username})}
                    color="primary"
                  />
                }
                label={username}
              />
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
}

const Group = ( info ) => {
  const [my_groups, setMy_groups] = useState([]);
  const [added_friends, setAdded_friends] = useState([]);
  const [added_friends_id, setAdded_friends_id] = useState([]);
  const [user, setUser] = useState(false);
  const [group, setGroup] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [all_friends,setall_friends] = useState([]);
  const [added_users, setAdded_users] = useState([]);

  const getAllUsersButMe = async () => { 
    let config = {
      headers: {
        'Authorization': `Bearer ${token}`
      } 
    }
    const response = await axios.get(
       backend +'/users',config
    ); 
    const all_users = response.data
    var all_users_but_me = []
    {all_users.map((user) => {
      if (user.id != id){
        all_users_but_me.push(user) 
      }
    })}
    setall_friends(all_users_but_me)
  }

  const handleDialogOpen = () => {
    getAllUsersButMe();
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
    //console.log(added_friends_id) // added_friends_id should be sent as a body to backend
    try {
      let config = {
        headers: {
          'Authorization': `Bearer ${token}`
        } 
      }
      const response = await axios.post(backend + "/chat/create", {uid:added_friends_id},config);
      //const { success, message } = response.data;
      //if (success) {
      //} else {
      //  console.log(message);
      //}
    } catch (e) {
      console.log(e);
    }
    console.log('group:',group);
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
        user={info.location.state.data.name}
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
                {added_friends.map((username, i) => (
                  <ListItem button key={i}>
                    <ListItemText primary={username} />
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
            open={dialogOpen}
            all_friends={all_friends}
            setAdded_friends={setAdded_friends}
            setAdded_friends_id={setAdded_friends_id}
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
