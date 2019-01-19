import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import { Progress } from 'react-sweet-progress';
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import "react-sweet-progress/lib/style.css";
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider'

const styles = theme => ({
    root: {
      backgroundColor: "#424242",
      width: "80%"
    },
    container: {
      marginTop: "25px",
      backgroundColor: "#ffffff"
    },
    info: {
      margin: "10px"
    },
    infoHead: {
      padding: '10px',
      margin: '5px'
    },
    progress: {
      padding: "2px"
    }
  });

  class Bank extends Component {

    render() {
      return (
          <div>
        
              <Paper className={this.props.classes.infoHead}>
              <Typography variant="h5" className={this.props.classes.info}>
              Currently Saved: {this.props.budget} out of {this.props.totalCost}
              </Typography>
             
              <Divider variant="middle" />
         
              <Typography variant="h6" className={this.props.classes.info}>
              Departure: {this.props.endDate}
              </Typography>
        
              <Divider variant="middle" />
         
              <Typography variant="h6" className={this.props.classes.info}>
              Daily contribution: ${this.props.dailyIncrement}
              </Typography>
        
              <Divider variant="middle" />
         
              <Typography variant="h6" className={this.props.classes.info}>
              Country: {this.props.countryName}
              </Typography>
              </Paper>

              
              <Paper>
                
              {console.log("percent ", this.props.percent)}
              <Progress percent={this.props.percent} className={this.props.Progress} />
            </Paper>
          </div>
      );
    }
  }
  
  export default withStyles(styles)(Bank);