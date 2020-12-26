import moment from 'moment';

import * as types from '../constants/actions';
import {getHipsterPercent} from "./hipsterActions";
import {FETCH_HIPSTER_DATA} from "../constants/actions";
import axios from "axios";
import {SERVER_URL} from "../constants/site";
import {REFRESH_TOKEN} from "../constants/responseMessages";
import {FETCH_HIPSTER_DATA_FAILURE} from "../constants/actions";
import {REFRESH_TOKEN_REQUEST} from "../constants/actions";
import {REFRESH_TOKEN_FAILURE} from "../constants/actions";
import {REFRESH_TOKEN_SUCCESS} from "../constants/actions";


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
    if (!authToken || !refreshToken) {
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
    return lastToken && moment(lastToken).add(1, 'day') < moment();
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

    return (dispatch) => {
        if (!tokens.authToken || !tokens.refreshToken || tokens.error) {
            dispatch(setLogOut());
        } else {
            localStorage.setItem('authToken', tokens.authToken);
            localStorage.setItem('refreshToken', tokens.refreshToken);
            localStorage.setItem('timestamp', moment().format());
            dispatch(setLoggedIn(tokens.authToken, tokens.refreshToken));
            dispatch(getHipsterPercent());
        }
    }
}

export function refreshSpotifyToken(refreshToken) {
    return async(dispatch) => {
        try {
            dispatch({type: REFRESH_TOKEN_REQUEST});
            const response = await axios.post(`${SERVER_URL}/refresh-token`, {refreshToken});
            const { error, accessToken: authToken} = response.data || {};
            if (error) {
                console.log(error);
                dispatch({type: REFRESH_TOKEN_FAILURE, error})
            } else {
                dispatch({type: REFRESH_TOKEN_SUCCESS, authToken});
                dispatch(getHipsterPercent());
            }
        } catch (err) {
            console.log(err);
            dispatch({type: REFRESH_TOKEN_FAILURE, error: err});
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
