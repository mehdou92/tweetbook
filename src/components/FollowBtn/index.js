import React, { useContext, useState, useMemo } from 'react';
import * as firebase from 'firebase';

import { FirebaseContext } from '../Firebase';

export default function FollowBtn(props) {

  const { user, setUser, isLogged, getStore } = useContext(FirebaseContext);
  const store = getStore();
  let showBtn = false;
  let arrayFollows = [];

  let [followStatus, setFollowStatus] = useState(user.follows.includes(props.user.userId));



  const followAction = (isFollowable) => {
    if (!isFollowable) {
      store.collection("users").where("userId", "==", user.userId)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {

          store.collection("users").doc(doc.id)
            .update({ follows: firebase.firestore.FieldValue.arrayUnion(props.user.userId) })
          user.follows.push(props.user.userId);
          console.warn('FOLLOW : ', user);
          setUser(user);
        });   
      });

      store.collection("users").where("userId", "==", props.user.userId)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {

          store.collection("users").doc(doc.id)
            .update({ followers: firebase.firestore.FieldValue.arrayUnion(user.userId) })
          user.followers.push(user.userId);
        });   
      });
    } else {
      store.collection("users").where("userId", "==", user.userId)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          
          store.collection("users").doc(doc.id)
            .update({ follows : firebase.firestore.FieldValue.arrayRemove(props.user.userId) })
            user.follows.push(props.user.userId);
            console.warn('UNFOLLOW : ', user);
            setUser(user);
        });   
      });

      store.collection("users").where("userId", "==", props.user.userId)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {

          store.collection("users").doc(doc.id)
            .update({ followers: firebase.firestore.FieldValue.arrayRemove(user.userId) })
          user.followers.push(user.userId);
        });   
      });
    }
  }

  return useMemo(() => {
    if(props.user.userId === user.userId) {
      return "";
    } else {

      return <button onClick={() => followAction(followStatus)} class="flex-1 rounded-full bg-blue-500 text-white antialiased font-bold hover:bg-blue-dark px-4 py-2 mr-2">{followStatus ? 'unfollow' : 'follow'}</button>
    }
  }, [followStatus, props.user.userId, user.userId]);
}
