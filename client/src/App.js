import React, { Component } from "react";
import Map from "./components/Map/Map";
import NavBar from "./components/NavBar/NavBar";
import "./App.css";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#718792",
      main: "#1c313a",
      dark: "#455a64",
      contrastText: "#ffffff"
    },
    secondary: {
      light: "#ffff74",
      main: "#ffd740",
      dark: "#c8a600",
      contrastText: "#000000"
    },
    root: {
      flexGrow: 1
    },
    paper: {
      height: 140,
      width: 100
    }
  }
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <Paper className={theme.paper}>
                <NavBar />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={theme.paper}>
                <Map justify="center" />
              </Paper>
            </Grid>
          </Grid>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;