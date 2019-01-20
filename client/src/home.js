import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MapApp from "./pages/MapApp";
import Bank from "./pages/Bank/Bank"
import BottomBar from "./components/NavBar/NavBar";
import Auth from "./Auth/Auth";
import User from './pages/User/User';

class Home extends Component {
  login() {
    this.props.auth.login();
  }
  render() {
    const { isAuthenticated } = this.props.auth;
    console.log(this.props.auth)
    return (
      <div>
            <Router>
    
            <div>
            <BottomBar />
              <Switch>
                <Route exact path="/home" component={MapApp} />
                <Route exact path="/bank" component={Bank} />
                <Route exact path="/user" component={User} />
              </Switch>
            </div>
          </Router>
            
        
      </div>
    );
  }
}

export default Home;
