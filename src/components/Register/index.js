import React, { useContext } from 'react';
import uuid from 'uuid';

import useForm from '../../customHooks/useForm';
import validate from '../../rules/RegisterFormValidationRules';

import { FirebaseContext } from "../Firebase";
import 'firebase/auth';

export default function Register(props) {

  const { values, handleChange, handleSubmit, errors } = useForm(handleRegister, validate);

  const { getFirebase, getStore } = useContext(FirebaseContext);
  const firebase = getFirebase();

  function handleRegister() {
    console.log(values);
    console.log('Handle Register : ', values);
    insertUserFirebase();
  }

  function insertUserFirebase() {
    const db = getStore();
    firebase.auth().createUserWithEmailAndPassword(values.email, values.password)
      .then(response => {
        db.collection('users').add({
          'userId': uuid(),
          'username': values.username,
          'email': values.email,
          'retweet': [],
          'follows': []
        });

        props.history.push('/');

      }).catch(errors => {
        console.error(errors.message);
      })
  }


  return (
      <div class="w-full max-w-xs">
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
              Username
      </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleChange}
              value={values.username || ''}
              id="username"
              name="username"
              type="text"
              placeholder="Username"
              error={errors.username ? true : false}
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
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
            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
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
              Register
      </button>
            <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
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