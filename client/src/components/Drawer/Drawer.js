import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Divider } from "@material-ui/core";
import API from "../utils/API"
import Cost from "../../components/Cost/Cost";
import TextField from "../../components/TextField/TextField"
import Cards from "../Cards/Cards"
import Snackbar from "../SnackBar/SnackBar";
import axios from "axios";
import {API_URL} from '../../constants'

function TabContainer({ children, dir }) {
  return (
    <div component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </div>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "100%",
    minHeight: "80vh"
  },
  cards: {
    color: "#111111",
  },
  fixedConfirm: {
      backgroundColor: "#ffffff",
      color: "#111111",
  },
  containerOne: {
    backgroundColor: "#009a9b",
    color: "#111111",
  },
  paperContainer: {
    padding: '20px',
    backgroundColor: "#1b1b1b",
    color: "#ffffff",
  },
  paperText: {
      color: "#ffffff"
  },
  Divider: {
      backgroundColor: "#DDDDDD"
  },
  snackBar: {
  }
});

class FullWidthTabs extends React.Component {
  state = {
    wallet: this.props.wallet,
    totalCost: this.props.totalCost,
    value: 0,
    data: this.props.data
  };

  componentWillReceiveProps(nextProps) {
    console.log("props received")
    this.setState({ 
    wallet: nextProps.wallet,
    totalCost: nextProps.totalCost });  
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  // When the form is submitted, prevent the default event and alert the username and password
  handleFormSubmit = event => {
    event.preventDefault();
    alert(`Username: ${this.state.username}\nPassword: ${this.state.password}`);
    this.setState({ username: "", password: "" });
  };

  componentDidMount = () => {

    API.getCountryName(this.props.countryName).then(res=> {
      console.log()

      API.getCountry(res.data.data[0].country_code).then(res=> {
        console.log(res)
  
        this.setState(
          {
            country: res
          },
          
          this.createCosts
        )
      })
    })

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
  };

  createCosts() {
    let costs = [];
    if(this.state.country) {
    this.state.country.data.data.costs.forEach(cost => {
      costs.push(parseInt(cost.value_midrange));
    });
    this.setState({ costs });


    }
  }

  handleAddClick = (item, cost) => {
      this.props.addClick(item, cost);
  }

  onClick = () => {
    console.log(this.state)
    
    
  }

  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Current Trip" />
            <Tab label="Spending Tracker" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
          className={classes.containerOne}
        >

            <TabContainer dir={theme.direction} >
                <Paper className={classes.paperContainer} >
                    <Grid container spacing={24} justify="space-between">
                        <Grid item xs={6} >
                            <Typography variant="h4" gutterBottom={false} className={classes.paperText}> 
                                Current Trip
                            </Typography>
                            <Divider className={classes.Divider}/>
                            <Typography variant="h3" className={classes.paperText}> 
                                {this.props.countryName}
                            </Typography>
                        </Grid>

                        <Grid item xs={3}>
                            <Typography variant="h6" align="left" className={classes.paperText}> 
                                Wallet
                            </Typography>
                        <Divider className={classes.Divider}/>
                        <Typography variant="h6" className={classes.paperText}> 
                            {this.state.wallet}/{this.state.totalCost}
                        </Typography>
                        </Grid>
                    </Grid>
                </Paper>

                <Grid container spacing={24}>
                {this.state.costs && this.state.categories &&

                    <Cost
                    costs={this.state.costs}
                    className={classes.fixedConfirm}
                    countryName={this.props.countryName}
                    categories={this.state.categories}
                  />

                }
                </Grid>
          </TabContainer>

          <TabContainer dir={theme.direction}>
            <Grid container spacing={0 }>
            <Grid item xs={6}>
                    <Cards
                        cost={this.state.wallet} 
                        name={"Wallet"}
                        description={"Remaining budget"}
                    />
            </Grid>

            

          {this.state.costs &&

                  <Grid item xs={6}>
                  <Cards 
                      cost={this.state.costs[12]}
                      name={"Today"}
                      description={"Average Daily Cost"}
                  /> 
                
            </Grid>
          }
                

            </Grid>
                <Paper>
                <Grid container>
                <Grid item xs={12}>
                    <TextField 
                        addClick={this.handleAddClick}
                    />
                </Grid>
            
                    {this.props.spending && 
                        
                        this.props.spending.slice(0).reverse().map(item => {
                            return(
                                    <Grid item xs={12} className={classes.snackBar}>
                                    <Snackbar 
                                        key = {item._id}
                                        className={classes.snackBar}
                                        details={item.spendingName}
                                        cost={item.spending }
                                    />
                                    </Grid>
                                )
                            })
                        }

                        <br></br>
                    </Grid>
                    </Paper>


          </TabContainer>
        </SwipeableViews>
      </div>
    );
  }
}

FullWidthTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(FullWidthTabs);