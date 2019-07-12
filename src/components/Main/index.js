import React, { useContext, useEffect, useState } from 'react';
import ListTweets from '../ListTweet';
import InputTweets from '../InputTweet';

import { FirebaseContext } from '../Firebase';

export default function Main() {

    const { user, isLogged } = useContext(FirebaseContext);
    const [display, setDisplay] = useState(false);

    useEffect(() => {
        console.log("use effect");
        displayMain(user);
    }, [user]);

    const displayMain = (user) => {
        if (user)
            setDisplay(true);
        else
            setDisplay(false);
    }

    return (
        <>
            {console.log('STATE DISPLAY = ', display)}
            { display && 
                <>
                    <InputTweets />
                    <ListTweets />
                </>
            }
        </>
    )
}