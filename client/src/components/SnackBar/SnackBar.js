import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import SnackbarContent from '@material-ui/core/SnackbarContent';

const styles = theme => ({
  snackbar: {
    margin: theme.spacing.unit,
    width: "100%",
    minWidth: "95%"
  },
});

function LongTextSnackbar(props) {
  const { classes } = props;

  return (
    <div>
      <SnackbarContent className={classes.snackbar} message={props.details} action={"$" + props.cost} />
      
    </div>
  );
}

LongTextSnackbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LongTextSnackbar);
