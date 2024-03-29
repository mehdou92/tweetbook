import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

import * as firebase from 'firebase';

import { FirebaseContext } from '../Firebase';

export default function Tweet(props) {
  const { user, getStore } = useContext(FirebaseContext);
  const store = getStore();

  const like = () => {
    console.log('like');
    store.collection('tweets').where('tweetId', '==', props.tweetId)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          console.log('Tweet id + data', doc.id, " => ", doc.data());
          console.log('toto');
          //document.ref.collection('like').get()
          console.log(doc);

          store.collection('tweets').doc(doc.id).collection('like').get()
            .then(sub => {
              if (sub.docs.length > 0) {
                console.log('sub like exist');
                console.log(sub);

                let BreakException = {};
                let alreadyLike = null;

                store.collection('tweets').doc(doc.id).collection('like')
                  .get()
                  .then(function (querySnapshot) {

                    try {
                      querySnapshot.forEach(function (doc) {
                        let collectionLike = doc.data();
                        if (collectionLike.userIdLike === user.userId) {
                          console.log('already Like');
                          alreadyLike = doc.data();
                          throw BreakException;
                        }
                      });
                    } catch (e) {
                      if (e !== BreakException) throw e;
                    }

                    if (alreadyLike) {
                      console.log('DECREMENTE');

                      store.collection("tweets").doc(alreadyLike.docId).update({
                        like: firebase.firestore.FieldValue.increment(-1)
                      })

                      store.collection("tweets").doc(alreadyLike.docId).collection('like').doc(user.userId).delete().then(function () {
                        console.log("Document successfully deleted!");
                      }).catch(function (error) {
                        console.error("Error removing document: ", error);
                      })

                    } else {
                      console.log('INCREMENTE');
                      querySnapshot.forEach(function (doc) {
                        let collectionLike = doc.data();
                        store.collection("tweets").doc(collectionLike.docId).collection('like').doc(user.userId).set({
                          userIdLike: user.userId,
                          likedAt: Date.now(),
                          docId: collectionLike.docId
                        })
                        store.collection("tweets").doc(collectionLike.docId).update({
                          like: firebase.firestore.FieldValue.increment(1)
                        })
                      })
                    }
                  })
              } else {
                // subCollection don't exist
                console.log('sub dont exist ');
                store.collection("tweets").doc(doc.id).collection('like').doc(user.userId).set({
                  userIdLike: user.userId,
                  likedAt: Date.now(),
                  docId: doc.id
                })
                store.collection("tweets").doc(doc.id).update({
                  like: firebase.firestore.FieldValue.increment(1)
                })
              }
            })
        })
      });

    store.collection('users').where('userId', '==', user.userId)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          store.collection("users").doc(doc.id).collection('like').get()
            .then(sub => {
              if (sub.docs.length > 0) {
                console.log('sub exist user');
                console.log(sub);

                let BreakUser = {};
                let userAlreadyLike = null;

                store.collection('users').doc(doc.id).collection('like')
                  .get()
                  .then(function (querySnapshot) {

                    try {
                      querySnapshot.forEach(function (doc) {
                        let collectionLikeUser = doc.data();
                        if (collectionLikeUser.tweetId === props.tweetId) {
                          console.log('already liked user');
                          userAlreadyLike = doc.data();
                          throw BreakUser;
                        }
                      })
                    } catch (e) {
                      if (e !== BreakUser) throw e;
                    }

                    if (userAlreadyLike) {
                      console.log('DECREMENTE USER');
                      console.log(userAlreadyLike);

                      store.collection('users').doc(doc.id).collection('like').doc(userAlreadyLike.tweetId).delete().then(function () {
                        console.log("Document successfully deleted!");
                      }).catch(function (error) {
                        console.error("Error removing document: ", error);
                      })
                    } else {
                      console.log('INCREMENTE USER');

                      store.collection("users").doc(doc.id).collection('like').doc(props.tweetId).set({
                        tweetId: props.tweetId,
                        likedAt: Date.now(),
                      })
                    }
                  })

              } else {
                console.log('sub dont exit user');
                store.collection("users").doc(doc.id).collection('like').doc(props.tweetId).set({
                  tweetId: props.tweetId,
                  likedAt: Date.now(),
                })
              }
            })
        });
      });
    
  }

  const retweet = () => {
    console.log('retweet');
    console.log('props tweetid ', props.tweetId);
    store.collection('tweets').where('tweetId', '==', props.tweetId)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          console.log('Tweet id + data', doc.id, " => ", doc.data());
          console.log('toto');
          //document.ref.collection('retweet').get()
          console.log(doc);

          store.collection('tweets').doc(doc.id).collection('retweet').get()
            .then(sub => {
              if (sub.docs.length > 0) {
                console.log('sub exist');
                console.log(sub);

                let BreakException = {};
                let alreadyRt = null;

                store.collection('tweets').doc(doc.id).collection('retweet')
                  .get()
                  .then(function (querySnapshot) {

                    try {
                      querySnapshot.forEach(function (doc) {
                        let collectionRetweet = doc.data();
                        if (collectionRetweet.userIdRetweet === user.userId) {
                          console.log('already rt');
                          alreadyRt = doc.data();
                          throw BreakException;
                        }
                      });
                    } catch (e) {
                      if (e !== BreakException) throw e;
                    }

                    if (alreadyRt) {
                      console.log('DECREMENTE');

                      store.collection("tweets").doc(alreadyRt.docId).update({
                        retweet: firebase.firestore.FieldValue.increment(-1)
                      })

                      store.collection("tweets").doc(alreadyRt.docId).collection('retweet').doc(user.userId).delete().then(function () {
                        console.log("Document successfully deleted!");
                      }).catch(function (error) {
                        console.error("Error removing document: ", error);
                      })

                    } else {
                      console.log('INCREMENTE');
                      querySnapshot.forEach(function (doc) {
                        let collectionRetweet = doc.data();
                        store.collection("tweets").doc(collectionRetweet.docId).collection('retweet').doc(user.userId).set({
                          userIdRetweet: user.userId,
                          retweetedAt: Date.now(),
                          docId: collectionRetweet.docId
                        })
                        store.collection("tweets").doc(collectionRetweet.docId).update({
                          retweet: firebase.firestore.FieldValue.increment(1)
                        })
                      })
                    }
                  })
              } else {
                // subCollection don't exist
                console.log('sub dont exist ');
                store.collection("tweets").doc(doc.id).collection('retweet').doc(user.userId).set({
                  userIdRetweet: user.userId,
                  retweetedAt: Date.now(),
                  docId: doc.id
                })
                store.collection("tweets").doc(doc.id).update({
                  retweet: firebase.firestore.FieldValue.increment(1)
                })
              }
            })
        })
      });

    store.collection('users').where('userId', '==', user.userId)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          store.collection("users").doc(doc.id).collection('retweet').get()
            .then(sub => {
              if (sub.docs.length > 0) {
                console.log('sub exist user');
                console.log(sub);

                let BreakUser = {};
                let userAlreadyRt = null;

                store.collection('users').doc(doc.id).collection('retweet')
                  .get()
                  .then(function (querySnapshot) {

                    try {
                      querySnapshot.forEach(function (doc) {
                        let collectionRtUser = doc.data();
                        if (collectionRtUser.tweetId === props.tweetId) {
                          console.log('already rt user');
                          userAlreadyRt = doc.data();
                          throw BreakUser;
                        }
                      })
                    } catch (e) {
                      if (e !== BreakUser) throw e;
                    }

                    if (userAlreadyRt) {
                      console.log('DECREMENTE USER');
                      console.log(userAlreadyRt);

                      store.collection('users').doc(doc.id).collection('retweet').doc(userAlreadyRt.tweetId).delete().then(function () {
                        console.log("Document successfully deleted!");
                      }).catch(function (error) {
                        console.error("Error removing document: ", error);
                      })
                    } else {
                      console.log('INCREMENTE USER');

                      store.collection("users").doc(doc.id).collection('retweet').doc(props.tweetId).set({
                        tweetId: props.tweetId,
                        retweetedAt: Date.now(),
                      })
                    }
                  })

              } else {
                console.log('sub dont exit user');
                store.collection("users").doc(doc.id).collection('retweet').doc(props.tweetId).set({
                  tweetId: props.tweetId,
                  retweetedAt: Date.now(),
                })
              }
            })
        });
      });
  }

  const convertDate = (date) => {
    
    const readableDate = new Date(date);
    return readableDate.toLocaleString('en-GB', { timeZone: 'UTC' });
  }

  return (
      <div class="mx-auto font-sans rounded bg-blue-900 text-white border px-6 py-4 tweet">
        {console.log('Tweet user', user)}
        <div>
          {user.userId !== props.userId
            ?
            <>
              <svg enable-background="new 0 0 100 100" height="14px" id="Layer_1" version="1.1" viewBox="0 0 100 100" width="14px"xmlns="http://www.w3.org/2000/svg">
                <path d="M23.102,76.5c-1.854,0-3.361-1.514-3.361-3.372V45.664L5,45.657l20.029-21.924l20.037,21.931   H30.305v20.235h15.85L56.541,76.5H23.102z M95,54.344H80.254V26.872c0-1.859-1.508-3.372-3.361-3.372H43.461L53.84,34.101h15.847   v20.235l-14.751,0.008l20.035,21.928L95,54.344z"/>
              </svg>
                <span>You Retweeted</span>
            </>
             : ''}
        </div>
        <div class="flex items-center">
          <img src="https://i.imgur.com/qACoKgY.jpg" class="h-12 w-12 rounded-full" />
          <div class="flex flex-col ml-4 text-gray-600">
            <Link to={`/profile/${props.username}`} >
              <span class="font-bold text-white">{props.username}</span>
            </Link>
            <span class="text-grey">@{props.username}</span>
            
          </div>
          <svg viewBox="328 355 335 276" class="ml-auto" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="    M 630, 425    A 195, 195 0 0 1 331, 600    A 142, 142 0 0 0 428, 570    A  70,  70 0 0 1 370, 523    A  70,  70 0 0 0 401, 521    A  70,  70 0 0 1 344, 455    A  70,  70 0 0 0 372, 460    A  70,  70 0 0 1 354, 370    A 195, 195 0 0 0 495, 442    A  67,  67 0 0 1 611, 380    A 117, 117 0 0 0 654, 363    A  65,  65 0 0 1 623, 401    A 117, 117 0 0 0 662, 390    A  65,  65 0 0 1 630, 425    Z" style={{ fill: '#3BA9EE' }} />
          </svg>
        </div>
        <div class=" mt-3 mb-1 leading-normal text-lg">{props.text} </div>
        <div class="text-grey mb-3 text-sm">{convertDate(props.createdAt)}</div>
        <div class="flex text-grey">
          <div class="flex items-center mr-4">
            <svg class="mr-2" width="24" height="24" viewBox="0 0 24 24"><path class="fill-current" d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.045.286.12.403.143.225.385.347.633.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.368-3.43-7.788-7.8-7.79zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.334-.75-.75-.75h-.395c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z" /></svg>
            <span>{props.nbComment}</span>
          </div>
          <div class="flex items-center mr-4">
            <svg onClick={retweet} class="mr-2" width="24" height="24" viewBox="0 0 24 24"><path class="fill-current" d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z" /></svg>
            <span>{props.nbRetweet}</span>
          </div>
          <div class="flex items-center">
            <svg onClick={like} class="mr-2" width="24" height="24" viewBox="0 0 24 24"><path class="fill-current" d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.813-1.148 2.353-2.73 4.644-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.375-7.454 13.11-10.037 13.156H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.035 11.596 8.55 11.658 1.52-.062 8.55-5.917 8.55-11.658 0-2.267-1.822-4.255-3.902-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.015-.03-1.426-2.965-3.955-2.965z" /></svg>
            <span>{props.nbLike}</span>
          </div>
        </div>
      </div>
  );
}