import React, { useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import RetweetIcon from '@material-ui/icons/Cached';

import * as firebase from 'firebase';

import { FirebaseContext } from '../Firebase';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    padding: '20px',
    margin: '0 0 20px 0'
  },
}));

export default function Tweet(props) {
  const classes = useStyles();

  const { user, getStore, getFirebase } = useContext(FirebaseContext);
  const store = getStore();
  // const firebase = getFirebase();

  const retweet = () => {
    console.log('retweet');
    store.collection('tweets').where('tweetId', '==', props.tweetId)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          console.log('Tweet id + data', doc.id, " => ", doc.data());
          // Build doc ref from doc.id
          store.collection("tweets").doc(doc.id)
            .update({ userIdRetweet : firebase.firestore.FieldValue.arrayUnion(user.userId) })
      });
    });

    store.collection('users').where('userId', '==', user.userId)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          console.log(doc.id, doc.data());

          store.collection("users").doc(doc.id)
            .update({ retweetId: firebase.firestore.FieldValue.arrayUnion(props.tweetId) })
        });
      });
  }



  return (
    <div>
      {console.log('Tweet user', user)}
      <Paper className={classes.root}>
        <Link to={`/profile/${props.username}`} >
          <Typography variant="h5" component="h3">
            {props.username}
          </Typography>
        </Link>
        <Typography component="p">
          {props.text}
        </Typography>
        <Typography component="p">
          Comment : {props.nbComment} Like : {props.nbLike} RT : {props.nbRetweet}
        </Typography>
        <IconButton className={classes.button} color="primary" aria-label="Retweet" onClick={retweet}>
          <RetweetIcon />
        </IconButton>
      </Paper>
    </div>
  );
}