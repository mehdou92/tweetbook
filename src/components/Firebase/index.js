import React, { createContext, Component } from "react";
import actions from './actions';
import publicActions from '../../helpers/public-actions';
import firebase from '@firebase/app';
import '@firebase/firestore'

import config from "../../helpers/config-firebase";

export const FirebaseContext = createContext({});

class FirebaseProvider extends Component {

  constructor(props) {
    super(props);
    if (!firebase.apps.length) {
      this.firebase = firebase.initializeApp(config);
      this.store = firebase.firestore();
    }
  }

  state = {
    user: null,
  };

  setUser = user => this.setState({user : user});

  getFirebase = () => this.firebase;
  getStore = () => this.store;

  isLogged = () => {
    const user = firebase.auth().currentUser;
    if(user){
      console.log(user);
    } else {
      console.error('user not logged');
    }
  }

  componentDidMount(){
    const user = localStorage.getItem('user');
    if(user) this.setState({user : JSON.parse(user)});

  }

  render() {
    return (
      <FirebaseContext.Provider value={{ ...this.state, ...publicActions(this, actions) }}>
        {this.props.children}
      </FirebaseContext.Provider>
    );
  }
}

export default FirebaseProvider;