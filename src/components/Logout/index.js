import React, {useContext} from 'react';
import {FirebaseContext} from '../Firebase';

export default function Logout(props) {

    const { getFirebase } = useContext(FirebaseContext);
    const firebase = getFirebase();

    function signOutFirebase() {
        firebase.auth().signOut()
        .then(function () {
            props.history.push('/signin');
        }, function(error) {
            console.error('Logout error :', error);
        });
    }

    return (
        <>
            {signOutFirebase}
        </>
    )
}