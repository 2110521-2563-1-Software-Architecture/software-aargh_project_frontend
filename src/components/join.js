import React from "react";
import { Link } from "react-router-dom";
import "./../style/join.css";
import logo from "./../asset/logo.png";
import { Button, TextField } from "@material-ui/core";

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

  onClickRegister() {
    console.log(this.state.username);
  }

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
            onChange={(e) => this.setState({ password: e.target.value })}
          ></TextField>
          <div className="login-button">
            <Button
              color="inherite"
              onClick={(e) => this.login()}
            >Log in</Button>
           </div>
          <div className="register-button">
            <p>Don't have an account?</p>
            <Button style = {{backgroundcolor: "gray"}}
              component={Link}
              to={{
                pathname: "/register",
                state: { user: this.state.name },
              }}
              color="inherite"
              onClick={(e) => this.onClickRegister()}
            >
              Register
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Join;
