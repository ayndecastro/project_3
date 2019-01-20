import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'

const styles = {
  root: {
  backgroundColor: "#000000",
  marginTop: "10px",
  marginBottom: "-10px",
  borderColor: "#ffffff"
  },
  avatar: {
  },
  bigAvatar: {
    width: 60,
    height: 60,
  },
  name: {
    paddingTop: '20px',
    color: "#39CCCC"
  },
  title: {
    backgroundColor: "#009a9b",
    color: "#000000",
    padding: "10px"
  }
};

function ImageAvatars(props) {

  const { classes } = props;
  return (
    <Grid container justify="space-between" spacing={24} border={1}>

      <Grid item lg={12} alignItems="right">
          <Grid container justify="space-between" spacing={24} border={1} className={classes.root}> 

              <Grid item xs={11} alignItems="left">
                <Typography variant="h2" className={classes.name}>
                {props.name}
                </Typography>
              </Grid>

              <Grid item xs={1} alignItems="right">
                <Avatar alt={props.name} src={props.picture} className={classes.bigAvatar} />
              </Grid>

              <Grid item xs={12} className={classes.title}>
              <Grid item xs={8}></Grid>
              <Grid item lg={4} alignContent="right">
                
                <Typography variant="h4">
                  {props.title}
                </Typography>
              </Grid>
              </Grid>
          </Grid>
      </Grid>

      

    </Grid>
  );
}

ImageAvatars.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImageAvatars);