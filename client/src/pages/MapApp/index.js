import React, { Component } from "react";
import logo from "../../../src/logo.svg"
import Map from "../../components/Map/Map"
import Cost from "../../components/Cost/Cost"
import { MuiThemeProvider, createMuiTheme, Drawer } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { hidden } from "ansi-colors";
import Survey from "../../components/Survey/Survey"

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#4f5b62",
      main: "#263238",
      dark: "#000a12",
      contrastText: "#ffffff"
    },
    secondary: {
      light: "#f05545",
      main: "#b71c1c",
      dark: "#7f0000",
      contrastText: "#000000"
    },
    type: 'dark',
    root: {
      flexGrow: 1,
      backgroundColor: "#62727b"
    },
    paper: {
      height: 140,
      width: 99,
    }
  }
});

class MapApp extends Component {
  state = {
    mapClicked: false,
    goClicked: false,
    costGrid: 12
  };

  handleClick = () => {
    console.log("clicked")
    this.setState({
      mapClicked: true
    })
  }

  handleGo = () => {
      this.setState({
          goClicked: true,
          costGrid: 6
      })
  }

  render() {
    return (

     <MuiThemeProvider theme={theme} >
        <div className="MapApp" className={theme.root}>
          <Grid container spacing={24}>
          <Grid item xs={12}>
              <Paper className={theme.paper}>
              </Paper>
          </Grid>
            <Grid item xs={12} justify="center">
              <Paper className={theme.paper}>
                <Map justify="center" theme={theme} mapClicked={this.handleClick}
    />
                 
              </Paper>
            </Grid>
          </Grid>
          {this.state.mapClicked && 
            <Grid container spacing={24} justify="flex-start">
              <Grid item xs={this.state.costGrid}>
                <Paper className={theme.paper}>
                <Cost handleGo={this.handleGo} />
                </Paper>
              </Grid>

              {this.state.goClicked &&
                <Grid item xs={6} className={theme.survey}>
                <Paper className={theme.paper}>
                <Survey handleGo={this.handleGo} />
                </Paper>
              </Grid>
              }
            </Grid>
          }
        </div>
        </MuiThemeProvider>
    );
  }
}

export default MapApp;