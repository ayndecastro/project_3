import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import FaceIcon from '@material-ui/icons/Face';
import { Link } from 'react-router-dom';

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit,
    backgroundColor: "#001f3f",
    color: "#7FDBFF"
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
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

  componentWillMount() {
    
    const { renewSession } = this.props.auth;

    if (localStorage.getItem('isLoggedIn') === 'true') {
      renewSession();
    }
  }

  render(){

  const { classes } = this.props;
  console.log(this.props.auth);
  // const { isAuthenticated } = this.props.auth;

  return (
    <div>

      <Fab aria-label="User" className={classes.fab}>
        <Link to="/user">
          <FaceIcon />
        </Link>
      </Fab>

      <Fab aria-label="Map" className={classes.fab}>
        <Link to="/home">
          <FaceIcon />
        </Link>
      </Fab>

      <Link to="/bank">
        <Fab variant="extended" aria-label="Bank" className={classes.fab}>
          Bank
        </Fab>
      </Link>
      <Link to="/login">
        <Fab variant="extended" aria-label="Bank" className={classes.fab}>
          login
        </Fab>
      </Link>

      
    </div>
  );
  }
}

FloatingActionButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FloatingActionButtons);