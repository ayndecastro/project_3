import React, { Component } from "react";
import Avatar from "../../components/Avatar/Avatar"
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Progress from "../../components/Progress/Progress"
import BankButtons from "../../components/BankButtons/BankButtons"
import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { borders } from '@material-ui/system';
import { Divider } from "@material-ui/core";
import Drawer from "../../components/Drawer/Drawer"

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
  wallet: 10000,
  totalCost: 10000,
  countryName: "United States",
  dailyIncrement: 100,
  startDate:  "01/20/2019",
  endDate:  "01/26/2019",
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

  constructor(props) {
    super(props)
  }
  
  state = {
      title: "Spending Tracker"
  }

  componentDidMount() {
    this.setState({
      data: data,
      avatar: avatar
    })
  }

  handleAddClick = (details, cost) => {
      console.log("user.js")
        let data = Object.assign({}, this.state.data);
        data.wallet = data.wallet - parseInt(cost);
        console.log(data)
        let obj = {
            Details: details,
            Cost: cost
        }
        data.spending.push(obj)

      //if deducted more than current budget
          this.setState(data);
  }

  render() {
    return (
        
        <div className={this.props.classes.root}>
          <CssBaseline />
          <div>

            <Grid container spacing={24} className={this.props.classes.container}> 
            <Grid item xs={0}  lg={1}></Grid>

            {this.state.avatar && 
              
              <Grid item xs={12} lg={10}>
                <Avatar 
                name = {this.state.avatar.name}
                picture = {this.state.avatar.picture}
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
