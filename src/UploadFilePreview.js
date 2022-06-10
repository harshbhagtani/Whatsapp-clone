import { makeStyles, IconButton } from "@material-ui/core";
import { CancelOutlined, Send } from "@material-ui/icons";
import React from "react";

const useStyles = makeStyles(() => ({
  root: {
    background: "#dddbd1",
    height: "100%",
  },
  header: {
    height: "70px",
    background: "#00bfa5",
    display: "flex",
    alignItems: "center",
  },
  preview: {
    height: "400px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

function UploadFilePreview({ data, modal, setModal, sendMessage }) {
  const classes = useStyles();

  return (
    <div className={classes.root} style={{ display: !modal ? "none" : "" }}>
      <div className={classes.header}>
        <IconButton onClick={() => setModal(false)}>
          <CancelOutlined />
        </IconButton>
        <h2 style={{ color: "white", marginLeft: "10px", fontWeight: "500" }}>
          Preview
        </h2>
      </div>

      <div className={classes.preview}>
        <img style={{ width: "250px", height: "300px" }} src={data}></img>
      </div>
      <IconButton
        style={{ background: "#09e85e", marginLeft: "90%" }}
        onClick={() => {
          sendMessage(data);
          setModal(false);
        }}
      >
        <Send style={{ color: "white" }}></Send>
      </IconButton>
    </div>
  );
}

export default UploadFilePreview;
