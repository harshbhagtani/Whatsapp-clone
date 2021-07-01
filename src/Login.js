import { WhatsApp } from "@material-ui/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { usersave } from "./actiontypes";
import { auth, provider } from "./firebase";
import "./login.css";

function Login() {
  const dispatch = useDispatch();
  const signin = () => {
    console.log(provider);
    auth
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result);
        localStorage.setItem("user", result.user);
        dispatch(usersave(result.user));
      })
      .catch((error) => {
        alert(error);
      });
  };
  return (
    <div className="login">
      <img src="https://e7.pngegg.com/pngimages/1006/83/png-clipart-whatsapp-computer-icons-android-whatsapp-cdr-logo-thumbnail.png"></img>
      <h2>Sign in to WhatsApp</h2>
      <button onClick={signin}>sign in with google</button>
    </div>
  );
}

export default Login;
