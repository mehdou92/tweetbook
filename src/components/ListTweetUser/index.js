import React, { useContext, useEffect, useState } from 'react';
import Tweet from '../Tweet';
import { FirebaseContext } from "../Firebase";

export default function ListTweetsUSer(props) {

    const { getStore } = useContext(FirebaseContext);
    const store = getStore();
    const [isLoading, setIsLoading] = useState(false);
    const [tweets, setTweets] = useState(null);

    const getLastTweets = () => {

        let lastTweets = [];

        store.collection('tweets').where('userId', '==', props.userId) //manque le order
            .get()
            .then(function (querySnapchot) {
                querySnapchot.forEach(function (doc) {
                    const tweet = doc.data();
                    lastTweets.push(<Tweet username={tweet.username} userId={tweet.userId} createdAt={tweet.createdAt} text={tweet.text} nbComment={tweet.comment} nbLike={tweet.like} nbRetweet={tweet.retweet} />);
                    // console.log(doc.id, " => ", doc.data());
                });
                setIsLoading(true);
                setTweets(lastTweets);
            })
            .catch(function (error) {
                console.error("ERROR getting documents tweets ", error);
            });
    }

    useEffect(() => {
        getLastTweets();
    }, []);

    return (
        <>
            { isLoading ? tweets : <h2>isLoading</h2> }
        </>
    );
}