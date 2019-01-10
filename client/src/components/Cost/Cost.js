import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  appBar: {
    position: 'relative',
    padding: '5px'
  },
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`,
  },
  card: {
    height: '80%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6,
  },
  button: {
    backgroundColor: theme.palette.background.paper,
    margin: theme.spacing.unit * 5,
    flexGrow: 1,
  }
});

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
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

function Cost(props) {
  const { classes } = props;

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <CameraIcon className={classes.icon} />
          <Typography component="h2" variant="h3" align="center" color="textPrimary" gutterBottom>
              United States
            </Typography>
        </Toolbar>
      </AppBar>
      <main>
        
        <div className={classNames(classes.layout, classes.cardGrid)}>
          <Grid container spacing={40}>
            {cards.map(card => (
              <Grid item key={card} sm={6} md={4} lg={3}>
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {object[cards.indexOf(card)]}
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe the content.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Button color="inherit" className={classes.button} justify="space-between">
        
          Go
          </Button>
        </div>

       
      </main>
    </React.Fragment>
  );
}

Cost.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Cost);