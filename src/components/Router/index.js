import React from "react";
import { Route, Redirect } from "react-router-dom";
import SignIn from '../SignIn';
import Register from '../Register';
import Profile from '../Profile';
import Main from '../Main';
import DisplaySearchUser from '../displaySearchUser';

const Router = () => (
    <>
        <Route path="/" exact component={Main} />
        <Route path="/login" exact component={SignIn} />
        <Route path="/register" exact component={Register} />
        <Route path="/search/:username" exact component={DisplaySearchUser} />
        <Route path="/profile/:username" exact component={Profile} />
        <Route path="/logout" render={() => (
            <Redirect to="/" />
        )} />
    </>
);

export default Router;