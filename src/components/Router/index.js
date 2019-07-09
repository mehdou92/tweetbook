import React from "react";
import { Route } from "react-router-dom";
import SignIn from '../SignIn';
import Register from '../Register';

const Router = () => (
    <>
        <Route path="/login" exact component={SignIn} />
        <Route path="/register" exact component={Register} />
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