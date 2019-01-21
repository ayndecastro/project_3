import React from 'react';
import { Route, Router, Redirect, Switch } from 'react-router-dom';
import App from './App';
import Home from './home';
import Callback from './Callback/Callback';
import Auth from './Auth/Auth';
import history from './history';
import User from './pages/User/User';
import Navbar from './components/NavBar/NavBar';
import Bank from './pages/Bank/Bank'

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
          
          <Route path="/" render={(props) => <App auth={auth} {...props} />} />
          <Route path="/home" render={(props) => <Home auth={auth} {...props} />} />
          <Route path="/home" render={(props) => <Bank auth={auth} {...props} />} />
          <Route path="/bank" render={(props) => <Bank auth={auth} {...props} />} />
          <Route path="/user" render={(props) => <User auth={auth} {...props} />} />
          <Route path="/" render={(props) => <Navbar auth={auth} {...props} />} />

          <Route path="/callback" render={(props) => {
            handleAuthentication(props);
            return <Callback {...props} /> 
          }}/>
        </div>
      </Router>
  );
}
