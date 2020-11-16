import React, { useEffect, useState } from "react";
import { useLocation, withRouter } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Link } from "@material-ui/core/";
import Button from "@material-ui/core/Button";

import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import GroupIcon from "@material-ui/icons/Group";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import _ from 'lodash';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    minHeight: "100%",
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
  group: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
}));

const NavBar = ({
  history,
  user,
  handleLogout,
  db
}) => {
  const classes = useStyles();
  const location = useLocation();
  const token = JSON.parse(localStorage.getItem('token'));
  const uid = JSON.parse(localStorage.getItem('uid'));
  const [open, setOpen] = useState(true);
  const [click, setClick] = useState(true);

  // for getting all chat from realtime database
  const [my_groups, setMy_groups] = useState([]);

  const getAllChats = (values) => {
    let chatsVal = values;
    let chats = _(chatsVal)
                    .keys()
                    .map(chatKey => {
                      let cloned = _.clone(chatsVal[chatKey]);
                      cloned.key = chatKey;
                      return cloned;
                    }).value();
    if (chats.length!=0){
      console.log({chats})
      var all_my_chats = []
      {chats.map((chat) => {
          all_my_chats.push(chat)
      })}
      setMy_groups(all_my_chats)
    } else {
      console.log("NO GROUP")
      setMy_groups([])
    }
    //console.log(this.state.users)
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleClick = () => {
    setClick(!click);
  };

  const onGetAllMyGroups = () => {
    var app = db.database().ref('/chat/'+uid);
    app.on('value', snapshot => {
        getAllChats(snapshot.val());
      });
  };

  useEffect(() => {
    onGetAllMyGroups();
  }, []);

  const sideList = (
    <div className={classes.root}>
      <CssBaseline />
      <div className={classes.toolbar} style={{ fontSize: "24px", height: 54 }}>
        <b>LikeWhatsApp</b>
      </div>
      <Divider />

      <div className={classes.group}>
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
            {/* {console.log({my_groups})} */}
            <List>
              {my_groups.map((group, index) => (
                <ListItem
                  button
                  key={index}
                  className={classes.nested}
                  onClick={() => {
                    history.push({
                      pathname: "/chat", 
                      state: { 
                        username: user, 
                        group_id: group.key,  // should be selected group id
                        group_name: group.key   // should be selected group name
                      }
                    })
                  }}
                >
                  <ListItemText primary={group.key} />
                  {group.read && (
                    <ListItemSecondaryAction edge="end">
                      <div
                          style={{
                            display: 'flex',
                            alignSelf: 'center',
                            marginRight: 7,
                            borderRadius: '100%',
                            backgroundColor: '#FF8258',
                            height: '10px',
                            width: '10px',
                          }}
                        />
                    </ListItemSecondaryAction>
                  )}
                </ListItem>
              ))}
            </List>
          </Collapse>
        </List>

        <div>
          <Divider />
          <Button
            style={{
              display: "flex",
              alignItems: "center",
              minWidth: "100%",
              margin: "10px 0 10px 0",
            }}
            onClick={() => {
              history.push({
                pathname: "/group", 
                state: { 
                  username: user
                }
              })
            }}
          >
            <AddCircleRoundedIcon
              style={{ color: "#105368", marginRight: "10px" }}
            />
            <div>Create new group</div>
          </Button>
        </div>
      </div>
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
            handleLogout(token);
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
