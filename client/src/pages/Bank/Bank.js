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
import { borders } from '@material-ui/system';
import Axios from "axios";
import {API_URL} from '../../constants'

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

// let data = [{
//   budget: 100,
//   totalCost: 10000,
//   countryName: "United States",
//   dailyIncrement: 100,
//   startDate:  "01/20/2019",
//   endDate:  "01/26/2019"
// },
// {
//   budget: 0,
//   totalCost: 978,
//   countryName: "Canada",
//   dailyIncrement: 163,
//   startDate: "01/20/2019",
//   endDate: "01/26/2019"
// },
// {
//   budget: 0,
//   totalCost: 978,
//   countryName: "Canada",
//   dailyIncrement: 163,
//   startDate: "01/20/2019",
//   endDate: "01/26/2019"
// },
// {
//   budget: 0,
//   totalCost: 978,
//   countryName: "Canada",
//   dailyIncrement: 163,
//   startDate: "01/20/2019",
//   endDate: "01/26/2019"
// }
// ]

// let avatar = {
//   "given_name" : "Ayn",
//   "family_name": "Decastro",
//   "nickname": "ayndecastro",
//   "name": "Ayn Decastro",
//   "picture": "https://i.pinimg.com/originals/08/a9/0a/08a90a48a9386c314f97a07ba1f0db56.jpg",
//   "gender": "male",
//   "locale": "en",
//   "update_at": "2019-01-19"
// }

class Bank extends Component {

  constructor(props) {
    super(props)
    this.handleUpdate.bind(this)
  }
  state = { 
    profile: {},
    data: {},
    title: "Saved Trips"
   };

   //get all trips in progress
   async getdata(){
    // event.preventDefault();
    const { getAccessToken } = this.props.auth;
    const {userProfile} = this.props.auth;
    const getId = userProfile.sub.split('|')[1];
    const user_id = getId.toString();
    console.log(user_id);
    const headers = { 'Authorization': `Bearer ${getAccessToken()}`}
    if(user_id.length > 0){
    Axios.get(`${API_URL}/viewTrip/${user_id}`, { headers })
      .then(response => 
        // console.log(response)
        this.setState({ data: response.data}) 
        )
      .catch(error => this.setState({ message: error.message }));
      // console.log(headers)
    }
  }

  state= {

  }
  
  componentDidMount() {
    const { userProfile, getProfile } = this.props.auth;
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({
          profile });

          this.getdata(profile.sub)
          this.saveCurrent();
      });
      
    } else {
      this.setState({ 
        profile: userProfile});
    }
    this.getdata()


  }

 

  updateProgress(id){
    // event.preventDefault();
    const { getAccessToken } = this.props.auth;
    const headers = { 'Authorization': `Bearer ${getAccessToken()}`}
    Axios.post(`${API_URL}/updateProgress` + id, {}, { headers })
    // code here
  }

  //save current trip
  saveCurrent(){
    // event.preventDefault();
    const { getAccessToken } = this.props.auth;
    const headers = { 'Authorization': `Bearer ${getAccessToken()}`,user: this.state.profile.sub}
    Axios.post(`${API_URL}/createTrip`, {}, { headers })
    .then(data => this.state({
      country: data.countryName,
      budget: data.totalCost,
      date_leave: data.startDate,
      date_end: data.endDate,
    }))
    // code here
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
    const {data} = this.state;
    // console.log(profile.sub);
    // console.log(this.state);
    // console.log(this.props.auth);
    // console.log(data)


    return (
        
        <div className={this.props.classes.root}>
          <CssBaseline />
          <div>

            <Grid container spacing={24} className={this.props.classes.container}> 
            <Grid item lg={1}></Grid>

            {profile && 
              
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
                {console.log(this.state.data)}
                  {this.state.data && 
                    this.state.data.map((country, index)=>{
                      
                      return(

                        

                        <ExpansionPanel className={this.props.classes.progress}>
                          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h4" className={this.props.classes.progressTitle} >{country.country}</Typography>
                          </ExpansionPanelSummary>
                          <ExpansionPanelDetails>
                            <div className={this.props.classes.progressBar}>

                              <Progress
                                countryName= {country.country}
                                totalCost= {country.totalCost}
                                budget= {country.budget}
                                startDate= {country.date_leave}
                                endDate= {country.date_back}
                                percent={(country.budget/country.totalCost)*100}
                              />

                              <BankButtons
                                // budget = {country.budget}
                                totalCost = {country.totalCost}
                                handleGo = {this.handleGoButton}
                                handleUpdate = {this.handleUpdate}
                                countryName = {country.country}
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
