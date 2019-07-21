import React, { useContext, useEffect, useState } from 'react';
import Tweet from '../Tweet';
import { FirebaseContext } from "../Firebase";

export default function ListTweets(props) {

    const { getStore, user, isLogged } = useContext(FirebaseContext);
    const store = getStore();
    const [isLoading, setIsLoading] = useState(false);
    const [tweets, setTweets] = useState(null);

    const getLastTweets = () => {

        let lastTweets = [];
        let search = user.follows;
        search.push(user.userId);
        search.forEach(follow => {
            store.collection('tweets').where('userId', '==', follow).limit(20)
            .get()
            .then(function (querySnapchot) {
                querySnapchot.forEach(function (doc) {
                    const tweet = doc.data();
                    lastTweets.push(<Tweet tweetId={tweet.tweetId} username={tweet.username} userId={tweet.userId} createdAt={tweet.createdAt} text={tweet.text} nbComment={tweet.comment} nbLike={tweet.like} nbRetweet={tweet.retweet} />);
                });
                setIsLoading(true);
                
            })
            .catch(function (error) {
                console.error("ERROR getting documents tweets ", error);
            });
        });
        
        setTweets(lastTweets);
        
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