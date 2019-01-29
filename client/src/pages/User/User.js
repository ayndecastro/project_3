import React, { Component } from "react";
import Avatar from "../../components/Avatar/Avatar"
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles } from '@material-ui/core/styles';
import Drawer from "../../components/Drawer/Drawer"
import axios from "axios";
import {API_URL} from '../../constants'

const styles = theme => ({
  root: {
    backgroundColor: "#1b1b1b",
    paddingBottom: "100px",
    minHeight: '100vh',
    
  },
  container: {
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
  },
  heading: {
      padding: "5px",
      backgroundColor: "#39CCCC",
      color: "#000000"
  },
  Divider: {

  }
});

let data = {
  budgetToUpdate: 10000,
  budget: 10000,
  country: "United States",
  user_id: "108926452875239055842",
  date_leave:  "01/20/2019",
  date_back:  "01/26/2019",
  spending: [
      {
        Details: "Ice Cream",
        Cost: 2,
        CreatedAt: '1/1/2019'
      },
      {
        Details: "Taxi",
        Cost: 4,
        CreatedAt: '1/1/2019'
      }
    ]
}

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

class User extends Component {

  componentWillMount() {
    const { userProfile, getUserInfo, userInfo } = this.props.auth;
		if (this.props.auth.isAuthenticated()) {
			let oldToken = localStorage.getItem('access_token');
			let newProfile;
			this.props.auth.lock.getUserInfo(oldToken, (err, profile) => {
				console.log(profile);
				newProfile = profile;
				this.setState({ profile: newProfile, sub: newProfile.sub.split('|').pop() });
				// API.saveUser({
				// 	sub: this.state.sub,
				// }).then(this.fetchUser);
        // this.fetchUser();
        
        
    this.viewCurrent()
    this.spendingGet();
			});
		} else {
      this.setState({ 
        profile: userProfile});
    }


  }
  state= {

  }

  spendingPost(){
    let spending = {
      spending: 13,
      spendingName: 'taxi',
      user_id: '108926452875239055842'
    }

    let oldToken = localStorage.getItem('access_token');
    const headers = { 'Authorization': `Bearer ${oldToken}`}
    axios.post(`/createSpending`,spending,{headers})
    .then(res=>console.log(res))
    .catch(err=>console.log(err));
  }

  spendingGet(){
     // event.preventDefault();
    // const { getAccessToken } = localStorage.getItem('access_token');;
    // const {userProfile} = this.props.auth;
    let oldToken = localStorage.getItem('access_token');
			
    // console.log(this.state.profile.sub.split('|')[1])
    const getId = this.state.profile.sub.split('|')[1];
    const user_id = getId.toString();
    console.log(user_id)
    console.log(oldToken)
    const headers = { 'Authorization': `Bearer ${oldToken}`}
    if(user_id.length > 0){
     axios.get(`/spending/${user_id}`, { headers })
       .then(response => 
         console.log(response)
        //  this.setState({ data: response.data})
         )
       .catch(error =>
         this.setState({ data: error.message })
         );
       // console.log(headers)
     }
  }

  viewCurrent = () => {
    // event.preventDefault();
    // const { getAccessToken } = localStorage.getItem('access_token');;
    // const {userProfile} = this.props.auth;
    let oldToken = localStorage.getItem('access_token');
			
    // console.log(this.state.profile.sub.split('|')[1])
    const getId = this.state.profile.sub.split('|')[1];
    const user_id = getId.toString();
    console.log(user_id)
    console.log(oldToken)
    const headers = { 'Authorization': `Bearer ${oldToken}`}
    if(user_id.length > 0){
    axios.get(`/viewCurrent/${user_id}`, { headers })
      .then(response => 
        this.setState({ data: response.data})
        )
        .catch(error => this.setState({ data: error.message }));
      // console.log(headers)
    }
  }

  handleAddClick = (details, cost) => {
      // console.log("user.js")
        let data = Object.assign({}, this.state.data);
        data.wallet = data.wallet - parseInt(cost);
        // console.log(data)
        let obj = {
            Details: details,
            Cost: cost
        }
        data.spending.push(obj)

      //if deducted more than current budget
          this.setState(data);
  }

  onClick = () => {
    console.log(this.state.data[0])
  }

  render() {
    console.log(this.state)
    const {profile} = this.state;
    console.log("spending: ", this.state.data);

    return (
        
        <div className={this.props.classes.root}>
        <button onClick={this.onClick}></button>
          <CssBaseline />
          <div>

            <Grid container spacing={24} className={this.props.classes.container}> 
            <Grid item xs={0}  lg={1}></Grid>

            {this.state.profile && 
              
              <Grid item xs={12} lg={10}>
                <Avatar 
                name = {profile.name}
                picture = {profile.picture}
                title = {this.state.title}
                />
              </Grid>
              
            }
            
            <Grid item xs={0} lg={1}></Grid>
            <Grid item xs={0}  lg={1}></Grid>
            <Grid item xs={0}  lg={1}></Grid>

            {this.state.data &&

                <Grid item xs={12} lg={10}>

                </Grid>

            }

              <Grid item xs={0} lg={1}>
              </Grid>
                  
              <Grid item xs={12} lg={10} className={this.props.paper}>
                
                    {this.state.data &&

                        <Drawer 
                        date_leave={this.state.data[0].date_leave}
                        date_back={this.state.data[0].date_back}
                        className={this.props.classes.mainContainer}
                        countryName={this.state.data[0].country}
                        wallet= {this.state.data[0].budgetToUpdate}
                        totalCost= {this.state.data[0].budget}
                        addClick = {this.handleAddClick}
                        spending = {this.state.data[0].spending}
                        />
                        
                    }

              </Grid>

            </Grid>
          </div>
        </div>
    );
  }
}

export default withStyles(styles)(User);
