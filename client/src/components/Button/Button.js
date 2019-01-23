import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import FaceIcon from '@material-ui/icons/Face';
import { Link } from 'react-router-dom';
import Auth from "../../Auth/Auth"

const auth = new Auth();

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

  render(){
  const { classes } = this.props;
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