import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MapApp from "./pages/MapApp";
import Bank from "./pages/Bank/Bank"
import BottomBar from "./components/NavBar/NavBar";
import Auth from "./Auth/Auth";
import User from './pages/User/User';

class Home extends Component {
  
  render() {
    const { isAuthenticated } = this.props.auth;
    console.log(this.props.auth)
    return (
      <div>

{
          !isAuthenticated() && (
              <h4>
                Login page here
              </h4>
            )
        }
      {
        isAuthenticated() && (
          <MapApp />
        )
      }
       
      </div>
    );
  }
}

export default Home;
