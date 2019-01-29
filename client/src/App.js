import React, { Component } from 'react';
import './App.css';
import Login from './pages/Login/Login'


class App extends Component {
 
  render() {
    const { isAuthenticated } = this.props.auth;
    console.log(this.props.auth)
    return (


          !isAuthenticated() && (
              <Login />
            )
        
    
       
    );
  }
}

export default App;
