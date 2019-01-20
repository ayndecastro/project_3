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
  }
});

class FullWidthTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  componentDidMount = () => {
    API.getCountry("US").then(res =>
      this.setState(
        {
          country: res.data
        },
        this.createCosts
      )
    );

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
    this.state.country.data.costs.forEach(cost => {
      costs.push(parseInt(cost.value_midrange));
    });
  }

  handleAddClick = (item, cost) => {
      this.props.addClick(item, cost);
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
                            <Typography variant="h5" align="left" className={classes.paperText}> 
                                Wallet
                            </Typography>
                        <Divider className={classes.Divider}/>
                        <Typography variant="h3" className={classes.paperText}> 
                            {this.props.wallet}/{this.props.totalCost}
                        </Typography>
                        </Grid>
                    </Grid>
                </Paper>

                <Grid container spacing={24}>
                {this.state.costs && this.state.categories &&
                    <Cost
                    costs={this.state.costs}
                    className={this.props.classes.fixedConfirm}
                    categories={this.state.categories}
                  />
                }
                </Grid>
          </TabContainer>

          <TabContainer dir={theme.direction}>
            <Paper>
                <TextField 
                    addClick={this.handleAddClick}
                />
            </Paper>

            {this.props.spending && 
                    
                this.props.spending.map(item => {
                    return(
                        <div key={item.Details}>
                        <Grid container spacing={24}>
                            <Grid item xs>
                                Details: {item.Details}
                            </Grid>
                            <Grid item xs>
                                Cost: {item.Cost}
                            </Grid>
                        </Grid>
                        </div>
                    )
                })
            }

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