import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

import { FirebaseContext } from '../Firebase';

export default function Footer() {

    const { user, signOut, isLogged } = useContext(FirebaseContext);
    const [isLoading, setIsLoading] = useState(false);

    function handleSignOut() {
        setIsLoading(false);
        signOut();

    }

    useEffect(() => {

        if (user)
            setIsLoading(true);
        else
            setIsLoading(false);

    }, [user]);

    return (
        <div class="flex mb-4 footer" >
            <div class="flex-1 ">
                <nav class="flex items-center justify-between flex-wrap bg-gray-800 p-6 fixed bottom-0 w-full">
                    <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                        <div class="text-sm lg:flex-grow flex">
                            <Link to="/" class="flex-1">
                                <button class="flex mr-2  text-blue-500 hover:bg-blue-900 font-semibold py-2 px-4">
                                    Home
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" fill="#4299e1"/><path d="M0 0h24v24H0z" fill="none"/></svg>
                                </button>
                            </Link>
                            {
                                (isLoading && user)
                                    ?
                                    <>
                                        <Link to={`/profile/${user.username}`} class="flex-1">
                                            <button class="flex mr-2 text-blue-500 hover:bg-blue-900 font-semibold py-2 px-4">
                                                Profil
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#4299e1" d="M9 11.75c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zm6 0c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-.29.02-.58.05-.86 2.36-1.05 4.23-2.98 5.21-5.37C11.07 8.33 14.05 10 17.42 10c.78 0 1.53-.09 2.25-.26.21.71.33 1.47.33 2.26 0 4.41-3.59 8-8 8z"/><path fill="none" d="M0 0h24v24H0z"/></svg>
                                            </button>
                                        </Link>
                                        <Link to="/logout" class="flex-1">
                                            <button  onClick={handleSignOut} class="flex text-blue-500 hover:bg-blue-900 font-semibold py-2 px-4">
                                                Logout
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"/><path fill="#4299e1" d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z"/></svg>
                                            </button>
                                        </Link>
                                    </>
                                    :
                                    <>
                                        <Link class="flex-1" to="/login">
                                            <button class="flex mr-2 hover:bg-blue-900 text-blue-500 font-semibold py-2 px-4 rounded">
                                                Login
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                    <path fill="#4299e1" d="M17.81 4.47c-.08 0-.16-.02-.23-.06C15.66 3.42 14 3 12.01 3c-1.98 0-3.86.47-5.57 1.41-.24.13-.54.04-.68-.2-.13-.24-.04-.55.2-.68C7.82 2.52 9.86 2 12.01 2c2.13 0 3.99.47 6.03 1.52.25.13.34.43.21.67-.09.18-.26.28-.44.28zM3.5 9.72c-.1 0-.2-.03-.29-.09-.23-.16-.28-.47-.12-.7.99-1.4 2.25-2.5 3.75-3.27C9.98 4.04 14 4.03 17.15 5.65c1.5.77 2.76 1.86 3.75 3.25.16.22.11.54-.12.7-.23.16-.54.11-.7-.12-.9-1.26-2.04-2.25-3.39-2.94-2.87-1.47-6.54-1.47-9.4.01-1.36.7-2.5 1.7-3.4 2.96-.08.14-.23.21-.39.21zm6.25 12.07c-.13 0-.26-.05-.35-.15-.87-.87-1.34-1.43-2.01-2.64-.69-1.23-1.05-2.73-1.05-4.34 0-2.97 2.54-5.39 5.66-5.39s5.66 2.42 5.66 5.39c0 .28-.22.5-.5.5s-.5-.22-.5-.5c0-2.42-2.09-4.39-4.66-4.39-2.57 0-4.66 1.97-4.66 4.39 0 1.44.32 2.77.93 3.85.64 1.15 1.08 1.64 1.85 2.42.19.2.19.51 0 .71-.11.1-.24.15-.37.15zm7.17-1.85c-1.19 0-2.24-.3-3.1-.89-1.49-1.01-2.38-2.65-2.38-4.39 0-.28.22-.5.5-.5s.5.22.5.5c0 1.41.72 2.74 1.94 3.56.71.48 1.54.71 2.54.71.24 0 .64-.03 1.04-.1.27-.05.53.13.58.41.05.27-.13.53-.41.58-.57.11-1.07.12-1.21.12zM14.91 22c-.04 0-.09-.01-.13-.02-1.59-.44-2.63-1.03-3.72-2.1-1.4-1.39-2.17-3.24-2.17-5.22 0-1.62 1.38-2.94 3.08-2.94 1.7 0 3.08 1.32 3.08 2.94 0 1.07.93 1.94 2.08 1.94s2.08-.87 2.08-1.94c0-3.77-3.25-6.83-7.25-6.83-2.84 0-5.44 1.58-6.61 4.03-.39.81-.59 1.76-.59 2.8 0 .78.07 2.01.67 3.61.1.26-.03.55-.29.64-.26.1-.55-.04-.64-.29-.49-1.31-.73-2.61-.73-3.96 0-1.2.23-2.29.68-3.24 1.33-2.79 4.28-4.6 7.51-4.6 4.55 0 8.25 3.51 8.25 7.83 0 1.62-1.38 2.94-3.08 2.94s-3.08-1.32-3.08-2.94c0-1.07-.93-1.94-2.08-1.94s-2.08.87-2.08 1.94c0 1.71.66 3.31 1.87 4.51.95.94 1.86 1.46 3.27 1.85.27.07.42.35.35.61-.05.23-.26.38-.47.38z"/>
                                                    <path fill="none" d="M0 0h24v24H0z"/>
                                                </svg>

                                            </button>
                                        </Link>
                                        <Link class="flex-1" to="/register">
                                            <button class="flex mr-2 hover:bg-blue-900 text-blue-500 font-semibold py-2 px-4 rounded">
                                                register
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" fill="none" d="M0 0h24v24H0z"/>
                                                    <g fill-rule="evenodd" clip-rule="evenodd">
                                                        <path fill="#4299e1" d="M9 17l3-2.94c-.39-.04-.68-.06-1-.06-2.67 0-8 1.34-8 4v2h9l-3-3zm2-5c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4"/>
                                                        <path fill="#4299e1" d="M15.47 20.5L12 17l1.4-1.41 2.07 2.08 5.13-5.17 1.4 1.41z"/>
                                                    </g>
                                                </svg>
                                            </button>
                                        </Link>
                                    </>
                            }
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
}