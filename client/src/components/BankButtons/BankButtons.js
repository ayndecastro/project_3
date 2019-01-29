import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit * 2,
  },
  TextField: {
    marginTop:  theme.spacing.unit 
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
        countryName: '',
    }


    handleUpdate = () => {
        this.setState({
            updateClicked: !(this.state.updateClicked),
            countryName: this.props.countryName
        })
        
    }

    componentDidMount = () => {
      this.setState({
        budget: this.props.budget
      })
    }

    handleAdd = () => {
        if(this.state.updateClicked) {

            this.setState({
              budget: this.state.budget + this.state.amount
            })
            
            console.log("eto ", this.state.budget)
          
            this.props.handleUpdate(this.state.amount, this.state.countryName, this.props.index, "add", this.props.id);
            this.setState({
              updateClicked: false,
              amount: ''
            })
            
            }

    }

    handleMinus = () => {

        this.setState({
            amount: 0 - this.state.amount,
            budget: this.state.budget = this.state.amount
        });

        if(this.state.updateClicked) {
            
            this.props.handleUpdate(this.state.amount, this.state.countryName, this.props.index, "minus", this.props.id);
            this.setState({updateClicked: false,
              amount: ''})
            }
    }

    handleGo = () => {
        this.props.handleGo(this.props.countryName, this.props.totalCost, this.props.date_leave, this.props.date_back, this.props.id);
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
        className={this.props.classes.TextField}
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


       {(this.state.budget >= this.props.totalCost) &&
        
      <Button 
      variant="outlined" 
      color="secondary" 
      align= "right"
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