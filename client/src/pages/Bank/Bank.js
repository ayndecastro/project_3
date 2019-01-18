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

const theme = createMuiTheme({
  root: {
    backgroundColor: "#424242",
  },
  container: {
    paddingTop: "50px",
    backgroundColor: "#ffffff"
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

  render() {
    return (
      <MuiThemeProvider theme={theme} >
        <CssBaseline />
        <div className="background">
        <div className={theme.root}>
          <Grid container spacing={24} className={theme.container}>
            <Grid item xs={2}>
            </Grid>
            <Grid item xs={8}>
              <Paper>
              I AM WORKING
              </Paper>
            </Grid>
            <Grid item xs={2}>
            </Grid>
          </Grid>
        </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default MapApp;
