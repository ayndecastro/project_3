import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
  snackbar: {
    margin: theme.spacing.unit,
    width: "100%",
    minWidth: "95%"
  },
});

function LongTextSnackbar(props) {
  const { classes } = props;
  const message = {
    

  }

  return (
    <div>
      <SnackbarContent className={classes.snackbar}
      message={props.details} 
      action={"$" + props.cost}
       />
      
    </div>
  );
}

LongTextSnackbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LongTextSnackbar);
