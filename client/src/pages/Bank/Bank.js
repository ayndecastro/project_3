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
import axios from "axios";
import {API_URL} from '../../constants'

const styles = theme => ({
  root: {
    backgroundColor: "#1b1b1b",
    paddingBottom: "100px",
    minHeight: '100vh'
  },
  container: {
    paddingTop: "25px",
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
    const headers = { 'Authorization': `Bearer ${getAccessToken()}`}
    if(user_id.length > 0){
    axios.get(`${API_URL}/viewTrip/${user_id}`, { headers })
      .then(response => 
        // console.log(response)
        this.setState({ data: response.data})
        )
      .catch(error => this.setState({ data: error.message }));
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
    // this.saveCurrent();


  }

 

  // updateProgress(){
  //   let data = {
  //           totalCost: 10000,
  //           country: "Philippines",
  //           date_leave:  "01/24/2019",
  //           date_back:  "01/26/2019",
  //         }
  //   const { getAccessToken } = this.props.auth;
  //   let id = "5c4961efaeca3c39a0c0d46b";
  //   const headers = { 'Authorization': `Bearer ${getAccessToken()}`}
  //   axios.put(`${API_URL}/tripProgress/${id}`, data, { headers })
  //       .then(res=>console.log(res))
  //       .catch(err=>console.log(err))
  // }

  //save current trip
// saveCurrent(){
//     let data = {
//       budget: 10000,
//       budgetToUpdate: 10000,
//       user_id: '108926452875239055842',
//       country: "philippines",
//       date_leave:  "01/20/2019",
//       date_back:  "01/26/2019",
//       trip_photo:["https://i.pinimg.com/originals/08/a9/0a/08a90a48a9386c314f97a07ba1f0db56.jpg"]
//     }

//     const { getAccessToken } = this.props.auth;
//     console.log(getAccessToken)
//     const headers = { 'Authorization': `Bearer ${getAccessToken()}`}
//     axios.post(`${API_URL}/createTrip/current`,data,{headers})
//     .then(res=>console.log(res))
//     .catch(err=>console.log(err));
//   }

  handleGoButton = (countryName, totalCost, date_leave, date_back) => {
    console.log(countryName, totalCost, date_leave, date_back)

    let data = {
      country: countryName,
      user_id: this.state.profile.sub.split('|')[1],
      date_leave: date_leave,
      date_back: date_back,
      budget: totalCost,
      budgetToUpdate: totalCost
    }

    const { getAccessToken } = this.props.auth;
    const headers = { 'Authorization': `Bearer ${getAccessToken()}`}
    axios.post(`${API_URL}/createTrip/Current`,data
    ,{headers})
    .then(res => this.redirect(res))
    .catch(err=>console.log(err))

  }

  redirect = (res) => {
    if(res.status === 200) {
    this.props.history.push(`/user`)
    }
    else {
      console.log(res)
    }
  }

  handleUpdate = (amount, countryName, index, method, id) => {
    //NEED UPDATE
    console.log("countryName: ", countryName)
    console.log("update from bank: ", amount)
    console.log("index: ", index);
    console.log("method: ", method)

    const { getAccessToken } = this.props.auth;
    const headers = { 'Authorization': `Bearer ${getAccessToken()}`}


    //UPDATE COUNTRY WALLET TO + OR - AMOUNT
    if(method == 'add') {
      let data = Object.assign({}, this.state);
      data.data[index].budget = data.data[index].budget + parseInt(amount);
      if(data.data[index].budget >= data.data[index].totalCost) {
        data.data[index].budget = data.data[index].totalCost

        axios.patch(`${API_URL}/updateTrip/${id}`,
        {$set: {budget: data.data[index].totalCost}},{headers})
        .then(res => console.log(res))
        .catch(err=>console.log(err))
        this.setState(data);
      }
      else {
        this.setState(data);

        axios.patch(`${API_URL}/updateTrip/${id}`,
        {$set: {budget: data.data[index].budget}},{headers})
        .then(res => console.log(res))
        .catch(err=>console.log(err))
      }
    }


    if(method == 'minus') {
    let data = Object.assign({}, this.state);
    data.data[index].budget = data.data[index].budget - parseInt(amount);

      //if deducted more than current budget
      if(data.data[index].budget <= 0) {
        data.data[index].budget = 0
        axios.patch(`${API_URL}/updateTrip/${id}`,
        {$set: {budget: 0}},{headers})
        .then(res => console.log(res))
        .catch(err=>console.log(err))

          this.setState(data);
          }
      else
          {

            axios.patch(`${API_URL}/updateTrip/${id}`,
            {$set: {budget: data.data[index].budget}},{headers})
            .then(res => console.log(res))
            .catch(err=>console.log(err))
            this.setState(data);
          }
      }
  }

  render() {

    const {profile} = this.state;
    const {data} = this.state;
    // console.log(profile.sub);
    console.log(this.state);
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
                                percent={ 
                                  (country.budget/country.totalCost)*100 + "%"
                                }
                              

                              />

                              <BankButtons
                                budget = {country.budget}
                                totalCost = {country.totalCost}
                                handleGo = {this.handleGoButton}
                                handleUpdate = {this.handleUpdate}
                                countryName = {country.country}
                                index={index}
                                id={country._id}
                                date_leave={country.date_leave}
                                date_back={country.date_back}
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
