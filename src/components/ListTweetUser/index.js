import React, { useContext, useEffect, useState } from 'react';
import Tweet from '../Tweet';
import { FirebaseContext } from "../Firebase";

export default function ListTweetsUSer(props) {

    const { getStore } = useContext(FirebaseContext);
    const store = getStore();
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingRt, setIsloadingRt] = useState(false);
    const [tweets, setTweets] = useState(null);
    const [retweets, setRetweets] = useState(null);
    const [listTweets, setListTweets] = useState(null);

    // const getLastTweets = () => {

    //     let lastTweets = [];

    //     store.collection('tweets').where('userId', '==', props.userId) //manque le order
    //         .get()
    //         .then(function (querySnapchot) {
    //             querySnapchot.forEach(function (doc) {
    //                 const tweet = doc.data();
    //                 lastTweets.push(<Tweet username={tweet.username} userId={tweet.userId} createdAt={tweet.createdAt} text={tweet.text} nbComment={tweet.comment} nbLike={tweet.like} nbRetweet={tweet.retweet} />);
    //                 // console.log(doc.id, " => ", doc.data());
    //             });
    //             setIsLoading(true);
    //             setTweets(lastTweets);
    //         })
    //         .catch(function (error) {
    //             console.error("ERROR getting documents tweets ", error);
    //         });
    // }


    const getLastTweets = new Promise((resolve, reject) => {

        let lastTweets = [];

        store.collection('tweets').where('userId', '==', props.userId) //manque le order
            .get()
            .then(function (querySnapchot) {
                querySnapchot.forEach(function (doc) {
                    const tweet = doc.data();
                    lastTweets.push(tweet);
                    // lastTweets.push(<Tweet username={tweet.username} userId={tweet.userId} createdAt={tweet.createdAt} text={tweet.text} nbComment={tweet.comment} nbLike={tweet.like} nbRetweet={tweet.retweet} />);
                    // console.log(doc.id, " => ", doc.data());
                });
                resolve(lastTweets);
            })
            .catch(function (error) {
                reject(error);
                console.error("ERROR getting documents tweets ", error);
            });
    });

    const getUser = new Promise((resolve, reject) => {

        const tmpTab = [];

        store.collection('users').where('userId', '==', props.userId)
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    const user = doc.data();
                    const tabRetweet = user.retweetId;
                    tmpTab.push(user.retweetId);
                });
                resolve(tmpTab);
            })
            .catch(function (error) {
                reject(error);
                console.error('Error getUser Retweet ', error);
            })
    });

    const getTweetFromRetweet = (tweetIds) => {

        const tmpTab = [];

        return new Promise ((resolve, reject) => {
            tweetIds[0].forEach(function (elem) {
                store.collection('tweets').where('tweetId', '==', elem)
                .get()
                .then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                        const retweet = doc.data();
                        tmpTab.push(retweet);
                    });
                    if(tmpTab.length === tweetIds[0].length){
                        resolve(tmpTab);
                    }
                })
                .catch(function (error) {
                    reject(error);
                    console.error('Error getTweetFromRetweet ', error);
                })
            })
        })
    }

    // const getRetweet = new Promise((resolve, reject) => {

    //     let listRetweetUser = [];

    //     store.collection('users').where('userId', '==', props.userId)
    //         .get()
    //         .then(function (querySnapshot) {
    //             querySnapshot.forEach(function (doc) {
    //                 const user = doc.data();
    //                 const tabRetweet = user.retweetId;
    //                 tabRetweet.forEach(function (elem) {
    //                     store.collection('tweets').where('tweetId', '==', elem)
    //                         .get()
    //                         .then(function (querySnapshot) {
    //                             querySnapshot.forEach(function (doc) {
    //                                 const retweet = doc.data();
    //                                 listRetweetUser.push(retweet);
    //                             });
    //                             console.log('fini');
    //                         })
    //                         .catch(function (error) {
    //                             reject(error);
    //                             console.error("Error getting retweet User", error);
    //                         });
    //                 })
    //             });
    //             console.log('toto')
    //         })
    //         .catch(function (error) {
    //             console.error("Error getting user for retweet ", error);
    //         })
    // });

    // const waitPromise = async () => {
    //     let result = await getRetweet.resolve()
    // }


    // const getRetweet = () => {
    //     console.log(props.userId);

    //     let listRetweetUser = [];

    //     store.collection('users').where('userId', '==', props.userId)
    //         .get()
    //         .then(function (querySnapshot) {
    //             querySnapshot.forEach(function (doc) {
    //                 const user = doc.data();
    //                 const tabRetweet = user.retweetId;
    //                 tabRetweet.forEach(function (elem) {
    //                     store.collection('tweets').where('tweetId', '==', elem)
    //                         .get()
    //                         .then(function (querySnapshot) {
    //                             querySnapshot.forEach(function (doc) {
    //                                 const retweet = doc.data();
    //                                 listRetweetUser.push(retweet);
    //                             });
    //                             setIsloadingRt(true);
    //                             console.log(listRetweetUser);
    //                             setRetweets(listRetweetUser);
    //                         })
    //                         .catch(function (error) {
    //                             console.error("Error getting retweet User", error);
    //                         });
    //                 })       
    //             });
    //         })
    //         .catch(function (error) {
    //             console.error("Error getting user for retweet ", error);
    //         })
    // }

    const orderTweet = () => {

        let orderedTweets = [];

        getUser.then(values => {
            getTweetFromRetweet(values).then( rtUser => {
                orderedTweets.push(...rtUser);
                getLastTweets.then(values => {
                    orderedTweets.push(...values);
                    console.log(orderedTweets);
                    orderedTweets.sort(function (a, b){
                        return new Date(a.createdAt) + new Date(b.createdAt);
                    })

                    console.log('sort ARRAY : ', orderedTweets);
                    setListTweets(orderedTweets);
                    setIsLoading(true);
                })
            })       
        })
        // return Promise.all([getUser])
        //     .then(values => {
        //             return Promise.resolve(values);
        //     })

        // let feedTweets = []
        // const data = await Promise.all([getLastTweets, getRetweet])
        //     .then(values => {
        //         return values;

        //     });

        //     console.log('loading data',  data);
        //     setIsLoading(true);
    }

    useEffect(() => {
        // getLastTweets();
        // getRetweet();
        orderTweet();
        // orderTweet().then(data => {
        //     console.log(data);
        // })
        // orderTweet();
    }, []);

    return (
        <>
            {isLoading ? tweets : <h2>isLoading</h2>}
        </>
    );
}