import React, { Component } from "react";
import Avatar from "../../components/Avatar/Avatar"
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
    backgroundColor: "#1b1b1b",
    marginBottom: "100px",
    minHeight: '100vh'
  },
  container: {
    marginTop: "25px",
    backgroundColor: "#1b1b1b",
    color: "#39CCCC"
  },
  mainContainer: {
    minHeight: "70vh",
    backgroundColor: "#424242",
    color: "#39CCCC"
  },
  progress: {
    width: "100%",
    backgroundColor: "#39CCCC",
    color: "#39CCCC"
  },
  progressBar: {
    width: "100%"
  },
  progressTitle: {
    backgroundColor: "#39CCCC",
  },
  paper: {
    borderColor: "#000000"
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
},
{
  budget: 0,
  totalCost: 978,
  countryName: "Canada",
  dailyIncrement: 163,
  startDate: "01/20/2019",
  endDate: "01/26/2019"
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

let avatar = {
  "given_name" : "Ayn",
  "family_name": "Decastro",
  "nickname": "ayndecastro",
  "name": "Ayn Decastro",
  "picture": "https://i.pinimg.com/originals/08/a9/0a/08a90a48a9386c314f97a07ba1f0db56.jpg",
  "gender": "male",
  "locale": "en",
  "update_at": "2019-01-19"
}

class Bank extends Component {

  // constructor(props) {
  //   super(props)
  //   this.handleUpdate.bind(this)
  // }
  
  // state = {
  // }

  componentDidMount() {
    
    const { userProfile, getProfile } = this.props.auth;
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({
          profile, 
          data: data,
          title: "Saved Trips" });
      });
    } else {
      this.setState({ 
        profile: userProfile, 
        data: data,
        title: "Saved Trips" });
    }
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
    if(method == 'add') {
      let data = Object.assign({}, this.state);
      data.data[index].budget = data.data[index].budget + parseInt(amount);
      if(data.data[index].budget >= data.data[index].totalCost) {
        data.data[index].budget = data.data[index].totalCost
        this.setState(data);
      }
      else {
        this.setState(data);
      }
    }


    if(method == 'minus') {
    let data = Object.assign({}, this.state);
    data.data[index].budget = data.data[index].budget - parseInt(amount);

      //if deducted more than current budget
      if(data.data[index].budget <= 0) {
        data.data[index].budget = 0
          this.setState(data);
          }
      else
          {
            this.setState(data);
          }
      }
  }

  render() {
    const {profile} = this.state;
    console.log(profile)
    return (
        
        <div className={this.props.classes.root}>
          <CssBaseline />
          <div>

            <Grid container spacing={24} className={this.props.classes.container}> 
            <Grid item lg={1}></Grid>

            {this.state.avatar && 
              
              <Grid item xs={12} lg={10}>
                <Avatar 
                name = {profile.name}
                picture = {profile.picture}
                title = {this.state.title}
                />
              </Grid>
              
            }
            <Grid item lg={1}></Grid>

              <Grid item xs={0} lg={1}>
              </Grid>
                  
              <Grid item xs={12} lg={10} className={this.props.paper}>
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

            </Grid>
          </div>
        </div>
    );
  }
}

export default withStyles(styles)(Bank);
