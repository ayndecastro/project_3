import React, { Component } from "react";
import Avatar from "../../components/Avatar/Avatar"
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles } from '@material-ui/core/styles';
import logo from './safeTravelsLogo.png';
import Image from 'material-ui-image';
import Paper from '@material-ui/core/Paper'
import backGround from './Background1.jpg'
import Card from './Card.js';
import chooseTrip from './undraw_travelers_qlt1.png';
import financialData from './undraw_financial_data_es63.png';
import note from './undraw_note_list_etto.png'
import { Typography, Divider } from "@material-ui/core";

const styles = theme => ({
  root: {
    minHeight: '100vh',
    backgroundColor: "#1b1b1b",
    paddingBottom: '100px',
  },
  title: {
    backgroundColor: "#1b1b1b",
    height: '100vh',
    width: '100wh',
    zIndex: '0',
  },
  background: {
    default: "#1b1b1b",
    paper: ""
  },
  paperContainer: {
    },
  card: {
      minHeight: '30vh',
      backgroundColor: "#1b1b1b",
  },
  logo: {
      position: 'fixed',
      height: '10%',
      width: 'auto'
  },
  bg: {
      zIndex: -99
  },
  subtitle: {
      marginLeft: '50px',
      marginRight: '50px',
      padding: '5px',
      paddingRight: '20px',
      paddingLeft: '20px',
      backgroundColor: "#1b1b1b",
      textColor: "#39CCCC"
  },
  textSub: {
    color: "#009a9b",
    listStyle: 'none',
    textIndent: '20px'
  },
  textTitle: {
      color:"#78ffff",
      marginBottom: 0
  },
  divider: {
    backgroundColor:"#39cccc",
  }

});

class User extends Component {

  componentWillMount() {
  }

  render() {
      

    return (
        
        <div className={this.props.classes.root}>
            <Grid container spacing={8}>
                <Grid item xs={12}>
                <Paper>
                    <img 
                        src={backGround}
                        className={this.props.classes.title}
                    />
                <Paper>
                    <img
                        src={logo}
                        className={this.props.classes.logo}
                    />
                    </Paper>    
                    
                </Paper>
                </Grid>

                <Grid item xs={12}>
                    <Paper elevation={2} className={this.props.classes.subtitle} >
                            <Typography variant="display4" className={this.props.classes.textTitle} gutterBottom >
                                Safe Travels
                            </Typography>
                            <Divider  className={this.props.classes.divider}/>
                            <br></br>
                            <Typography variant="h4" className={this.props.classes.textSub} >
                            Cost of living is going up and it makes it harder to travel.
                            Most of the time, people say “I can never afford anything 
                            like that”. With Safe travels, it can help even the tightest
                            of budgets reach their goal. Traveling is good for the mind 
                            body and soul. Getting out of your comfort zone and seeing 
                            other ways of life and other cultures is important. Our goal
                            is to help people unwind and find adventure to enrich their
                             lives.
                            </Typography>
                    </Paper>
                </Grid>
                <Grid/>

                <Grid item lg={4} md={4} xs={12} className={this.props.classes.card}>
                    <Paper elevation={2} square="true">
                        <Card 
                        title={"Choose Trip"}
                        description={"Access costs details of countries and determine average costs for your next trip!"}
                        image={chooseTrip}
                        boxShadow={3}
                        />
                    
                    </Paper>
                </Grid>
                <Grid item lg={4} md={4} xs={12} className={this.props.classes.card}>
                    <Paper elevation={2} square="true">
                        <Card 
                        title={"Save Up"}
                        description={"Add and Subtract funds to all your selected trips."}
                        image={financialData}
                        />
                
                    </Paper>
                </Grid>
                <Grid item lg={4} md={4} xs={12} className={this.props.classes.card}>
                    <Paper elevation={2} square="true">
                        <Card 
                        title={"Spending Tracker"}
                        description={"Access average costs while traveling and track daily expenses."}
                        image={note}
                        />
                
                    </Paper>
                </Grid>
            </Grid>
            
        </div>
    );
  }
}

export default withStyles(styles)(User);
