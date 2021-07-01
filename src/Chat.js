import { Avatar, IconButton } from "@material-ui/core";
import {
  SearchOutlined,
  Settings,
  AttachFile,
  InsertEmoticon,
  Mic,
  Send,
  CropSquareSharp,
  CancelOutlined,
} from "@material-ui/icons";

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import "./chat.css";
import db from "./firebase";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

function Chat(props) {
  //console.log(props.user.displayName);
  const [message, setMessage] = useState("");
  const [roomname, setRoomname] = useState("");
  const [messages, setMessages] = useState([]);
  const { roomid } = useParams();

  useEffect(() => {
    if (roomid) {
      db.collection("rooms")
        .doc(roomid)
        .onSnapshot((snapshot) => {
          console.log(snapshot.data(), roomid);
          setRoomname(snapshot.data().name);
        });

      db.collection("rooms")
        .doc(roomid)
        .collection("messages")
        .orderBy("time", "asc")
        .onSnapshot((snapshot) => {
          setMessages(
            snapshot.docs.map((doc) => {
              return doc.data();
            })
          );
        });
    }
  }, [roomid]);

  const sendMessage = (e) => {
    e.preventDefault();
    console.log(message);
    if (message === "") return;

    const datetime = new Date();

    console.log(
      datetime.toISOString().substr(0, 10) +
        " " +
        datetime.toISOString().substr(11, 5)
    );
    db.collection("rooms")
      .doc(roomid)
      .collection("messages")
      .add({
        message,
        name: props.user.displayName,
        time:
          datetime.toISOString().substr(0, 10) +
          " " +
          datetime.toLocaleTimeString(),
      });

    setMessage("");
  };
  //console.log(messages);
  const [displayEmoji, setDisplayEmoji] = useState(0);

  const addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setMessage(message + emoji);
  };

  return (
    <div className="right-chat">
      <div className="chat-header">
        <Avatar></Avatar>
        <div style={{ marginLeft: "-40%" }}>
          <span style={{ fontWeight: "bold", fontSize: "20px" }}>
            {roomname}
          </span>
          <br></br>
          <span style={{ fontSize: "12px" }}>
            Last Active{" "}
            {messages.length > 0 ? messages[messages.length - 1].time : ""}
          </span>
        </div>
        <div>
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <Settings></Settings>
          </IconButton>
        </div>
      </div>
      <div className="chat-body">
        {messages.map((data) => {
          const val = props.user.displayName == data.name ? "chat-sender" : "";
          return (
            <div className={`chat_msg ` + val}>
              <div target={data.name} className={`chat_name`}>
                {data.name.substr(0, 7) + "..."}
              </div>

              {data.message}
              <span className="time_chat">{data.time}</span>
            </div>
          );
        })}
      </div>
      <div className="chat-foot">
        <IconButton onClick={() => setDisplayEmoji(!displayEmoji)}>
          {displayEmoji == 0 ? <InsertEmoticon /> : <CancelOutlined />}
        </IconButton>

        <form>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></input>
          <IconButton type="submit" onClick={sendMessage}>
            <Send />
          </IconButton>
        </form>
        <Mic />
      </div>
      <span>
        <Picker
          style={{ display: displayEmoji == 1 ? "" : "none", width: "100%" }}
          onSelect={addEmoji}
        />
      </span>
    </div>
  );
}

function mapstatetoprops(state) {
  return {
    user: state.auth.user,
  };
}

export default connect(mapstatetoprops)(Chat);
