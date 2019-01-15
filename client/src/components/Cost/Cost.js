import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import CostTable from '../CostTable'

const styles = theme => ({
  root: {
    backgroundColor: "#62727b"
  },
  appBar: {
    position: 'relative',
    padding: '5px'
  },
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
  heroUnit: {
    backgroundColor: theme.palette.primary,
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
  },
  tableContainer: {
    margin: theme.spacing.unit * 5,
    flexGrow: 1,
  },
  button: {
    backgroundColor: theme.palette.background.paper,
    margin: theme.spacing.unit * 5,
    flexGrow: 1,
  }, 
});

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];


function Cost(props) {
  const { classes } = props;

  return (
    <React.Fragment className={classes.root}>
      <CssBaseline />
      <AppBar position="static" className={classes.appBar}>
          <Typography component="h2" variant="h3" align="center" color="textPrimary"  >
              United States
            </Typography>
      </AppBar>
      <main color="secondary">
      <div className={classes.tableContainer} align="center" >
          <CostTable />
          <Button color="inherit" onClick={props.handleGo} className={classes.button} justify="space-between">
        
          Go
          </Button>
          </div>
       
      </main>
    </React.Fragment>
  );
}

Cost.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Cost);