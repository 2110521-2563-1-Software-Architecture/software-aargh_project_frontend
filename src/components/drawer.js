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

// mock data for  cid, unread
const MOCK_DATA = [
  {cid: 1, my_groups: "Group 1", unread: true},
  {cid: 2, my_groups: "Group 2", unread: false},
  {cid: 3, my_groups: "Group 3", unread: true},
  {cid: 4, my_groups: "Group 4", unread: false}
]
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
  onGetMessages,
  user,
  data = MOCK_DATA
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
    console.log("disconnected");
  };

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
            <List>

  {/* TODO: Integrate with backend for get chat name */}

              {/* {my_groups.map((text) => ( */}
              {data.map((item) => (
                <ListItem
                  button
                  key={item.my_groups}
                  className={classes.nested}
                  // onClick={(e) => {
                  //   onGetMessages(text);
                  // }}
                >
                  <ListItemText primary={item.my_groups} />
                  {item.unread && (
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
