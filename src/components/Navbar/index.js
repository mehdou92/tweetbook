import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import OfflineDetection from '../OfflineDetection';

import { FirebaseContext } from '../Firebase';

export default function Navbar() {

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
    <div class="flex mb-4" >
      <div class="flex-1">
        <nav class="flex items-center justify-between flex-wrap bg-teal-500 p-6">
          <div class="flex items-center flex-shrink-0 text-white mr-6">
            <svg class="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" /></svg>
            <span class="font-semibold text-xl tracking-tight">TweetBook</span>
          </div>
          <div class="block lg:hidden">
            <button class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
              <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
            </button>
          </div>
          <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
            <div class="text-sm lg:flex-grow">
              <Link to="/">
                <button class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                  Home
                </button>
              </Link>
              {
                isLoading
                  ?
                  <>
                    <Link to={`/profile/${user.username}`}>
                    <button class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                      Profile
                    </button>
                    </Link>
                    <Link to="/logout">
                    <button  onClick={handleSignOut} class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                  logout
                </button>
                    </Link>
                  </>
                  :
                  <>
                    <Link to="/login">
                    <button class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                  Login
                </button>
                    </Link>
                    <Link to="/register">
                    <button class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                  register
                </button>                        
                    </Link>
                  </>
              }
              {/* {console.log("Nav Bar user : ", user)}
                { console.log("Nav Bar isLogged : ", isLogged())} */}
            </div>
            <div>
              <a href="#" class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Download</a>
            </div>
          </div>
        </nav>
        <OfflineDetection />
      </div>
    </div>
  );
}