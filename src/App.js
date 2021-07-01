import Chat from "./Chat";
import "./App.css";
import Sidebar from "./Sidebar";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./Login";
import { connect } from "react-redux";
import { usersave } from "./actiontypes";
import { auth } from "./firebase";

function App(props) {
  console.log(props.user);

  // const [user,setUser]=useState(null);

  useEffect(() => {
    console.log("sss");
    auth.onAuthStateChanged(function (user) {
      console.log(user);
      props.dispatch(usersave(user));
    });
  }, []);

  return !props.user ? (
    <div className="App">
      <Login />
    </div>
  ) : (
    <div className="App">
      <div className="App_body">
        <Router>
          <Sidebar displayName={props.user.displayName} />
          <Switch>
            <Route path="/rooms/:roomid">
              <Chat />
            </Route>
            <Route path="/rooms"></Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}
function mapstatetoprops(state) {
  return {
    user: state.auth.user,
  };
}

export default connect(mapstatetoprops)(App);
