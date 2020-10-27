import React from "react";
import Paper from "@material-ui/core/Paper";
import moment from "moment";

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
export { UnreadGrayBox, TimeGrayBox };
