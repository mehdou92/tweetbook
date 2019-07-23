import React, { useContext, useState, useEffect } from 'react';
import ListTweetUser from '../ListTweetUser';
import FollowBtn from '../FollowBtn';
import Loader from '../Loader';
import './index.scss';

import { FirebaseContext } from '../Firebase';

export default function Profile(props) {

  const { user, isLogged, getStore } = useContext(FirebaseContext);
  const store = getStore();

  const [background, setBackground] = useState('https://images.unsplash.com/photo-1522093537031-3ee69e6b1746?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a634781c01d2dd529412c2d1e2224ec0&auto=format&fit=crop&w=2098&q=80');
  const [username, setUsername] = useState(props.match.params);
  const [profileUser, setProfileUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false)


  const getUser = (value) => {

    let userFromUsername = {};

    store.collection("users").where("username", "==", value.username)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          userFromUsername = doc.data();
          // doc.data() is never undefined for query doc snapshots
          //console.log('Result get User ',doc.id, " => ", doc.data());
        });
        setIsLoading(true);
        setProfileUser(userFromUsername);
      })
      .catch(function (error) {
        console.error("Error getting documents: ", error);
      });
  };

  useEffect(() => {
    getUser(username);
  }, [username]);


  return (
    <>
      {isLoading
        ?
        <>
          {
            profileUser
            &&
            <>
              <div class="font-sans leading-tight min-h-screen bg-grey-lighter p-8">
                <div class="w-full mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
                  <div>
                    <img class="w-full h-40" src={ `${background}` } />
                  </div>
                  <div class="border-b px-4 pb-6">
                    <div class="text-center sm:text-left sm:flex mb-4">
                      <img class="h-32 w-32 rounded-full border-4 border-white -mt-16 mr-4" src="https://randomuser.me/api/portraits/women/21.jpg" alt="" />
                      <div class="py-2">
                        <h3 class="font-bold text-2xl mb-1">{profileUser.username}</h3>
                        <div class="inline-flex text-grey-dark sm:flex items-center">
                          <svg class="h-5 w-5 text-grey mr-1 " fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path class="heroicon-ui" d="M5.64 16.36a9 9 0 1 1 12.72 0l-5.65 5.66a1 1 0 0 1-1.42 0l-5.65-5.66zm11.31-1.41a7 7 0 1 0-9.9 0L12 19.9l4.95-4.95zM12 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" /></svg>
                          New York, NY
                        </div>
                      </div>
                    </div>
                    <div class="flex-1 ">
                      <FollowBtn user={profileUser} />
                      <button class="inline-flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-2 rounded-full">Message</button>
                      <button className="inline-flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-2 rounded-full">Follow</button>
                    </div>
                  </div>
                  <div class="px-4 py-4">
                    <div class="flex items-center text-grey-darker mb-4">
                      <svg class="h-6 w-6 text-grey mr-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path class="heroicon-ui" d="M12 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm9 11a1 1 0 0 1-2 0v-2a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v2a1 1 0 0 1-2 0v-2a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v2z" /></svg>
                      <span><strong class="text-black">{profileUser.followers.length}</strong> Followers</span>
                    </div>
                    <div class="flex">
                      <div class="flex flex-row-reverse justify-end mr-2">
                        <img class="border-2 border-white rounded-full h-10 w-10" src="https://randomuser.me/api/portraits/men/32.jpg" alt="" />
                        <img class="border-2 border-white rounded-full h-10 w-10 -mr-2" src="https://randomuser.me/api/portraits/women/31.jpg" alt="" />
                        <img class="border-2 border-white rounded-full h-10 w-10 -mr-2" src="https://randomuser.me/api/portraits/men/33.jpg" alt="" />
                        <img class="border-2 border-white rounded-full h-10 w-10 -mr-2" src="https://randomuser.me/api/portraits/women/32.jpg" alt="" />
                        <img class="border-2 border-white rounded-full h-10 w-10 -mr-2" src="https://randomuser.me/api/portraits/men/44.jpg" alt="" />
                        <img class="border-2 border-white rounded-full h-10 w-10 -mr-2" src="https://randomuser.me/api/portraits/women/42.jpg" alt="" />
                  <div class="px-4 py-4 ">
                    <div class="flex items-center text-grey-darker px-4 pb-6 border-b">
                      <div class="flex-1">
                          <svg className="h-6 w-6 text-grey mr-1 inline-flex" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">`
                              <path fill="#3BA9EE" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                              <path d="M0 0h24v24H0z" fill="none"/>
                          </svg>
                          <strong>19 </strong><span className="text-counter">Followers</span>
                      </div>
                      <div class="flex-1">
                          <svg className="h-6 w-6 text-grey mr-1 inline-flex" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                              <path fill="#3BA9EE" d="M0 0h24v24H0z" fill="none"/>
                              <path fill="#3BA9EE" d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
                        <strong>152 </strong><span className="text-counter">Following</span>
                      </div>
                      <div class="flex-1">
                          <svg className="h-6 w-6 text-grey mr-1 inline-flex" viewBox="0 0 24 24">
                              <g><path fill="#3BA9EE" d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path></g>
                          </svg>
                        <strong>140 </strong> <span className="text-counter">Tweets</span>
                      </div>
                      <div class="flex-1">
                          <svg className="h-6 w-6 text-grey mr-1 inline-flex" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                              <path d="M0 0h24v24H0z" fill="none"/><path fill="#3BA9EE" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                          </svg>
                        <strong>70 </strong><span className="text-counter">Likes</span>
                      </div>

                    </div>
                    <div className="px-4 py-4 ">
                      <ListTweetUser userId={profileUser.userId} />
                    </div>
                  </div>
                </div>
              </div>
                  </div>
                </div>
              </div>
            </>
          }
        </>
        :
        <Loader />
      }
    </>
  );
}
