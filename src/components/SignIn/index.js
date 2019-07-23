import React, { useContext } from 'react';
import useForm from '../../customHooks/useForm';
import validate from '../../rules/LoginFormValidationRules';
import 'firebase/auth';
import { FirebaseContext } from '../Firebase';

export default function SignIn(props) {

  const { getFirebase, getStore, user, setUser} = useContext(FirebaseContext);
  const firebase = getFirebase();
  const { values, handleChange, handleSubmit, errors } = useForm(handleSignIn, validate);

  function handleSignIn() {
    console.log('handleSignIn');
    firebaseConnect();
  }

  function firebaseConnect() {
    const db = getStore();
    firebase.auth().signInWithEmailAndPassword(values.email, values.password)
      .then(response => {
        db.collection('users').where('email', '==', values.email).get()
        .then(response => {
          response.forEach(user => {
            console.log(" USER DATA SIGN IN : ", user.data());
            setUser(user.data());
            localStorage.setItem('user', JSON.stringify(user.data()));
          });
          props.history.push('/')
        });
      }).catch(errors => console.error(errors.message))
  };


  return (
      <div class="w-full max-w-xs mx-auto">
      {user && props.history.push('/')}
        <form class="rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
          <div class="mb-4">
            <label class="block text-white text-sm font-bold mb-2" for="email">
              Email Adress
      </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleChange}
              value={values.email || ''}
              id="email"
              name="email"
              type="text"
              placeholder="Email Adress"
            />
          </div>
          <div class="mb-6">
            <label class="block text-white text-sm font-bold mb-2" for="password">
              Password
      </label>
            <input
              class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleChange}
              value={values.password || ''}
              id="password"
              name="password"
              type="password"
              placeholder="Password" />
            <p class="text-red-500 text-xs italic">Please choose a password.</p>
          </div>
          <div class="flex items-center justify-between">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit">
              Login
      </button>
            <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-300" href="#">
              Forgot Password?
      </a>
          </div>
        </form>
        <p class="text-center text-gray-500 text-xs">
          &copy;2019 Acme Corp. All rights reserved.
  </p>
      </div>
  );
}