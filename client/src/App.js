import React, { Component } from 'react';
import './App.css';
import logo from './safetravels.svg';


class App extends Component {
 
  render() {
    const { isAuthenticated } = this.props.auth;
    console.log(this.props.auth)
    return (
      <div className='login'>

{
          !isAuthenticated() && (
              <div>
                <img src={logo} className="safeTravelsLogo" width="1000px" />
              </div>
            )
        }
    
       
      </div>
    );
  }
}

export default App;
