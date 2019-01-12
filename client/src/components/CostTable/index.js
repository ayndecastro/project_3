import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';

const styles = theme => ({
  root: {
    heigth: '100%',
    marginTop: theme.spacing.unit * 2,
    overflowX: 'auto',
    backgroundColor: theme.palette.background.default,
    color: "#000000"
  },
  table: {
    maxWidth: '100%',
    minWidth: '40px',
    height: 'auto',
    color: "#000000"

    
  },
  dailyCost: {
      color: "#000000"
  }
});

let id = 0;
function createData(name, AverageCost) {
  id += 1;
  return { id, name, AverageCost};
}

const object = {0: "103.41421408533",
1: "146.93497122964",
2: "36.364286572241",
3: "41.838287869865",
4: "13.928843427636",
5: "49.327713952322",
6: "42.288622625595",
7: "62.368047579868",
8: "99.444544413987",
9: "93.854914261402",
10: "19.278459402759",
11: "12.095286741121",
12: "207.08620503053"}

const rows = [
  createData('Accomodation', object[0]),
  createData('Intercity Transportation', object[0]),
  createData('Local Transportation', object[0]),
  createData('Food', object[0]),
  createData('Water', object[0]),
  createData('Entertainment', object[0]),
  createData('Souvenir', object[0]),
  createData('Communication', object[0]),
  createData('Living Expenses', object[0]),
  createData('Visas', object[0])
  
];



function SimpleTable(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        
        <TableBody className={classes.dailyCost}>
          {rows.map(row => {
            return (
              <TableRow key={row.id} className={classes.dailyCost}>
                <TableCell component="th" scope="row" className={classes.dailyCost}>
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.AverageCost}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>
            Daily Average Cost
            </TableCell>
            <TableCell align="right">
            
            <Typography component="h2" variant="h3"  className={classes.dailyCost} >
                    $1000000
                </Typography>
                
                </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </Paper>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);
