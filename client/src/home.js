import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MapApp from "./pages/MapApp";
import Bank from "./pages/Bank/Bank"
import BottomBar from "./components/NavBar/NavBar";
import Auth from "./Auth/Auth";

class Home extends Component {
  // login() {
  //   this.props.auth.login();
  // }
  render() {
    const { isAuthenticated } = this.props.auth;
    console.log(this.props.auth)
    return (
      <div>
        {
          isAuthenticated() && (
            <Router>
    
            <div>
            <BottomBar />
              <Switch>
                <Route exact path="/home" component={MapApp} />
                <Route exact path='/categories' component={Bank}/>
              </Switch>
            </div>
          </Router>
            )
        }
        {
          !isAuthenticated() && (
              <h4>
                Login page here
              </h4>
            )
        }
      </div>
    );
  }
}

export default Home;
