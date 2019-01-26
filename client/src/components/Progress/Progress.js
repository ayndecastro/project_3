import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import { Progress } from 'react-sweet-progress';
import Typography from "@material-ui/core/Typography";
import "react-sweet-progress/lib/style.css";
import Divider from '@material-ui/core/Divider'

const styles = theme => ({
    root: {
      backgroundColor: "#39CCCC",
      width: "100%",
      color: "#424242"
    },
    container: {
      marginTop: "25px",
      backgroundColor: "#39CCCC"
    },
    info: {
      margin: "10px",
      backgroundColor: "#39CCCC",
      color: "#424242"
    },
    infoHead: {
      padding: '10px',
      margin: '5px',
      backgroundColor: "#39CCCC",
    },
    progress: {
      padding: "2px",
      width: "100%",
      color: "#424242",
      backgroundColor: "#424242",
      outlineColor: 'orange'
    }
  });

  class Bank extends Component {

    render() {
      return (
          <div className={this.props.classes.root}>
          
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
                
              {console.log("percent ", this.props.percent)}
              <Progress
               percent={this.props.percent}
                className={this.props.progress}
                theme={
                  {
                    error: {
                      symbol: this.props.percent + '%',
                      trailColor: "#424242",
                      color: 'red'
                    },
                    default: {
                      symbol: this.props.percent + '%',
                      trailColor: "#424242",
                      color: 'blue'
                    },
                    active: {
                      symbol: this.props.percent + '%',
                      trailColor: "#424242",
                      color: 'orange'
                    },
                    success: {
                      symbol: this.props.percent + '%',
                      trailColor: "#424242",
                      color: 'green'
                    }
                  }
                }
                 />

          </div>
      );
    }
  }
  
  export default withStyles(styles)(Bank);