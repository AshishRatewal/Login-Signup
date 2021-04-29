import React from "react";
import Signup from "./Components/Signup";
import LoginForm from "./Components/LoginForm";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
const App = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact component={Signup} />
          <Route path="/login" component={LoginForm} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
