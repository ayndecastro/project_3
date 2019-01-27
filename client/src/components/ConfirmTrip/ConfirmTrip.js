import React, { Component } from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Fab from '@material-ui/core/Fab';

const styles = theme => ({
  root: {
    backgroundColor: "#1b1b1b",
    marginRight: theme.spacing.unit * 1,
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
    backgroundColor: "#1b1b1b"
  },
  info: {
      padding: theme.spacing.unit * 2,
      marginTop: theme.spacing.unit,
      transition: '.02s',
      color: "#ffffff"
  },
  infoHead: {
    paddingRight: theme.spacing.unit,
    marginTop: theme.spacing.unit,
    backgroundColor: "#1b1b1b",
    color: "#ffffff"
  },
  fab: {
    margin: theme.spacing.unit,
    backgroundColor: "#c3fdff"
  }
});


class Confirm extends Component {

  state = {
  }
  
  handleConfirm = () => {
    this.props.handleDateConfirm(this.props.totalCost, this.props.countryName, this.props.dailyIncrement, this.props.startDate, this.props.endDate);
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
      <Typography variant="h4" className={this.props.classes.infoHead}>
      Confirm your trip
      </Typography>
      <div >

      <Paper className={this.props.classes.infoHead}>
      <Typography variant="h5" className={this.props.classes.info}>
      Starting {this.props.startDate}, ${this.props.dailyIncrement} will be contributed towards your trip, for {this.props.difference} days.
      </Typography>
     
      <Divider variant="middle" />
 
      <Typography variant="h6" className={this.props.classes.info}>
      Total cost: ${this.props.totalCost}
      </Typography>

      <Divider variant="middle" />
 
      <Typography variant="h6" className={this.props.classes.info}>
      Departure: {this.props.endDate}
      </Typography>

      <Divider variant="middle" />
 
      <Typography variant="h6" className={this.props.classes.info}>
      Country: {this.props.countryName}
      </Typography>

      <Grid container>
      <Grid item xs={9}></Grid>
      <Grid item xs={2} align="left">
        <Fab variant="extended" aria-label="Delete" className={this.props.classes.fab} onClick={this.handleConfirm}>
            Confirm
        </Fab>
      </Grid>
      <Grid item xs={1}></Grid>
      </Grid>

      </Paper>
      </div>
      
      
      
      </Paper>
      </div>
  );
  }
}

export default withStyles(styles)(Confirm);