import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    minWidth: 200,
    margin: 10,
    backgroundColor: "#1b1b1b",
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  cardTitle: {
    color: "#ffffff"},
  cardBody: {
    color: "#ffffff"
  },
  cardDescription: {
    color: "#ffffff"
  }

};

function SimpleCard(props) {
  const { classes } = props;

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h4"  align="right" className={classes.cardTitle} gutterBottom>
          ${props.cost}
        </Typography>
        <Typography variant="body1" align="left" className={classes.cardBody} >
          {props.name} 
        </Typography>
        <Divider
        style={{
            color: "#001f3f",
            backgroundColor: "#DDDDDD",
            height: 1
        }}
    />
        <Typography variant="subtitle2" align="left" className={classes.cardDescription}>
          {props.description} 
        </Typography>
      </CardContent>
    </Card>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);
