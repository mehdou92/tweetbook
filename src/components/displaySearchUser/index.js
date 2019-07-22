import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../Loader';

import { FirebaseContext } from '../Firebase';

export default function DisplaySearchUser(props) {

    const { user, isLogged, getStore } = useContext(FirebaseContext);
    const [resultQuery, setResultQuery] = useState(null);
    const [isLoading, setIsLoading] = useState(false);


    const store = getStore();

    const displayUserFind = () => {
        setIsLoading(true);

        let resultQueryUser = '';

        store.collection('users').where('username', '==', props.match.params.username)
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    resultQueryUser = doc.data();
                })
                setResultQuery(resultQueryUser)
                setIsLoading(false);
                return resultQuery;
            });
    }

    useEffect(() => {
        displayUserFind()

    }, [props.match.params.username]);



    return (
        isLoading
            ?
            <Loader />
            :
            <>
                {
                    resultQuery
                        ?
                        <>
                            <div class="max-w-md w-full lg:flex">
                                <div class="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" title="Woman holding a mug">
                                </div>
                                <div class="border-r border-b border-l border-grey-light lg:border-l-0 lg:border-t lg:border-grey-light bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                                    <div class="mb-8">
                                        <p class="text-sm text-grey-dark flex items-center">
                                            User find
      </p>                              <Link to={`/profile/${resultQuery.username}`} >
                                        <div class="text-black font-bold text-xl mb-2">@{resultQuery.username}</div>
                                        </Link>
                                        <p class="text-grey-darker text-base">Follow : {(resultQuery.follows.length) ? resultQuery.follows.length : 0} Followers: {(resultQuery.followers) ? resultQuery.followers.length : 0}</p>
                                    </div>
                                    <div class="flex items-center">
                                        <div class="text-sm">
                                            <p class="text-black leading-none">Since 18/10/2019</p>                                        </div>
                                    </div>
                                </div>
                            </div>

                        </>
                        :
                        <h1>User non trouve</h1>
                }
            </>
    )
}