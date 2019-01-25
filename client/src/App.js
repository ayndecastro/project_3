import React, { Component } from 'react';
import './App.css';
// import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
// import MapApp from "./pages/MapApp";
// import Bank from "./pages/Bank/Bank"
//  import BottomBar from "./components/NavBar/NavBar";
// import User from './components/user/user';
 import Auth from './Auth/Auth';
//  import Buttons from './components/Button/Button';
 import {Navbar, Button} from 'react-bootstrap'
import Axios from 'axios';
import {API_URL} from './constants'


class App extends Component {
 

  render() {
    const { isAuthenticated } = this.props.auth;
    
    return (
    <div>
    
      </div>

    );
  }
}

export default App;
