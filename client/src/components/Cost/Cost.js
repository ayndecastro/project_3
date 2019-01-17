import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from '@material-ui/core/Grid';
import Cards from "../Cards/Cards"
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    backgroundColor: "#1b1b1b",
    borderradius: 16,
    display: "block",
    minHeight: "30vh"
  },
  appBar: {
    backgroundColor: "#eeeeee",
    position: "relative",
    padding: "5px"
  },
  title: {
    paddingTop: '10px',
    paddingLeft: '20px'
  },
  tableContainer: {
    margin: theme.spacing.unit * 2,
    flexGrow: 1,
  },
  button: {
    backgroundColor: theme.palette.background.paper,
    margin: theme.spacing.unit * 5,
    flexGrow: 1
  },
  cardContainer: {
    color: "#111111",
    margin: '2px'
  },
  cards: {
    color: "#1b1b1b",
    zIndex: "1000"
  }
});


class Cost extends Component {

  state = {
    id: 0
  }

  componentDidMount() {
    if(this.state.categories) {
      console.log(this.props.categories)
    }
  }

  render() {
  return (
    <div className={this.props.classes.root}>
      <Typography
        variant="h6"
        align="left"
        color="textPrimary"
        className={this.props.classes.title}
      >
        Country Info: 
      
      </Typography>
      <Typography
        variant="h2"
        align="center"
        className={this.props.classes.title}
      >
        {this.props.countryName}
        
      </Typography>
      <main className={this.props.classes.cardContainer}>
        <div className={this.props.classes.tableContainer}>
        <Grid container spacing={24}>

                {this.props.costs.map((Cost, index) => {
                  
                  if(index !== (this.props.costs.length -1)) {
                  return (
                    <Grid item xs key={Cost} className={this.props.classes.cards}>
                        <Cards 
                        cost= {Cost}
                        name={this.props.categories[index][0]}
                        description={this.props.categories[index][1]}
                        />
                    </Grid>
                  );
                  }
                  else {
                    return(
                    <Grid item xs key={Cost} className={this.props.classes.cards}>
                        <Cards 
                        cost={Cost} 
                        name={"Average Daily Cost"}
                        description={"Based on midrange cost information, Luxury and/or Budget range costs may vary"}
                        />
                    </Grid>
                    )
                  }
                })}

        </Grid>
        </div>
      </main>
    </div>
  );
              
}
}

export default withStyles(styles)(Cost);
