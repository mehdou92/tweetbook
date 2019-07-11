import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from '../Router';
import Navbar from '../Navbar'
import FirebaseProvider from '../Firebase';
import Tweet from '../Tweet';
import InputTweet from '../InputTweet';

function App() {
  return (
    <FirebaseProvider>
      <BrowserRouter>
        <Navbar />
        <InputTweet />
        <Tweet />
        <Router />
      </BrowserRouter>
    </FirebaseProvider>

  );
}

export default App;
