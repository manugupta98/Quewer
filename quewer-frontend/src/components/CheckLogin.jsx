import { render } from 'enzyme';
import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { userInfo } from '../Redux/actions';
import store from '../Redux/store';

export default class CheckLogin extends React.Component {
    componentWillMount() {
        store.dispatch(userInfo());
    }

    render() {
        if(localStorage.getItem("loggedIn") === "true" && store.getState().user.user.type === "admin")
            return <Redirect to="/admin" />
        else if(localStorage.getItem("loggedIn") === "true")
            return <Redirect to="/main" />
        else
            return <Redirect to="/" />
    }
}