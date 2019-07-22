import React, { useContext, useEffect, useState } from 'react';
import Tweet from '../Tweet';
import { FirebaseContext } from "../Firebase";
import Loader from '../Loader';

export default function ListTweetsUSer(props) {

    const { getStore } = useContext(FirebaseContext);
    const store = getStore();
    const [isLoading, setIsLoading] = useState(false);
    const [listTweets, setListTweets] = useState(null);
    const [listElemTweets, setListElemTweets] = useState(null);

    const getLastTweets = new Promise((resolve, reject) => {

        let lastTweets = [];

        store.collection('tweets').where('userId', '==', props.userId) //manque le order
            .get()
            .then(function (querySnapchot) {
                querySnapchot.forEach(function (doc) {
                    const tweet = doc.data();
                    lastTweets.push(tweet);
                });
                resolve(lastTweets);
            })
            .catch(function (error) {
                reject(error);
                console.error("ERROR getting documents tweets ", error);
            });
    });

    const getUser = new Promise((resolve, reject) => {

        let document = null;

        store.collection('users').where('userId', '==', props.userId)
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    document = doc;
                });
                resolve(document);
            })
            .catch(function (error) {
                reject(error);
                console.error('Error getUser Retweet ', error);
            })
    });

    const getRetweetFromCollection = (document) => {

        let listRetweets = [];
        return new Promise((resolve, reject) => {

            document.ref.collection('retweet').get()
                .then(sub => {
                    if (sub.docs.length > 0) {
                        document.ref.collection('retweet').get()
                            .then((querySnapshot) => {
                                querySnapshot.forEach(function (doc) {
                                    const retweet = doc.data();
                                    listRetweets.push(retweet);
                                });
                                resolve(listRetweets);
                            })
                            .catch(function (error) {
                                reject(error);
                                console.error('Error getRetweetFromCollection ', error);
                            })

                    } else {
                        resolve(listRetweets);
                    }
                })
        })
    }

    const getTweetFromRetweet = (tweetIds) => {

        const tmpTab = [];

        return new Promise((resolve, reject) => {
            if (tweetIds === undefined || !tweetIds.length > 0) {
                resolve(tmpTab);
            } else {
                tweetIds.forEach(function (elem) {
                    store.collection('tweets').where('tweetId', '==', elem.tweetId)
                        .get()
                        .then(function (querySnapshot) {
                            querySnapshot.forEach(function (doc) {
                                const retweet = doc.data();
                                retweet.isRetweet = true;
                                tmpTab.push(retweet);
                            });
                            if (tmpTab.length === tweetIds.length) {
                                resolve(tmpTab);
                            }
                        })
                        .catch(function (error) {
                            reject(error);
                            console.error('Error getTweetFromRetweet ', error);
                        })
                })
            }
        })
    }

    const setDateLastTweet = (tabTweet) => {
        tabTweet.forEach(function (result) {
            result.dateFeed = result.createdAt;
        })
        return tabTweet;
    }

    const setDateTweet = (tabRt, tabTime) => {
        tabRt.forEach(function (result) {
            for (let i = 0; i < tabTime.length; i += 1) {
                if (result.tweetId === tabTime[i].tweetId) {
                    result.dateFeed = tabTime[i].retweetedAt;
                }
            }
        })
        return tabRt;
    }

    const orderTweet = () => {

        let orderedTweets = [];

        getUser.then(values => {
            getRetweetFromCollection(values).then(rtUser => {
                getTweetFromRetweet(rtUser).then(tweets => {
                    const feedTweet = setDateTweet(tweets, rtUser);
                    orderedTweets.push(...feedTweet);
                    getLastTweets.then(lastTweetUser => {
                        const lastTweet = setDateLastTweet(lastTweetUser);
                        orderedTweets.push(...lastTweet);
                        orderedTweets.sort((a, b) => b.dateFeed - a.dateFeed)
                        setListTweets(orderedTweets);
                        displayListTweets(orderedTweets);
                        setIsLoading(true);
                    })
                })
            })
        })
    }

    const displayListTweets = (arrayTweets) => {
        const renderElem = [];
        arrayTweets.forEach(tweet => {
            // console.log('elem display', tweet);
            renderElem.push(<Tweet tweetId={tweet.tweetId} username={tweet.username} userId={tweet.userId} createdAt={tweet.createdAt} text={tweet.text} nbComment={tweet.comment} nbLike={tweet.like} nbRetweet={tweet.retweet} retweeted={tweet.isRetweet && true} />);
        })
        setListElemTweets(renderElem);
    }

    useEffect(() => {
        // getLastTweets();
        // getRetweet();
        orderTweet();
        // orderTweet().then(data => {
        //     console.log(data);
        // })
        // orderTweet();
        console.log('state ordered tweets ', listTweets);
    }, [isLoading]);

    return (
        <>
            {isLoading ? listElemTweets : <Loader />}
        </>
    );
}