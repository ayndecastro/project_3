import React, { Component } from "react";
import Map from "../../components/Map/Map";
import Cost from "../../components/Cost/Cost";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Survey from "../../components/Survey/Survey";
import ConfirmTrip from "../../components/ConfirmTrip/ConfirmTrip";
import CssBaseline from "@material-ui/core/CssBaseline";
import Sticky from "react-sticky-el";
import API from "../../components/utils/API";
import axios from "axios";
import {API_URL} from '../../constants'
import * as Scroll from 'react-scroll';
import { Link, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

const theme = createMuiTheme({
  
  Paper: {backgroundColor: "#009a9b",},
  root: {
    backgroundColor: "#009a9b",
    backgroundImage: `url(${Image})`,
  },
  palette: {
    primary: {
      light: "#373737",
      main: "#39CCCC",
      dark: "#000000",
      contrastText: "#000000"
    },
    secondary: {
      light: "#c3fdff",
      main: "#39CCCC",
      dark: "#001f3f",
      contrastText: "#000000"
    },
    type: "dark",
    root: {
      flexGrow: 1,
      backgroundColor: "#009a9b"
    },
    paper: {},
    background: {
      default: "#009a9b",
      paper: "#39CCCC"
    },
    textPrimary: "#39CCCC"
  },
  pageTwo: {
    marginTop: "50px"
  },
  divider: {
    color: "#bcbcbc "
  },
  firstContainer: {
    marginLeft: "20px",
  },
  costContainer: {
    marginLeft: "20px",
  }
});

class MapApp extends Component {


  state = {
    mapClicked: false,
    goClicked: false,
    costGrid: 12,
    dateChosen: false,
    country: '',
    costChosen: false,

  };

  
  componentWillMount() {
    this.setState({ profile: {} });
    const { userProfile, getProfile } = this.props.auth;
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({ profile });
      });
    } else {
      this.setState({ profile: userProfile });
      
    }

    API.getCategories().then(res => {
      let categories = [];
      res.data.data.forEach(data => {
        let dataItem = [data.name, data.description];
        categories.push(dataItem);
      });
      this.setState({
        categories: categories
      });
    });
      
  }


  handleClick = e => {
    console.log(e)
    API.getCountry(e).then(res =>
      this.setState(
        {
          country: res.data,
          mapClicked: true
        },
        this.createCosts
      )
    );

  };

  createCosts() {
    console.log(this.state.country)
    let costs = [];
    this.state.country.data.costs.forEach(cost => {
      costs.push(parseInt(cost.value_midrange));
    });
    this.setState({ costs: costs,
    costChosen: true });

    if(this.state.costChosen) {
    scroller.scrollTo('myScrollToElement', {
      duration: 1500,
      delay: 100,
      smooth: true,
      // containerId: 'ContainerElementID',
      offset: 50
    })
  }
  }

  handleGo = () => {
    this.setState({
      goClicked: true,
      costGrid: 6
    });
  };

  handleDate = date => {
    let startDate = date.startDate.format("MM/DD/YYYY");
    let endDate = date.endDate.format("MM/DD/YYYY");
    let difference = date.endDate.diff(date.startDate, "days");
    let totalCost = Math.round(difference * this.state.costs[12]);
    let dailyIncrement = Math.round(
      (difference * this.state.costs[12]) / difference
    );
    
    if (startDate != endDate) {
      this.setState({
        dateChosen: true,
        startDate: startDate,
        endDate: endDate,
        difference: difference,
        totalCost: totalCost,
        dailyIncrement: dailyIncrement
      });
    }
  };

  handleConfirm = (totalCost, countryName, dailyIncrement, startDate, endDate) => {
    
    // ADD THESE TO BACK END 
    console.log("totalCost: ", totalCost)
    console.log("countryName: ", countryName)
    console.log("dailyIncrement: ", dailyIncrement)
    console.log("startDate: ", startDate)
    console.log("endDate: ", endDate)

    this.setState({
      dateChosen: false,
        totalCost,
        countryName,
        startDate,
        endDate
    })
    this.saveTrip()
    
  };

 

  saveTrip = () => {
    let data={
      user_id: this.state.profile.sub.split('|')[1],
      trips:[{
        country: this.state.country.data.info.name,
      date_leave: this.state.startDate,
      date_back: this.state.endDate,
      totalCost: this.state.totalCost,
      }],
      current: [
        {
          country: "na",
          date_leave: "01/20/2019",
          date_back: "01/26/2019",
          budget: 0,
          budgetToUpdate: 0,
          totalCost: 0,
        }
      ],
        spending: [{
              spending: 0,
              spendingName:'na',
            }],
    }

    const { getAccessToken } = this.props.auth;
    console.log(getAccessToken)
    const headers = { 'Authorization': `Bearer ${getAccessToken()}`}
    axios.post(`${API_URL}/createTrips`,data,{headers})
    .then(res => this.redirect(res))
    .catch(err=>console.log(err))
  }

  redirect = (res) => {
    if(res.status === 200) {
    this.props.history.push(`/bank`)
    }
    else {
      console.log(res)
    }
  }
  

  render() {
    console.log(this.props.auth)
    console.log(this.state)
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <div className={theme.root}>

        <Paper mx={2}>
          <Map justify="center" mapClicked={this.handleClick}/>
        </Paper>

        <div className={theme.Paper}>
          <Grid container spacing={24} justify="flex-start" className={theme.firstContainer}>
            <Grid item xs={.5}></Grid>
            <Grid item xs={11} md={6} lg={6} >
              {this.state.costs && (
                <Paper square={false} className={theme.costContainer} >
                <Element name="myScrollToElement"></Element>
                  <Cost
                    costs={this.state.costs}
                    className={theme.fixedConfirm}
                    countryName={this.state.country.data.info.name}
                    categories={this.state.categories}
                    dailyIncrement={this.state.dailyIncrement}
                  />

                  <Survey
                    className={theme.survey}
                    handleGo={this.handleGo}
                    handleSelect={this.handleDate}
                  />
                </Paper>
              )}
            </Grid>
            
            {this.state.dateChosen && (
              <Grid item xs={11} md={5} lg={5}>
                <Sticky>
                  <div>
                    <br />
                    <ConfirmTrip
                      className={theme.confirmTrip}
                      handleDateConfirm={this.handleConfirm}
                      startDate={this.state.startDate}
                      endDate={this.state.endDate}
                      difference={this.state.difference}
                      totalCost={this.state.totalCost}
                      dailyIncrement={this.state.dailyIncrement}
                      countryName={this.state.country.data.info.name}
                    />
                    <br />
                  </div>
                </Sticky>
              </Grid>
            )}
          </Grid>
        </div>
        </div>
        <br />
        <br />
        <br />
      </MuiThemeProvider>
    );
  }
}

export default MapApp;
