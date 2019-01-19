import React, { Component } from "react";
import "./Bank.css"
import Map from "../../components/Map/Map";
import Cost from "../../components/Cost/Cost";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Progress from "./../../components/Progress/Progress"
import BankButtons from "../../components/BankButtons/BankButtons"
import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const styles = theme => ({
  root: {
    backgroundColor: "#424242",
  },
  container: {
    marginTop: "25px",
    backgroundColor: "#ffffff"
  },
  mainContainer: {
    minHeight: "70vh"
  },
  palette: {
    primary: {
      light: "#373737",
      main: "#1b1b1b",
      dark: "#000000",
      contrastText: "#ffffff"
    },
    secondary: {
      light: "#c3fdff",
      main: "#7FDBFF",
      dark: "#001f3f",
      contrastText: "#000000"
    },
    type: "dark",
    root: {
      flexGrow: 1,
      backgroundColor: "#62727b"
    },
    paper: {},
    background: {
      default: "#373737",
      paper: "#1b1b1b"
    },
    textPrimary: "#1b1b1b"
  },
  progress: {
    width: "100%"
  },
  progressBar: {
    width: "100%"
  }
});

let data = [{
  budget: 100,
  totalCost: 10000,
  countryName: "United States",
  dailyIncrement: 100,
  startDate:  "01/20/2019",
  endDate:  "01/26/2019"
},
{
  budget: 0,
  totalCost: 978,
  countryName: "Canada",
  dailyIncrement: 163,
  startDate: "01/20/2019",
  endDate: "01/26/2019"
}
]

class Bank extends Component {

  constructor(props) {
    super(props)
    this.handleUpdate.bind(this)
  }
  
  state = {
  }

  componentDidMount() {
    this.setState({
      data: data
    })
  }

  handleGoButton() {
    //NEED POST
    console.log("go from bank")
  }

  handleUpdate = (amount, countryName, index, method) => {
    //NEED UPDATE
    console.log("countryName: ", countryName)
    console.log("update from bank: ", amount)
    console.log("index: ", index);
    console.log("method: ", method)
    //UPDATE COUNTRY WALLET TO + OR - AMOUNT
    let data = Object.assign({}, this.state);
    data.data[index].budget = data.data[index].budget + parseInt(amount);
    this.setState(data);
  }

  render() {
    return (
        
        <div>
          <CssBaseline />
          <div className={this.props.classes.root}>

            <Grid container spacing={24} className={this.props.classes.container}>

              <Grid item xs={0} lg={1}>
              </Grid>
                  
              <Grid item xs={12} lg={10}>
                <Paper className={this.props.classes.mainContainer}>
                  {this.state.data && 
                    this.state.data.map((country, index)=>{
                      console.log(this.state)
                      return(

                        <ExpansionPanel className={this.props.classes.progress}>
                          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h4" className={this.props.classes.progressTitle} >{country.countryName}</Typography>
                          </ExpansionPanelSummary>
                          <ExpansionPanelDetails>
                            <div className={this.props.classes.progressBar}>

                              <Progress
                                countryName= {country.countryName}
                                totalCost= {country.totalCost}
                                budget= {country.budget}
                                startDate= {country.startDate}
                                endDate= {country.endDate}
                                dailyIncrement= {country.dailyIncrement}
                                percent={(country.budget/country.totalCost)*100}
                              />

                              <BankButtons
                                budget = {country.budget}
                                totalCost = {country.totalCost}
                                handleGo = {this.handleGoButton}
                                handleUpdate = {this.handleUpdate}
                                countryName = {country.countryName}
                                index={index}
                              />

                            </div>  
                          </ExpansionPanelDetails>
                        </ExpansionPanel>
                      
                      )
                      })
                  }
                </Paper>
              </Grid>
                
              <Grid item xs={0} lg={1}>
              </Grid>

            </Grid>
          </div>
        </div>
    );
  }
}

export default withStyles(styles)(Bank);
