import React, { useState } from "react";
import TextField from '@material-ui/core/TextField';
import { Button} from "@material-ui/core";
import "./../style/register.css";
import { withRouter } from "react-router-dom";

import axios from "axios";
import backend from "../ip"

    const Register = ({ history, handleLogin }) => {
        const [errorMessage, setErrorMessage] = useState("");
        const [form, setForm] = useState({
          name: null,
          username: null,
          password: null,
          phone_number: null,
        });
        const [error, setError] = useState({
          name: false,
          username: false,
          password: false,
          phone_number: false,
        });
      
        const validate = () => {
          setError({
            name: !form.name,
            username: !form.username,
            password: !form.password,
            phone_number: !form.phone_number,
          });
          return !(
            error.name ||
            error.username ||
            error.password ||
            error.phone_number
          );
        };
      
        const handleRegister = async () => {

    // TODO check after POST is done
          if (validate()) {
            try {
              const response = await axios.post(backend + "/user/register", {
                ...form,
              });
              const { success, message } = response.data;
              
              if (success) {
                console.log("success")
                // const user = information[0];
                // handleLogin(user);
                history.push("/");
              } else {
                setErrorMessage(message);
              }
            } catch (e) {
              console.log(e);
              setErrorMessage("Invalid data, please check your input again");
            }
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
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="row">
                         <div className="form">
                            <TextField required 
                            id="standard-required" 
                            label="Username"fullWidth
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
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            />
                        </div>
                    </div>
                
                    <div className="row">
                        <div className="form">
                            <TextField required 
                            id="standard-required" 
                            label="Phone number"fullWidth
                            onChange={(e) => setForm({ ...form, phone_number: e.target.value })}
                            />
                        </div>
                    </div>


                </div>

                <div className="row">
                        <div className="outlinedBtn">
                            <Button color="inherit" fullWidth
                                onClick={(e) => history.push("/")}>Cancel</Button>
                        </div>
                        <div className="containedBtn">
                            <Button color="inherit" fullWidth
                                onClick={(e) => handleRegister()}>Register</Button>
                        </div>
                    </div>

                </div>
            </div>

        );
      }
    
    export default withRouter(Register);
    