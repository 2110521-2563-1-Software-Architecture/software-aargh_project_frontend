import React, { useState } from "react";
import TextField from '@material-ui/core/TextField';
import { Button} from "@material-ui/core";
import "./../style/register.css";
import { withRouter } from "react-router-dom";

import axios from "axios";
import backend from "../ip"

const Register = ({ history }) => {
    const [form, setForm] = useState({
      name: null,
      username: null,
      password: null,
      phone_number: null,
    });
  
    const handleRegister = async () => {
      try {
        const response = await axios.post(backend + "/register", {
          ...form,
        });
        const { id } = response.data;
        if (id) {
          console.log("success");
          history.push("/");
        } else {
          console.log(response.data);
        }
      } catch (e) {
        console.log(e);
      }
    };

    return (
        <div className="root">
            <div className="titleBar">
              <p>EGGIE</p>
            </div>

            <div className ="row-grid">

            <div style = {{display: "flex",flex: 1, alignContent: "center", justifyContent: "center" }}>
              <div className="header">Register</div>
            </div>
            
            <div id="box">

              <div className="row">
                <div className="form">
                  <TextField required 
                  id="standard-required" 
                  label="Name" fullWidth
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
              </div>

              <div className="row">
                <div className="form">
                  <TextField required 
                  id="standard-required" 
                  label="Username"fullWidth
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                  />
                </div>
              </div>
          
              <div className="row">
                <div className="form">
                  <TextField required 
                  id="standard-password-input" 
                  label="Password" 
                  type="password"fullWidth
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  />
                </div>
              </div>
          
              <div className="row">
                <div className="form">
                  <TextField required 
                  id="standard-required" 
                  label="Phone number"fullWidth
                  value={form.phone_number}
                  onChange={(e) => setForm({ ...form, phone_number: e.target.value })}
                  />
                </div>
              </div>


            </div>

            <div className="row">
              <div className="outlinedBtn">
                <Button color="inherit" fullWidth
                  onClick={() => history.push("/")}
                >
                  Cancel
                </Button>
              </div>
              <div className="containedBtn">
                <Button color="inherit" fullWidth
                  onClick={() => handleRegister()}
                >
                  Register
                </Button>
              </div>
            </div> 

          </div>
        </div>

    );
  }

export default withRouter(Register);
    