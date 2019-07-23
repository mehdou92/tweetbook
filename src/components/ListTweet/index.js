import React, { useContext, useEffect, useState } from 'react';
import Tweet from '../Tweet';
import { FirebaseContext } from "../Firebase";
import Loader from '../Loader';

export default function ListTweets(props) {

    const { getStore, user, isLogged } = useContext(FirebaseContext);
    const store = getStore();
    const [isLoading, setIsLoading] = useState(false);
    const [tweets, setTweets] = useState(null);
    let lastTweets = [];
    let search = []
    const getLastTweets = () => {
    
        store.collection('users').where('userId', '==', user.userId)
            .get()
            .then(function (querySnapchot) {
                querySnapchot.forEach(function (doc) {
                    const element = doc.data();
                    search = element.follows;
                    construct();
                });
            })
            .catch(function (error) {
                console.error("ERROR getting documents tweets ", error);
            });
    }

    const construct = () => {
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
                    lastTweets.sort((a, b) => b.props.createdAt - a.props.createdAt);
                    setIsLoading(true);
                    setTweets(lastTweets);
                }
            })
            .catch(function (error) {
                console.error("ERROR getting documents tweets ", error);
            });
        }
    }

    

    useEffect(() => {
        getLastTweets();
    }, []);

    return (
        <>
            { isLoading ? tweets : <Loader /> }
        </>
    );
}