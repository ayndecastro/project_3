import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import CostTable from '../CostTable'

const styles = theme => ({
  root: {
    backgroundColor: "#ffffff ",
    borderradius: 16,
    display: 'block', 
    minHeight: '30vh',
  },
  appBar: {
    backgroundColor: "#eeeeee",
    position: 'relative',
    padding: '5px'
  },
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
  heroUnit: {
    backgroundColor: theme.palette.primary,
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
  },
  tableContainer: {
    margin: theme.spacing.unit * 5,
    flexGrow: 1,
    color: "#000000"
  },
  button: {
    backgroundColor: theme.palette.background.paper,
    margin: theme.spacing.unit * 5,
    flexGrow: 1,
  }, 
  text: {
    color: "#000000"
  },
  title: {
    color: "#000000",
    paddingTop: '20px'
  }
});


function Cost(props) {
  const { classes } = props;

  return (
    <div  className={classes.root} >
            <Typography component="h2" variant="h3" align="center" color="textPrimary" className={classes.title}>
              Country: United States
            </Typography>
      <main className={classes.text}>
        <div className={classes.tableContainer} align="center" >
          <CostTable />
        </div>   
      </main>
    </div>
  );
}

Cost.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Cost);