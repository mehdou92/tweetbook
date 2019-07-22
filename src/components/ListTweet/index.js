import React, { useContext, useEffect, useState } from 'react';
import Tweet from '../Tweet';
import { FirebaseContext } from "../Firebase";

export default function ListTweets(props) {

    const { getStore, user, isLogged } = useContext(FirebaseContext);
    const store = getStore();
    const [isLoading, setIsLoading] = useState(false);
    const [tweets, setTweets] = useState(null);
    let lastTweets = [];
    const getLastTweets = () => {

        
        let search = [];
        search = user.follows;
        if(!search.includes(user.userId)) {
            search.push(user.userId);
        }

        for (let index = 0; index < search.length; index++) {
            const element = search[index];
            store.collection('tweets').where('userId', '==', element)
            .get()
            .then(function (querySnapchot) {
                querySnapchot.forEach(function (doc) {
                    const tweet = doc.data();
                    lastTweets.push(<Tweet tweetId={tweet.tweetId} username={tweet.username} userId={tweet.userId} createdAt={tweet.createdAt} text={tweet.text} nbComment={tweet.comment} nbLike={tweet.like} nbRetweet={tweet.retweet} />);
                });
                
                if(index == search.length - 1) {
                    lastTweets.sort((a, b) => b.dateFeed - a.dateFeed);
                    setIsLoading(true);
                    setTweets(lastTweets);
                }
            })
            .catch(function (error) {
                console.error("ERROR getting documents tweets ", error);
            });
        }

        // search.forEach(follow => {
        //     store.collection('tweets').where('userId', '==', follow).limit(20)
        //     .get()
        //     .then(function (querySnapchot) {
        //         querySnapchot.forEach(function (doc) {
        //             const tweet = doc.data();
        //             lastTweets.push(<Tweet tweetId={tweet.tweetId} username={tweet.username} userId={tweet.userId} createdAt={tweet.createdAt} text={tweet.text} nbComment={tweet.comment} nbLike={tweet.like} nbRetweet={tweet.retweet} />);
        //         });
        //         setTweets(lastTweets);
        //         setIsLoading(true);
                
        //     })
        //     .catch(function (error) {
        //         console.error("ERROR getting documents tweets ", error);
        //     });
        //     console.warn('tweets : ', lastTweets);
            
        // });
        // console.warn('lastTweets : ', lastTweets);
        
        
    }

    useEffect(() => {
        getLastTweets();
    }, []);

    return (
        <>
            { isLoading ? tweets : <h2>You need to follow someone to see some tweets</h2> }
        </>
    );
}