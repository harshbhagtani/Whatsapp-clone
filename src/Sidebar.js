import { Avatar, IconButton } from "@material-ui/core";
import {
  ChatBubble,
  DonutLarge,
  SearchOutlined,
  Settings,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import db from "./firebase";
import "./sidebar.css";
import Sidechattile from "./Sidechattile";

function Sidebar(props) {
  const [room, setRoom] = useState([]);
  const [search, setSearch] = useState("");

  console.log(props.user);
  const [seed, setSeed] = useState("");

  useEffect(() => {
    db.collection("rooms").onSnapshot((snapshot) => {
      setRoom(
        snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            data: doc.data(),
          };
        })
      );
    });

    const val = Math.floor(Math.random() * 5000);
    setSeed(val);
  }, []);
  //  console.log(room);

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <Avatar
          src={`https://avatars.dicebear.com/api/human/${seed}.svg`}
        ></Avatar>
        <span style={{ fontsize: "5px" }}>{props.displayName}</span>
        <div>
          <IconButton>
            <DonutLarge></DonutLarge>
          </IconButton>
          <IconButton>
            <ChatBubble></ChatBubble>
          </IconButton>
          <IconButton>
            <Settings></Settings>
          </IconButton>
        </div>
      </div>
      <div className="sidebar-search">
        <SearchOutlined></SearchOutlined>
        <input
          type="text"
          placeholder="search a chat"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></input>
      </div>
      <div className="sidebar-chat">
        <Sidechattile addnewchat />
        {room.map((data) => {
          if (data.data.name.includes(search)) {
            return (
              <Sidechattile
                key={data.id}
                id={data.id}
                roomname={data.data.name}
              />
            );
          }
        })}
      </div>
    </div>
  );
}

function mapstatetoprops(state) {
  return {
    user: state.auth.user,
  };
}

export default connect(mapstatetoprops)(Sidebar);
