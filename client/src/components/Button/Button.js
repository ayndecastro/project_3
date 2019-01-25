import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import FaceIcon from '@material-ui/icons/Face';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit,
    backgroundColor: "#001f3f",
    color: "#7FDBFF"
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
  text: {
    paddingTop: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
  },
  paper: {
    paddingBottom: 50,
  },
  list: {
    marginBottom: theme.spacing.unit * 2,
  },
  subHeader: {
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    top: 'auto',
    bottom: 0,
    backgroundColor: "#1b1b1b"
  },
  toolbar: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
    backgroundColor: "#001f3f",
    color: "#7FDBFF"
  }
});

class FloatingActionButtons extends React.Component {

  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  async componentWillMount() {

    const { renewSession } = this.props.auth;

    if (localStorage.getItem('isLoggedIn') === 'true') {
      renewSession();
    }
  }

  render() {

    const { classes } = this.props;
    // console.log(this.props.auth);
    // console.log(classes)
    const { isAuthenticated } = this.props.auth;

    return (
      <div>
        <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>

        <Fab aria-label="Map" className={classes.fab} onClick={this.goTo.bind(this, 'home')} >
          {/* <Link to="/home"> */}
            <FaceIcon />
          {/* </Link> */}
        </Fab>

        { isAuthenticated() && (
          <Fab aria-label="User" className={classes.fab} onClick={this.goTo.bind(this, 'user')}>
            {/* <Link to="/user"> */}
              <FaceIcon />
            {/* </Link> */}
          </Fab>
        )
        }

        { isAuthenticated() && (
          // <Link to="/bank">
            <Fab variant="extended" aria-label="Bank" className={classes.fab} onClick={this.goTo.bind(this, 'bank')}>
              Bank
        </Fab>
          // </Link>
        )
        }

        { !isAuthenticated() && (
          // <Link to="/login">
            <Fab variant="extended" aria-label="Bank" className={classes.fab} onClick={this.login.bind(this)}>
              login
        </Fab>
          // </Link>
        )
        }
        { isAuthenticated() && (
          // <Link to="/logout">
            <Fab variant="extended" aria-label="Bank" className={classes.fab}  onClick={this.logout.bind(this)}>
              logout
        </Fab>
          // </Link>
          )
        }
        
        </Toolbar>
      </AppBar>

      </div>
    );
  }
}

FloatingActionButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FloatingActionButtons);