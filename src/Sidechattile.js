import { Avatar, IconButton } from "@material-ui/core";
import {
  ArrowDownwardRounded,
  PlusOne,
  VerticalSplitRounded,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import db from "./firebase";

function Sidechattile({ addnewchat, roomname, id }) {
  const [seed, setSeed] = useState("");
  const [messages, setMessages] = useState("");

  const createchat = () => {
    console.log(1);
    const chatRoomName = prompt("please provide a new room name");

    if (chatRoomName) {
      db.collection("rooms").add({
        name: chatRoomName,
      });
    }
  };
  useEffect(() => {
    const val = Math.floor(Math.random() * 5000);
    setSeed(val);

    db.collection("rooms")
      .doc(id)
      .collection("messages")
      .orderBy("time", "desc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => {
            return doc.data();
          })
        );
      });
  }, []);

  console.log(messages);

  return !addnewchat ? (
    <Link
      to={`/rooms/${id}`}
      style={{ color: "black", textDecoration: "none", position: "relative" }}
    >
      <div className="sidechattile">
        <Avatar
          src={`https://avatars.dicebear.com/api/human/${seed}.svg`}
        ></Avatar>
        <div style={{ marginLeft: "10%" }}>
          {" "}
          <span style={{ fontWeight: "bold", fontSize: "20px" }}>
            {roomname}
          </span>
          <br></br>
          <span style={{ fontSize: "12px" }}>
            {messages.length > 0 ? messages[0].message : ""}..
          </span>
        </div>
      </div>
      <IconButton style={{ position: "absolute", top: "10px", left: "80%" }} >
        <ArrowDownwardRounded style={{ width: "20px", height: "20px" }} />
      </IconButton>
    </Link>
  ) : (
    <div className="sidechattile" onClick={createchat}>
      <h2>Add a new chat</h2>
    </div>
  );
}

export default Sidechattile;
