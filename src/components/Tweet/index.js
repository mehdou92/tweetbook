import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    padding: '20px',
    margin: '0 0 20px 0'
  },
}));

export default function Tweet(props) {
  const classes = useStyles();

  return (
    <div>
      <Paper className={classes.root}>
        <Typography variant="h5" component="h3">
          {props.username}
        </Typography>
        <Typography component="p">
          {props.text}
        </Typography>
        <Typography component="p">
          Comment : {props.nbComment} Like : {props.nbLike} RT : {props.nbRetweet}
        </Typography>
      </Paper>
    </div>
  );
}