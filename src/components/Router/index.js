import React from "react";
import { Route, Redirect } from "react-router-dom";
import SignIn from '../SignIn';
import Register from '../Register';
import Profile from '../Profile';
import Main from '../Main';

const Router = () => (
    <>
        <Route path="/" exact component={Main} />
        <Route path="/login" exact component={SignIn} />
        <Route path="/register" exact component={Register} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/logout" render={() => (
            <Redirect to="/" />
        )} />
        {/* <Route path="/" exact component={listTweet} /> */}
        {/* <Route path="/profile" exact component={Profile} /> */}
        {/* <Route path="/logout" render={() => (
            <Redirect to="/" />
        )} /> */}
        {/* <Route path="/sucessRegistered" exact component={SucessRegistered} />
        <Route path="/movieCard/:id" exact component={MovieCard} /> */}
    </>
);

export default Router;