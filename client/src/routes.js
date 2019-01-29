import React from 'react';
import { Route, Router, Redirect, Switch } from 'react-router-dom';
import App from './App';
import Callback from './Callback/Callback.js';
import Auth from './Auth/Auth.js';
import history from './history.js';
import User from './pages/User/User.js';
import Navbar from './components/NavBar/NavBar';
import Bank from './pages/Bank/Bank.js';
import MapApp from './pages/MapApp/index.js';
import FloatingActionButtons from './components/Button/Button.js';

const auth = new Auth();

const handleAuthentication = ({location}) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
}

export const makeMainRoutes = () => {
  return (
      <Router history={history}>
        <div>
        <Route path="/callback" render={(props) => {
            handleAuthentication(props);
            return <Callback {...props} /> 
          }}/>
          
          <Route path="/" render={(props) => <App auth={auth} {...props} />} />
          <Route path="/home" render={(props) => (
            !auth.isAuthenticated() ? (
              <Redirect to="/"/>
            ) : (
              <MapApp auth={auth} {...props} />
            )
          )} /> 
          <Route path="/bank" render={(props) => (
            !auth.isAuthenticated() ? (
              <Redirect to="/"/>
            ) : (
              <Bank auth={auth} {...props} />
            )
          )} /> 
          <Route path="/user" render={(props) => (
            !auth.isAuthenticated() ? (
              <Redirect to="/"/>
            ) : (
              <User auth={auth} {...props} />
            )
          )} /> 
          <Route path='/' render={(props)=> <FloatingActionButtons auth={auth}{...props} /> }/>

          
        </div>
      </Router>
  );
}
