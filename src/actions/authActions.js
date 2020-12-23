import axios from 'axios';
import { get } from 'lodash';
import moment from 'moment';


import {SERVER_URL} from '../constants/site';
import * as types from '../constants/actions';


export function setLoggedIn(token, refresh) {
    return {type: types.LOGIN, authToken: token, refreshToken: refresh};
}

export function setLogOut() {
    return dispatch => {
        localStorage.clear();
        dispatch({type: types.LOGOUT});
    }
}

function checkForTokens(tokens) {
    let { authToken = null, refreshToken = null } = tokens;
    if (authToken && refreshToken) {
        return tokens;
    } else {
        refreshToken = localStorage.getItem('refreshToken');
        authToken = localStorage.getItem('authToken');
        if (refreshToken && authToken) {
            tokens = {authToken, refreshToken};
        } else {
            tokens = null;
        }
    }
    return tokens;
}

function checkCacheTimestamp() {
    const lastToken = localStorage.getItem('timestamp');
    return lastToken && moment(lastToken).add(1, 'day') < moment(lastToken);
}

// Appears unused because it is accessed on load
export function login() {

    return (dispatch, getState) => {

        const {authToken, refreshToken } = getState().user;

        const tokens = {authToken, refreshToken};

        const verifiedTokens = checkForTokens(tokens);
        const needToBreakCache = checkCacheTimestamp();

        if (!verifiedTokens || needToBreakCache) {
            localStorage.clear();
        }

        dispatch(getAndSetTokens(verifiedTokens));
    }
}

function getAndSetTokens(tokens) {

    tokens = tokens || getHashParams();

    console.log(tokens);

    return (dispatch) => {
        if (!tokens.authToken || !tokens.refreshToken || tokens.error) {
            dispatch(setLogOut());
        } else {
            localStorage.setItem('authToken', tokens.authToken);
            localStorage.setItem('refreshToken', tokens.refreshToken);
            localStorage.setItem('timestamp', moment().format('X'));
            dispatch(setLoggedIn(tokens.authToken, tokens.refreshToken));
            dispatch(getHipsterPercent());
        }
    }
}

function getHipsterPercent() {
    return async (dispatch, getState) => {
        const token = getState().user.authToken;
        try {
            const hipsterPercent = await axios.post(`${SERVER_URL}/hipster`, {token});
            console.log(hipsterPercent);
        } catch (err) {
            console.log(err);
        }
    }
}

// getting the parameters sent from oAuth in server
function getHashParams() {
    let hashParams = {};
    let e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q);
    while (e) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
        e = r.exec(q);
    }

    const {
        authToken,
        refreshToken,
        error
    } = hashParams;

    if (error) {
        return error;
    } else {
        return {authToken, refreshToken};
    }
}
