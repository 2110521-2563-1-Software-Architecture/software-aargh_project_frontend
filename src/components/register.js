import React from "react";
import TextField from '@material-ui/core/TextField';
import { Button} from "@material-ui/core";
import "./../style/register.css";

class Register extends React.Component {

    onClickCancel = () => {
        this.props.history.push({
          pathname: "/",
        });
      };

      onClickRegister = () => {
        this.props.history.push({
          pathname: "/group",
        });
      };
      
    render() {
        return (
            <div className="root">
                <div className="titleBar">
                    <p>EGGIE</p>
                </div>

                <div className ="row-grid">

                <div style = {{display: "flex", alignContent: "center", justifyContent: "center" ,marginTop: "64px"}}>
                    <div className="header">Register</div>
                </div>
                
                <div id="box">

                    <div className="row">
                        <div className="form">
                            <TextField required id="standard-required" label="Name" fullWidth/>
                        </div>
                    </div>

                    <div className="row">
                         <div className="form">
                            <TextField required id="standard-required" label="Username"fullWidth/>
                        </div>
                    </div>
                
                    <div className="row">
                        <div className="form">
                            <TextField required id="standard-password-input" label="Password" type="password"fullWidth/>
                        </div>
                    </div>
                
                    <div className="row">
                        <div className="form">
                            <TextField required id="standard-required" label="Phone number"fullWidth/>
                        </div>
                    </div>


                </div>

                <div className="row">
                        <div className="outlinedBtn">
                            <Button color="inherit" fullWidth
                                onClick={(e) => this.onClickCancel()}>Cancel</Button>
                        </div>
                        <div className="containedBtn">
                            <Button color="inherit" fullWidth
                                onClick={(e) => this.onClickRegister()}>Register</Button>
                        </div>
                    </div>

                </div>
            </div>

        );
      }
    }
    
    export default Register;
    