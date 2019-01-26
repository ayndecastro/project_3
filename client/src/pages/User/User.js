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
    this.setState({ profile: {},
      data: data,
      title: "Saved Trips"
     });
    const { userProfile, getProfile } = this.props.auth;
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({
          profile });
      });
    } else {
      this.setState({ 
        profile: userProfile});
    }

    this.viewCurrent()
  }

  // spending(){
  //   let spending = {
  //     spending: 1,
  //     spendingName: 'cake',
  //   }

  //   const { getAccessToken } = this.props.auth;
  //   console.log(getAccessToken)
  //   const headers = { 'Authorization': `Bearer ${getAccessToken()}`}
  //   axios.post(`${API_URL}/createSpending`,spending,{headers})
  //   .then(res=>console.log(res))
  //   .catch(err=>console.log(err));
  // }

  viewCurrent = () => {
     // event.preventDefault();
    const { getAccessToken } = this.props.auth;
    const {userProfile} = this.props.auth;
    const getId = userProfile.sub.split('|')[1];
    const user_id = getId.toString();
    const headers = { 'Authorization': `Bearer ${getAccessToken()}`}
    if(user_id.length > 0){
    axios.get(`${API_URL}/viewCurrent/${user_id}`, { headers })
      .then(response => 
        console.log("response", response)
        // this.setState({ data: response.data})
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

  render() {
    
    const {profile} = this.state;

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

              <Grid item xs={0} lg={1}>
              </Grid>
                  
              <Grid item xs={12} lg={10} className={this.props.paper}>
                
                    {this.state.data &&

                        <Drawer 
                        className={this.props.classes.mainContainer}
                        countryName={this.state.data.countryName}
                        wallet= {this.state.data.wallet}
                        totalCost= {this.state.data.totalCost}
                        addClick = {this.handleAddClick}
                        spending = {this.state.data.spending}
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
