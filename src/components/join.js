import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "./../style/join.css";
import logo from "./../asset/logo.png";

import { Button, TextField } from "@material-ui/core";

// import openSocket from "socket.io-client";
// const socket = openSocket("http://edfb4850.ngrok.io/");

class Join extends React.Component {
  state = {
    name: "",
    room: "",
  };

  userLogin(value) {
    this.setState({
      name: value,
    });
    // socket.emit("login", this.state.name);
    console.log(this.state.name);
    // console.log(socket);
  }

  onClickLogin() {
    console.log(this.state.name);
    if (!!this.state.name) {
      this.userLogin(this.state.name);
    }
  }

  onClickRegister() {
    console.log(this.state.name);
  }

  render() {
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
            value={this.state.name}
            onChange={(e) => this.setState({ name: e.target.value })}
          ></TextField>
          <TextField
            // ref='password'
            placeholder="Password"
            hintText="Password"
            floatingLabelText="Password"
            type="password">
          </TextField>
          <div className="login-button">
            <Button
              component={Link}
              to={{
                pathname: "/group",
                state: { user: this.state.name },
              }}
              color="inherite"
              // params={{ user: this.state.name }}
              // disabled={!this.state.name}
              onClick={(e) => this.onClickLogin()}
            >
              Log in
            </Button>
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
              // params={{ user: this.state.name }}
              // disabled={!this.state.name}
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
