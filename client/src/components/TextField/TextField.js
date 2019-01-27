import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  textField: {
    flexBasis: 200,
  },
  fab: {
    margin: theme.spacing.unit,
    backgroundColor: "#009a9b"
  },
});

class OutlinedInputAdornments extends React.Component {

    
  state = {
    cost: '',
    item: ''
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };
  
  handleClick = () => {
      this.props.addClick(this.state.item, this.state.cost);
      this.setState({
        cost: '',
        item: ''
      })
  }

  render() {
    const { classes } = this.props;

    return (
    <div className={classes.root}  justify="space-between">
        <Grid container spacing={24} alignItems="center">
        <Grid item xs={3}>
        <TextField
          id="outlined-simple-start-adornment"
          className={classNames(classes.margin, classes.textField)}
          variant="outlined"
          label="Item"
          onChange={this.handleChange('item')}
        />
        </Grid>

        <Grid item xs={3}>
        <TextField
          id="outlined-adornment-cost"
          className={classNames(classes.margin, classes.textField)}
          variant="outlined"
          label="Cost"
          value={this.state.cost}
          onChange={this.handleChange('cost')}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
        </Grid>

        <Grid  item xs={6} align="right">
            <Fab aria-label="Add" className={classes.fab}>
                <AddIcon 
                    onClick={this.handleClick}
                />
            </Fab>
        </Grid>
        </Grid>
    </div>
    );
  }
}

OutlinedInputAdornments.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OutlinedInputAdornments);
