import React, { Component } from 'react';
import BottomBar from "./components/NavBar/NavBar";
 import Auth from './Auth/Auth';
import Button from './components/Button/Button';
 import {Navbar} from 'react-bootstrap'

var divStyle = {
  color: "#ffffff"};

class Buttons extends Component {
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

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
    <div>
            <Button
              onClick={this.goTo.bind(this, 'home')}
              label="Home"
              style={divStyle}
              content={"Home"}
            />
            {
              !isAuthenticated() && (
                  <Button
                    id="qsLoginBtn"
                    onClick={this.login.bind(this)}
                    label="Log in"
                    style={divStyle}
                    content={"Log In"}
                  />
                )
            }
            {
              isAuthenticated() && 
                  <Button
                    onClick={this.goTo.bind(this, 'user')}
                    label="Profile"
                    style={divStyle}
                    content={"Profile"}
                  />
                
            }
           
            {
              isAuthenticated() && 
                  <Button
                    onClick={this.logout.bind(this)}
                    label="Log Out"
                    style={divStyle}
                    content={"Log Out"}
                  />
                
            }
       
      </div>


      
    );
  }
}

export default Buttons;
