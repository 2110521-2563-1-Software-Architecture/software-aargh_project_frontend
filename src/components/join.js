import React from "react";
import { Link } from "react-router-dom";
import "./../style/join.css";
import logo from "./../asset/logo.png";
import { Button, TextField } from "@material-ui/core";
import {MyLink} from "../components/grayBox"

import axios from "axios";
import backend from "../ip";

class Join extends React.Component {
  state = { username: null, password: null, error: "" };
  login = async() => {
    const { username, password } = this.state;
    // const response = await axios.post(backend + "/login", {
    //   username,
    //   password,
    // });

    // const { success, message } = response.data;
    console.log({ username, password })

 //TODO: check after POST is connected

    // if (success) {
    //   console.log(message);
    //   this.props.history.push({
    //     pathname: "/group",
    //     state: { user: this.state.username },
    //   });
    // } else {
    //   this.setState({ error: message });
    // }
  };

  render() {
    const { username, password, error } = this.state;
    return (
      <div className="root">
        <div className="titleBar">
          <img className="logo" src={logo}></img>
          <p>LikeWhatsApp</p>
        </div>
        <div className="center">
          <h1>Welcome,</h1>
          <TextField
            placeholder="Username"
            value={this.state.username}
            onChange={(e) => this.setState({ username: e.target.value })}
          ></TextField>
          <TextField
            // ref='password'
            placeholder="Password"
            hintText="Password"
            floatingLabelText="Password"
            type="password"
            value={this.state.password}
            style = {{marginTop:"24px"}}
            onChange={(e) => this.setState({ password: e.target.value })}
          ></TextField>
          <div style = {{display: "flex", alignItems: "center", justifyContent:"center", marginTop:"32px"}}>
            <div className="containedBtn">
              <Button
                color="inherit"
                fullWidth
                onClick={(e) => this.login()}
              >Log in</Button>
            </div>
          </div>
          <div style = {{display: "flex", alignItems: "center",justifyContent:"center", width: 240, marginTop:"24px"}}>
            <div style = {{fontSize: "12px", color: "#105368", marginRight: "8px"}}> Don't have an account?</div>
            <MyLink goto={"/register"}> Register </MyLink>
          </div>
        </div>
      </div>
    );
  }
}

export default Join;
