import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Bank from '../../pages/Bank/Bank';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  go: {
      align: "right"
  }
});

class BankButtons extends React.Component {

    state = {
        amount: '',
        updateClicked: false,
        countryName: ''
    }


    handleUpdate = () => {
        this.setState({
            updateClicked: !(this.state.updateClicked),
            countryName: this.props.countryName
        })
        
    }

    handleAdd = () => {
        if(this.state.updateClicked) {
            
            this.props.handleUpdate(this.state.amount, this.state.countryName, this.props.index, "add");
            this.setState({updateClicked: false})
            }
    }

    handleMinus = () => {

        this.setState({
            amount: 0 - this.state.amount
        });

        if(this.state.updateClicked) {
            
            this.props.handleUpdate(this.state.amount, this.state.countryName, this.props.index, "minus");
            this.setState({updateClicked: false})
            }
    }

    handleGo = () => {
        this.props.handleGo();
    }

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
      };

    render() {
  return (
    <div>

    {
        !(this.props.totalCost == this.props.budget) &&
      <Button 
      variant="outlined" 
      className={this.props.classes.button} 
      onClick={this.handleUpdate}
      disabled={this.state.updateClicked}
      >
        Update
      </Button>
    }
      {
          this.state.updateClicked && 

        <TextField
        id="outlined-adornment-amount"
        variant="outlined"
        label="Amount"
        value={this.state.amount}
        onChange={this.handleChange('amount')}
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
      />
        }

    {
        this.state.updateClicked &&  
      <Button 
      variant="outlined" 
      className={this.props.classes.button} 
      onClick={this.handleAdd}>
        +
      </Button>
    }
    {
        this.state.updateClicked && 
      <Button 
      variant="outlined" 
      className={this.props.classes.button} 
      onClick={this.handleMinus}>
        -
      </Button>

       }
       {(this.props.budget == this.props.totalCost) &&
      <Button 
      variant="outlined" 
      color="secondary" 
      align= "right"
      disabled={!(this.props.budget == this.props.totalCost)} 
      className={this.props.classes.go}
      onClick={this.handleGo}
      >
        GO
      </Button>
       }
    </div>
  );   
}
}

BankButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BankButtons);