import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { DateRange } from 'react-date-range';
import { addDays } from 'date-fns';

const styles = theme => ({
  root: {
  },
  appBar: {
    position: 'relative',
    padding: '5px'
  },
  DateRange: {
    marginBottom: theme.spacing.unit * 3
  },
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
  heroUnit: {
    backgroundColor: theme.palette.primary,
  },
  heroContent: {
    maxWidth: 600,
    margin: theme.spacing.unit * 2,
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
  },
  tableContainer: {
    margin: theme.spacing.unit * 5,
    flexGrow: 1,
  },
  button: {
    backgroundColor: theme.palette.background.paper,
    marginBottom: theme.spacing.unit,
  }, 
  text: {
    color: "#ffffff",
    marginTop: theme.spacing.unit * 2
  },
  dialog: {
    color: "#000000",
    marginLeft: "10px"
  },
  dateRange: {
    margin: theme.spacing.unit * 3
  }
});

function Survey(props) {

  const handleDateChange = (date) => {
    props.handleSelect(date)
  }

  const { classes } = props;

  return (
      
      <div className={classes.root}>
      <CssBaseline />
      <Grid container justify="center" className={classes.DateRange}  >
        <Grid item xs={11} >
        <Typography variant="h5" className={classes.text} >
        Travel Dates
        </Typography>

        <div align="center" className={classes.dateRange}>
        <DateRange
                    onChange={handleDateChange}
                    direction="horizontal"
                    showSelectionPreview={true}
                    moveRangeOnFirstSelection={false}
                    linkedCalendars={true}
                    months={1}
                    minDate={addDays(new Date(), -300)}
                    rangeColors="#FFDC00"
                />
        </div>
        
        </Grid>
      </Grid>
    </div>
  );
}

Survey.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Survey);