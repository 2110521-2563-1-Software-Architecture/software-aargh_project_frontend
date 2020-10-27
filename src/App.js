import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TestPage1 from "./pages/TestPage1";
import TestPage2 from "./pages/TestPage2";
import Join from "./components/join";
import Chat from "./components/chat";
import Group from "./components/group";
import EmptyChat from "./components/emptyChat";
import history from "./logic/history";
import "./style/index.css";
import Register from "./components/register";

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Join} />
        <Route path="/chat" component={Chat} />
        <Route path="/group" component={Group} />
        <Route path="/emptyChat" component={EmptyChat} />
        <Route path="/register" component={Register} />
      </Switch>
    </Router>
  );
}

export default App;
