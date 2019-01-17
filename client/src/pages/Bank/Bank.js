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
import Hidden from "@material-ui/core/Hidden";
import API from "../../components/utils/API";
import Image from "./Background.png";

const theme = createMuiTheme({
  root: {
    backgroundColor: "#424242",
    backgroundImage: `url(${Image})`,
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
  pageTwo: {
    marginTop: "50px"
  },
  divider: {
    color: "#bcbcbc "
  }
});

const object = {
  0: "103.41421408533",
  1: "146.93497122964",
  2: "36.364286572241",
  3: "41.838287869865",
  4: "13.928843427636",
  5: "49.327713952322",
  6: "42.288622625595",
  7: "62.368047579868",
  8: "99.444544413987",
  9: "93.854914261402",
  10: "19.278459402759",
  11: "12.095286741121",
  12: "207.08620503053"
};

class MapApp extends Component {
  state = {
    mapClicked: false,
    goClicked: false,
    costGrid: 12,
    dateChosen: false
  };

  componentDidMount() {
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
    console.log(e);
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
    console.log(this.state.country.data);
    let costs = [];
    this.state.country.data.costs.forEach(cost => {
      costs.push(parseInt(cost.value_midrange));
    });
    this.setState({ costs });
  }

  handleGo = () => {
    this.setState({
      goClicked: true,
      costGrid: 6
    });
  };

  handleDate = date => {
    console.log("start", date.startDate.format("MM/DD/YYYY"));
    console.log("end", date.endDate.format("MM/DD/YYYY"));

    let startDate = date.startDate.format("MM/DD/YYYY");
    let endDate = date.endDate.format("MM/DD/YYYY");
    let difference = date.endDate.diff(date.startDate, "days");
    let totalCost = Math.round(difference * this.state.costs[12]);
    let dailyIncrement = Math.round(
      (difference * this.state.costs[12]) / difference
    );
    console.log("difference", difference);
    console.log("cost", totalCost);
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

  handleConfirm = () => {
    this.setState({
      goClicked: false
    });
  };

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <div className={theme.root}>
          <Map justify="center" mapClicked={this.handleClick} />

          <Grid container spacing={24} justify="flex-start">
            <Grid item xs={1} />
            <Grid item xs={11} md={6} lg={6}>
              {this.state.costs && (
                <Paper square={false}>
                  <Cost
                    costs={this.state.costs}
                    className={theme.fixedConfirm}
                    countryName={this.state.country.data.info.name}
                    categories={this.state.categories}
                  />

                  <hr />

                  <Survey
                    className={theme.survey}
                    handleGo={this.handleGo}
                    handleSelect={this.handleDate}
                  />
                </Paper>
              )}
            </Grid>

            <Hidden only={["md", "lg"]}>
              <Grid item xs={1} sm={1} />
            </Hidden>
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
        <br />
        <br />
        <br />
      </MuiThemeProvider>
    );
  }
}

export default MapApp;
