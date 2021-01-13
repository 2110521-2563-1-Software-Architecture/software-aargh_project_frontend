import React from "react";
import Paper from "@material-ui/core/Paper";
import moment from "moment";
import { Link } from "@material-ui/core/";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

const UnreadGrayBox = () => {
  return (
    <Paper
      square
      elevation={0}
      style={{
        padding: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#D3D3D3",
        borderRadius: 40,
        width: "250px",
        height: "18px",
      }}
    >
      <div style={{ fontSize: "11px" }}> Unread message below </div>
    </Paper>
  );
};

const TimeGrayBox = () => {
  return (
    <Paper
      square
      elevation={0}
      style={{
        padding: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#D3D3D3",
        borderRadius: 40,
        width: "250px",
        height: "18px",
      }}
    >
      <div style={{ fontSize: "11px" }}>
        {" "}
        {moment(new Date()).format("D MMM YYYY")}{" "}
      </div>
    </Paper>
  );
};

const MyLink1 = ({ children, goto, history, style }) => {
  return (<Link
    style={{
      color: "#105368",
      textDecoration: "underline",
      fontSize: 12,
      cursor:"pointer",
      ...style
    }}
    onClick={() => {
      history.push(goto);
    }}
  >
    {children}
  </Link>)
}
const MyLink = withRouter(MyLink1)

export { UnreadGrayBox, TimeGrayBox, MyLink };
