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
import UploadFilePreview from "./UploadFilePreview";

function Chat(props) {
  //console.log(props.user.displayName);
  const [message, setMessage] = useState("");
  const [roomname, setRoomname] = useState("");
  const [messages, setMessages] = useState([]);
  const { roomid } = useParams();
  const [file, setFiles] = useState([]);
  const [dataa, setDataa] = useState("");
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (roomid) {
      db.collection("rooms")
        .doc(roomid)
        .onSnapshot((snapshot) => {
          if (!snapshot.data()) return;
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

  const sendMessage2 = (basest, type) => {
    if (!basest) return;

    const datetime = new Date();
    console.log({
      message: basest,
      name: props.user.displayName,
      time:
        datetime.toISOString().substr(0, 10) +
        " " +
        datetime.toLocaleTimeString(),
      type,
    });

    console.log(
      datetime.toISOString().substr(0, 10) +
        " " +
        datetime.toISOString().substr(11, 5)
    );
    db.collection("rooms")
      .doc(roomid)
      .collection("messages")
      .add({
        message: basest,
        name: props.user.displayName,
        time:
          datetime.toISOString().substr(0, 10) +
          " " +
          datetime.toLocaleTimeString(),
        type,
      });
  };

  const sendMessage = (e, type) => {
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
        type,
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

  const Choosefile = (e) => {
    setFiles(e.target.files[0]);

    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setDataa(reader.result);
      setModal(true);
    };
  };
  console.log(dataa);

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

          <input
            type="file"
            id="attachment"
            onChange={(e) => {
              Choosefile(e);
            }}
            accept="image/png, image/gif, image/jpeg"
            style={{ display: "none" }}
          ></input>
          <label for="attachment">
            <AttachFile />
          </label>

          <IconButton>
            <Settings></Settings>
          </IconButton>
        </div>
      </div>
      <UploadFilePreview
        data={dataa}
        modal={modal}
        setModal={setModal}
        sendMessage={(data) => sendMessage2(data, "attachment")}
      />
      <div className="chat-body" style={{ display: modal ? "none" : "" }}>
        {messages.map((data) => {
          const val = props.user.displayName == data.name ? "chat-sender" : "";

          if (data.type == "attachment") {
            return (
              <div className={`chat_msg ` + val} style={{ padding: "15px" }}>
                <div target={data.name} className={`chat_name`}>
                  {data.name.substr(0, 10) + "..."}
                </div>
                <img
                  src={data.message}
                  style={{ width: "200px", height: "auto" }}
                ></img>

                <span
                  className="time_chat"
                  style={{ position: "absolute", bottom: 0, right: 0 }}
                >
                  {data.time}
                </span>
              </div>
            );
          }

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
      <div className="chat-foot" style={{ display: modal ? "none" : "" }}>
        <IconButton onClick={() => setDisplayEmoji(!displayEmoji)}>
          {displayEmoji == 0 ? <InsertEmoticon /> : <CancelOutlined />}
        </IconButton>

        <form>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></input>
          <IconButton type="submit" onClick={(e) => sendMessage(e, "text")}>
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
