import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from '../Router';
import Navbar from '../Navbar'
import FirebaseProvider from '../Firebase';

function App() {
  return (
    <FirebaseProvider>
      <BrowserRouter>
        <Navbar />
        <Router />
      </BrowserRouter>
    </FirebaseProvider>

  );
}

export default App;
