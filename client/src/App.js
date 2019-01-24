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
  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  componentDidMount() {
    
    const { renewSession } = this.props.auth;

    if (localStorage.getItem('isLoggedIn') === 'true') {
      renewSession();
    }
  }

  posting(){
    const { getAccessToken } = this.props.auth;
    const headers = { 'Authorization': `Bearer ${getAccessToken()}`}
    Axios.post(`${API_URL}/admin`, {}, { headers })
      .then(response => this.setState({ message: response.data.message }))
      .catch(error => this.setState({ message: error.message }));
      
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    
    return (
    <div>
        <Navbar fluid>
          <Navbar.Header>
            <Button
              bsStyle="primary"
              className="btn-margin"
              onClick={this.goTo.bind(this, 'home')}
              onClick={this.posting.bind(this)}
            >
              Home
            </Button>
            {
              !isAuthenticated() && (
                  <Button
                    id="qsLoginBtn"
                    bsStyle="primary"
                    className="btn-margin"
                    onClick={this.login.bind(this)}
                  >
                    Log In
                  </Button>
                )
            }
            {
              isAuthenticated() && (
                  <Button
                    bsStyle="primary"
                    className="btn-margin"
                    onClick={this.goTo.bind(this, 'user')}
                  >
                    Profile
                  </Button>
                )
            } {
              isAuthenticated() && (
                  <Button
                    bsStyle="primary"
                    className="btn-margin"
                    onClick={this.goTo.bind(this, 'bank')}
                  >
                    Bank
                  </Button>
                )
            }
           
            {
              isAuthenticated() && (
                  <Button
                    id="qsLogoutBtn"
                    bsStyle="primary"
                    className="btn-margin"
                    onClick={this.logout.bind(this)}
                  >
                    Log Out
                  </Button>
                )
            }
          </Navbar.Header>
        </Navbar>
       
      
      </div>


      
    );
  }
}

export default App;
