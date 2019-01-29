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
    paddingBottom: "80px",
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
  background: {
    default: "#009a9b",
    paper: "#39CCCC"
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

  componentDidUpdate() {
    if(this.state.post === true) {
      this.spendingGet();
      this.setState({
        post: false
      })
    }

    if(this.state.get === true) {
      this.currentWallet()
      this.setState({
        get: false
      })
    }
  }

  

  spendingPost(spending){

    let oldToken = localStorage.getItem('access_token');
    const headers = { 'Authorization': `Bearer ${oldToken}`}
    axios.post(`${API_URL}/createSpending`,spending,{headers})
    .then(res => this.setState({ post: true}))
    .catch(err=>console.log(err));
  }

  spendingGet () {
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
     axios.get(`${API_URL}/spending/${user_id}`, { headers })
       .then(response => 
          this.setState({ data: response.data,
          get: true})
         )
       .catch(error =>
         this.setState({ data: error.message })
         );
       // console.log(headers)

       
     }
  }

  currentWallet = () => {
    if(this.state.countryData[0]){
      let spendingTotal = 0;

      this.state.data.forEach(element => {
        spendingTotal = spendingTotal + element.spending
      });

      let data = Object.assign([], this.state.countryData[0]);
      data.budgetToUpdate = data.budget - spendingTotal;

      const getId = this.state.profile.sub.split('|')[1];
      const user_id = getId.toString();
      console.log(user_id)
      console.log(oldToken)
      const headers = { 'Authorization': `Bearer ${oldToken}`}

      axios.patch(`${API_URL}/updateCurrent/${this.state.countryData[0]._id}`,
          {$set: {budgetToUpdate: data.budgetToUpdate}},{headers})
          .then(res => console.log(res))
          .catch(err=>console.log(err))

          
      this.setState(data);
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
    axios.get(`${API_URL}/viewCurrent/${user_id}`, { headers })
      .then(response => 
        this.setState({ countryData: response.data})
        )
        .catch(error => this.setState({ data: error.message }));
      // console.log(headers)
    }
  }

  handleAddClick = (details, cost) => {

      const { getAccessToken } = this.props.auth;
      const {userProfile} = this.props.auth;

      // console.log("user.js")
        let data = Object.assign([], this.state.data);
        data.wallet = data.wallet - parseInt(cost);
        // console.log(data)
        let obj = {
            spendingName: details,
            spending: cost,
            user_id: userProfile.sub.split('|')[1]
        }
        data.push(obj)

      //if deducted more than current budget
          this.setState(data);
          this.spendingPost(obj)
  }

  onClick = () => {
    console.log(this.state.data[0])
  }

  render() {
    console.log(this.state)
    const {profile} = this.state;
    console.log("spending: ", this.state);

    return (
        
        <div className={this.props.classes.root}>
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

              <Grid item xs={1}>
              </Grid>
                  
              <Grid item xs={12} lg={10} className={this.props.paper}>
                
                    {this.state.data && this.state.countryData[0] &&

                        <Drawer 
                        className={this.props.classes.mainContainer}
                        countryName={this.state.countryData[0].country}
                        wallet= {this.state.countryData[0].budgetToUpdate}
                        totalCost= {this.state.countryData[0].budget}
                        addClick = {this.handleAddClick}
                        spending = {this.state.data}
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
