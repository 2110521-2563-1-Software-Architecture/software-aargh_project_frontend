import React, { useState } from "react";
import PropTypes from "prop-types";
import "./../style/group.css";
import Drawer from "./drawer";
import { useLocation, Link, withRouter } from "react-router-dom";

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

const Group = ({ history, handleLogout,db }) => {
  const location = useLocation();
  const token = JSON.parse(localStorage.getItem('token'));
  const uid = JSON.parse(localStorage.getItem('uid'));
  const [added_friends, setAdded_friends] = useState([]);
  const [added_friends_id, setAdded_friends_id] = useState([]);
  const [group_name, setGroup_name] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [all_friends,setall_friends] = useState([]);
  const [created_group_id, setCreated_group_id] = useState("");

  const getAllUsersButMe = async () => { 
    const response = await axios.get(backend +'/users',{
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const all_users = response.data
    var all_users_but_me = []
    {all_users.map((user) => {
      if (user.id != uid){
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
  };

  const handleToggle = () => {
    if (toggle == true) {
      setToggle(false);
    } else {
      setToggle(true);
    }
  };

  const handleCreate = async () => {
    try {
      const response = await axios.post(backend + "/chat/create", {
        uid: added_friends_id
      },{
        headers: {
          'Authorization': `Bearer ${token}`
        } 
      });

      if (response?.data?.id) {
        console.log("success");
        setCreated_group_id(response.data.id);
        history.push({
          pathname: "/chat", 
          state: { 
            username: location.state.username, 
            group_id: created_group_id,
            group_name: group_name
          }
        });
      } else {
        console.log(response.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="group">
      <Drawer
        user={location.state.username}
        handleLogout={(token) => handleLogout(token)}
        db={db}
      ></Drawer>
      <div className="group-panel">
        <div className="group-header">CREATE NEW GROUP</div>
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
          <Button onClick={() => handleCreate()} style={{ color: "white" }}>
            Create
          </Button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Group);
