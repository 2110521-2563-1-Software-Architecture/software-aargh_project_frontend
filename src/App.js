import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import TestPage1 from "./pages/TestPage1";
import TestPage2 from "./pages/TestPage2";
import Join from "./components/join";
import Chat from "./components/chat";
import Group from "./components/group";
import EmptyChat from "./components/emptyChat";
import history from "./logic/history";
import "./style/index.css";
import Register from "./components/register";

import firebase from 'firebase';
import _ from 'lodash';

function App() {
  const [token, setToken] = React.useState(null);

  const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  };  
  if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }

  const handleSetToken = (data) => {
		localStorage.setItem('token', JSON.stringify(data));
		setToken(data);
	};

	const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('uid');
		setToken(null);
  };

  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact>
          <Join handleLogin={(token) => handleSetToken(token)}/>
        </Route>
        <Route path="/chat">
          <Chat db={firebase} handleLogout={(token) => handleLogout(token)}/>
        </Route>
        <Route path="/group">
          <Group db={firebase} handleLogout={(token) => handleLogout(token)}/>
        </Route>
        <Route path="/register" exact>
          <Register />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
