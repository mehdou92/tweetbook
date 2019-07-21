import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../Firebase';
import uuid from 'uuid';
import './index.scss';

export default function InputTweet() {
    const [values, setValues] = useState({});
    const { getStore, user } = useContext(FirebaseContext);
    const [newTweet, setNewTweet] = useState('');

    const store = getStore();

    const handleChange = (event) => {
        event.persist();
        setValues(values => ({ ...values, [event.target.name]: event.target.value }));
    };

    // const addNewTweet = () => {

    //     store.collection('tweets').add({
    //         'tweetId': uuid(),
    //         'userId': user.userId,
    //         'username': user.username,
    //         'text': values.tweet,
    //         'createdAt': Date.now(),
    //         'like': 0,
    //         'retweet': 0,
    //         'comment': 0,
    //         'userIdRetweet': []
    //     });
    //     setNewTweet('');
    // };

        const addNewTweet = () => {

        store.collection('tweets').add({
            'tweetId': uuid(),
            'userId': user.userId,
            'username': user.username,
            'text': values.tweet,
            'createdAt': Date.now(),
            'like': 0,
            'retweet': 0,
            'comment': 0,
        });
        setNewTweet('');
    };
    

    return (
        <div class="w-full md:w-1/2 bg-blue-900 px-3 tweeter-border">
            <label class="block uppercase tracking-wide text-white text-xs font-bold mb-2" for="input-tweet">
                What's happening ?
      </label>
            <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="input-tweet"
                type="text"
                placeholder="What's happening ?"
                maxLength="280"
                name="tweet"
                value={values.tweet || ''}
                onChange={handleChange}
            />
            <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-2 rounded-full"
                type="submit"
                onClick={addNewTweet}
            >
                Tweet
</button>
        </div>
    );
}