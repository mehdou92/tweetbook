import React, { useContext, useEffect, useState } from 'react';
import ListTweets from '../ListTweet';
import InputTweets from '../InputTweet';

import { FirebaseContext } from '../Firebase';

export default function Main() {

    const { user, isLogged } = useContext(FirebaseContext);
    const [display, setDisplay] = useState(false);

    useEffect(() => {
        displayMain(user);
        // console.log('display a verifier dans MAIN 5= ', display);
        // console.log('display a verifier dans MAIN = ', user);
    }, [user]);

    const displayMain = (user) => {
        if (user)
            setDisplay(true);
        else
            setDisplay(false);
    }

    return (
        <>
            {display &&
                <>
                    <InputTweets />
                    <ListTweets />
                </>
            }
        </>
    )
}