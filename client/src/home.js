import React, { Component } from 'react';
import MapApp from './pages/MapApp';
import Bank from './pages/Bank/Bank';
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
      {
        isAuthenticated() && (
          <Bank />
        )
      }
       
      </div>
    );
  }
}

export default Home;
