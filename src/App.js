import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./components/Login";
import Profile from './components/Profile';
import PageNotFound from './components/PageNotFound';

function App() {
  return (<Router>
    <div className="App">
      <div className="auth-wrapper">
        <div className="auth-inner">
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/profile" component={Profile} />
            <Route path='*' exact={true} component={PageNotFound} />
          </Switch>
        </div>
      </div>
    </div></Router>
  );
}

export default App;