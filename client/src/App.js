import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MapApp from "./pages/MapApp";
import Bank from "./pages/Bank/Bank"
import BottomBar from "./components/NavBar/NavBar";


function App() {
  // goTo(route) {
  //   this.props.history.replace(`/${route}`)
  // }

  // login() {
  //   this.props.auth.login();
  // }

  // logout() {
  //   this.props.auth.logout();
  // }

  // componentDidMount() {
  //   const { renewSession } = this.props.auth;

  //   if (localStorage.getItem('isLoggedIn') === 'true') {
  //     renewSession();
  //   }
  // }
    // const { isAuthenticated, userHasScopes } = this.props.auth;

    return (

      <Router>
    
    <div>
    <BottomBar />
      <Switch>
        <Route exact path="/" component={MapApp} />
        <Route exact path="/bank" component={Bank} />
      </Switch>
    </div>
  </Router>

      // <div>
      //   <Navbar fluid>
      //     <Navbar.Header>
      //       <Navbar.Brand>
      //         <a href="#">Auth0 - React</a>
      //       </Navbar.Brand>
      //       <Button
      //         bsStyle="primary"
      //         className="btn-margin"
      //         onClick={this.goTo.bind(this, 'home')}
      //       >
      //         Home
      //       </Button>
      //       {
      //         !isAuthenticated() && (
      //             <Button
      //               id="qsLoginBtn"
      //               bsStyle="primary"
      //               className="btn-margin"
      //               onClick={this.login.bind(this)}
      //             >
      //               Log In
      //             </Button>
      //           )
      //       }
      //       {
      //         isAuthenticated() && (
      //             <Button
      //               bsStyle="primary"
      //               className="btn-margin"
      //               onClick={this.goTo.bind(this, 'profile')}
      //             >
      //               Profile
      //             </Button>
      //           )
      //       }
      //       {
      //         isAuthenticated() && (
      //             <Button
      //               bsStyle="primary"
      //               className="btn-margin"
      //               onClick={this.goTo.bind(this, 'ping')}
      //             >
      //               Ping
      //             </Button>
      //           )
      //       }
      //       {
      //         isAuthenticated() &&  userHasScopes(['write:messages']) && (
      //             <Button
      //               bsStyle="primary"
      //               className="btn-margin"
      //               onClick={this.goTo.bind(this, 'admin')}
      //             >
      //               Admin
      //             </Button>
      //           )
      //       }
      //       {
      //         isAuthenticated() && (
      //             <Button
      //               id="qsLogoutBtn"
      //               bsStyle="primary"
      //               className="btn-margin"
      //               onClick={this.logout.bind(this)}
      //             >
      //               Log Out
      //             </Button>
      //           )
      //       }
      //     </Navbar.Header>
      //   </Navbar>
      // </div>
    );
  }

export default App;

