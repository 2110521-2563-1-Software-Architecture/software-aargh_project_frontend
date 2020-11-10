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
const ADDED_FRIENDS = [];
const ALL_FRIENDS = ["mill", "jin", "yin", "nut", "pam", "focus"];

function FriendsDialog(props) {
  const { onClose, selectedValue, open } = props;
  const [checked, setChecked] = useState([]);

  const getAllUsers = async () => {
    const response = await axios.get(
      backend+'/users'
    );
  }
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
          {ALL_FRIENDS.map((friend) => (
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

  const handleDialogOpen = () => {
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

  const handleCreate = () => {
    
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
