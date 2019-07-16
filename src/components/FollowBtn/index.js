import React, { useContext, useState, useMemo } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import ListTweetUser from '../ListTweetUser';
import * as firebase from 'firebase';

import { FirebaseContext } from '../Firebase';

export default function FollowBtn(props) {

  const { user, isLogged, getStore } = useContext(FirebaseContext);
  const store = getStore();
  let showBtn = false;
  let arrayFollows = [];

  let [followStatus, setFollowStatus] = useState(user.follows.includes(props.user.userId));



  const followAction = (isFollowable) => {
    console.warn('ACTUAL USER  : ', user);
    if (isFollowable) {
      store.collection("users").where("userId", "==", user.userId)
      .get()
      .then(function(querySnapshot) {
        console.warn('USER GET : ', user);
        querySnapshot.forEach(function(doc) {
          // store.collection("users").doc(doc.id).update({follows: arrayFollows});

          store.collection("users").doc(doc.id)
            .update({ follows : firebase.firestore.FieldValue.arrayUnion(props.user.userId) })
      });   
      });
    } else {
      store.collection("users").where("userId", "==", user.userId)
      .get()
      .then(function(querySnapshot) {
        console.warn('USER GET : ', user);
        querySnapshot.forEach(function(doc) {
          
          store.collection("users").doc(doc.id)
            .update({ follows : firebase.firestore.FieldValue.arrayRemove(props.user.userId) })

      });   
      });
    }
    
  }

  return useMemo(() => {
    if(props.user.userId === user.userId) {
      console.warn('user pareil');
      return "";
    } else {

      return <button onClick={() => followAction(followStatus)}>{followStatus ? 'unfollow' : 'follow'}</button>
    }
  }, [followStatus, props.user.userId, user.userId]);
}
