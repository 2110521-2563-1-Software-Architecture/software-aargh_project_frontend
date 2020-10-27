import React from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import GroupIcon from "@material-ui/icons/Group";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Link } from "@material-ui/core/";
import eggie1 from "../asset/eggie1.png";
import Button from "@material-ui/core/Button";
// import openSocket from "socket.io-client";
// import * as io from "socket.io-client";

// const socket = openSocket("http://localhost:3000");

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    height: 55,
    backgroundColor: "#105368",
  },
  // necessary for content to be below app bar
  toolbar: {
    height: 55,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const NavBar = ({
  history,
  available_groups,
  my_groups,
  onGetMessages,
  user,
}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [click, setClick] = React.useState(true);
  const handleOpen = () => {
    setOpen(!open);
  };
  const handleClick = () => {
    setClick(!click);
  };

  const handleLogout = (user) => {
    // socket.emit('log out', user)
    // socket.on('user disconnected', user)
    console.log("disconnected");
  };

  const sideList = (
    <div className={classes.root}>
      <CssBaseline />
      <div className={classes.toolbar} style={{ fontSize: "24px" }}>
        <b>EGGIE</b>
      </div>
      <Divider />

        <List>
          <ListItem button onClick={handleOpen}>
            <ListItemIcon>
              {" "}
              <GroupIcon />{" "}
            </ListItemIcon>
            <ListItemText primary="My groups" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List>
              {my_groups.map((text) => (
                <ListItem
                  button
                  key={text}
                  className={classes.nested}
                  onClick={(e) => {
                    onGetMessages(text);
                  }}
                >
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </List>
        <Divider />

        <List>
          <ListItem
            button
            onClick={() => {
              history.push({
                pathname: "/group",
                state: { user: user },
              });
            }}
          >
            <ListItemIcon>
              <AddCircleRoundedIcon />{" "}
            </ListItemIcon>
            <ListItemText primary="Create new group" />
          </ListItem>
        </List>
      </div>
  );

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <img src={eggie1}></img>
        <div style={{ marginRight: "20px" }}> {user} </div>
        <span> | </span>
        <Link
          style={{
            color: "white",
            textDecoration: "underline",
            marginLeft: "20px",
          }}
          onClick={() => {
            history.push("/");
            handleLogout(user);
          }}
        >
          <Button style={{ color: "white" }}>Log out</Button>
        </Link>
      </Toolbar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        {sideList}
      </Drawer>
    </AppBar>
  );
};

export default withRouter(NavBar);
