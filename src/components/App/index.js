import React, { useContext, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from '../Router';
import Navbar from '../Navbar'
import FirebaseProvider from '../Firebase';
import InputTweet from '../InputTweet';
import ListTweets from '../ListTweet';
import Main from '../Main';


function App() {
  return (
    <FirebaseProvider>
      <BrowserRouter>
        <Navbar />
        {/* <Main /> */}
        {/* <InputTweet />
        <ListTweets /> */}
        <Router />
      </BrowserRouter>
    </FirebaseProvider>

  );
}

export default App;
