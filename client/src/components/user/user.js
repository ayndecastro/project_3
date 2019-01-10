import React, { Component } from 'react';
import './user.css';

class User extends Component {
    constructor(){
        super();
        this.state = {
            users: []
        }
    }


    componentDidMount(){
        fetch('/api/users')
        .then(res=> res.json())
        .then(users => this.setState({ users }, 
            ()=> console.log("users: ", users)))
    }

  render() {
      console.log(this.state.users, "render")
    return (
      <div className="userContainer">
        <h1>Users</h1>
        <ul>
            {this.state.users.map(user =>
            <li key={user.id}>
            Email:{user.Email}<br />
            first-name:{user.firstName}<br />
            last-name:{user.lastName}<br />
            </li>
            )}
        </ul>
      </div>
    );
  }
}

export default User;
