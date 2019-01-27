import React, { Component } from 'react';
import './user.css';

class User extends Component {
  componentWillMount() {
    this.setState({ profile: {} });
    const { userProfile, getProfile } = this.props.auth;
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({ profile });
      });
    } else {
      this.setState({ profile: userProfile });
    }
console.log(this.props)
  }

  render() {
    const { profile } = this.state;
    return (
      <div className="userContainer">
      <h1>{profile.name}</h1>
      <img src={profile.picture} />
      <div className="container">
      <h1>USER: </h1><span>{profile.name}</span>
      </div>
      </div>
    );
  }
}

export default User;