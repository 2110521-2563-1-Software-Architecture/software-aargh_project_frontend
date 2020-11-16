import React from "react";
import "./../style/join.css";
import logo from "./../asset/logo.png";
import { Button, TextField } from "@material-ui/core";
import { MyLink } from "../components/grayBox"
import { withRouter } from "react-router-dom";

import axios from "axios";
import backend from "../ip";

const Join = ({ history, handleLogin }) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const login = async () => {
    try {
      const response = await axios.post(backend + "/login", {
        username,
        password,
      });

      if(response?.data?.id){
        console.log("success")
        handleLogin(response.data.token);
        localStorage.setItem('uid', JSON.stringify(response.data.id));
        history.push({
          pathname: "/group", 
          state: { 
            username: username
          }
        });
      } else {
        console.log("error")
      }
    } catch (e) {
      console.log(e);
    }
  };    

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
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></TextField>
        <TextField
          placeholder="Password"
          hintText="Password"
          floatingLabelText="Password"
          type="password"
          value={password}
          style = {{marginTop:"24px"}}
          onChange={(e) => setPassword(e.target.value)}
        ></TextField>
        <div style = {{display: "flex", alignItems: "center", justifyContent:"center", marginTop:"32px"}}>
          <div className="containedBtn">
            <Button
              color="inherit"
              fullWidth
              onClick={() => login()}
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

export default withRouter(Join);
