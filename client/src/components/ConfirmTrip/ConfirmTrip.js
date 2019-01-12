import React, { Component } from "react";
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

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
    backgroundColor: theme.palette.primary.main,
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
    backgroundColor: theme.palette.secondary.light,
    margin: theme.spacing.unit * 5,
    flexGrow: 1,
  },
  paper: {
    width: 'auto',
    padding: theme.spacing.unit * 2,
    backgroundColor: theme.palette.primary.main
  },
  info: {
      padding: theme.spacing.unit * 2,
      marginTop: theme.spacing.unit,
      transition: '.02s'
  },
  infoHead: {
    paddingRight: theme.spacing.unit,
    marginTop: theme.spacing.unit,
    backgroundColor: theme.palette.primary.main,
    color: "#ffffff"
  }
});


class Confirm extends Component {

  state = {
  }
  
  handleConfirm = () => {
    console.log(this.props)
    this.props.handleDateConfirm();
  }

  handleChange = () => {
    this.setState({cost: this.props.totalCost})
  }

  render() {
  return (
      <div 
      onChange={this.handleChange}
      className={this.props.classes.root}
      >
      <CssBaseline />
      <Paper className={this.props.classes.paper}>
      <Typography component="h5" variant="h5" >
      Confirm your trip
      </Typography>
      <div >

      <Paper className={this.props.classes.infoHead}>
      <Typography variant="body1" className={this.props.classes.info}>
      Starting {this.props.startDate}, ${this.props.dailyIncrement} will be contributed towards your trip to United States, for {this.props.difference} days.
      </Typography>
     
      <Divider variant="middle" />
 
      <Typography variant="body1" className={this.props.classes.info}>
      Total cost: ${this.props.totalCost}
      </Typography>

      <Divider variant="middle" />
 
      <Typography variant="body1" className={this.props.classes.info}>
      Departure: {this.props.endDate}
      </Typography>

      <Divider variant="middle" />
 
      <Typography variant="body1" className={this.props.classes.info}>
      Daily contribution: ${this.props.dailyIncrement}
      </Typography>
      </Paper>
      </div>
      
      <Grid container>
      <Grid item xs={9}></Grid>
      <Grid item xs={2} align="left">
          <button onClick={this.handleConfirm} className={this.props.classes.button}>
            Confirm
          </button>
      </Grid>
      <Grid item xs={1}></Grid>
      </Grid>
      
      </Paper>
      </div>
  );
  }
}

export default withStyles(styles)(Confirm);