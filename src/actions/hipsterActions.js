import axios from 'axios';

import {SERVER_URL} from "../constants/site";
import {REFRESH_TOKEN} from "../constants/responseMessages";
import {refreshSpotifyToken} from "./authActions";
import {
    FETCH_HIPSTER_DATA,
    FETCH_HIPSTER_DATA_FAILURE,
    FETCH_HIPSTER_DATA_SUCCESS,
    SET_LOADING_MESSAGE
} from "../constants/actions";


export function getHipsterPercent() {
    return async (dispatch, getState) => {
        const {authToken, refreshToken} = getState().user;
        try {
            dispatch({type: FETCH_HIPSTER_DATA});
            const artistResponse = await axios.post(`${SERVER_URL}/artists`, {token: authToken});
            const {artists = []} = artistResponse.data || {};
            const [response, artistLoader] = await Promise.all([
                axios.post(`${SERVER_URL}/hipster`, {token: authToken}),
                iterateLoadingMessages(artists)
            ]);
            const { error, hipsterPercent, mostPopular, leastPopular} = response.data || {};
            if (error) {
                if (error === REFRESH_TOKEN) {
                    dispatch(refreshSpotifyToken(refreshToken));
                } else {
                    dispatch({type: FETCH_HIPSTER_DATA_FAILURE, error});
                    console.log(error);
                }
            } else {
                dispatch(setHipsterData(hipsterPercent, mostPopular, leastPopular));
            }
        } catch (err) {
            console.log(err);
            dispatch({type: FETCH_HIPSTER_DATA_FAILURE, error: err});
        }
    }
}

function iterateLoadingMessages(messages = []) {
    return dispatch => {
        console.log('WBOEUQBWO')
        if (messages.length) {
            for (const message in messages) {
                setTimeout(() => {
                    dispatch({type: SET_LOADING_MESSAGE, message});
                }, 500);
            }
        }
    }
}

function setHipsterData(hipsterPercent, mostPopularTrack, leastPopularTrack) {
    return {
        type: FETCH_HIPSTER_DATA_SUCCESS,
        hipsterPercent,
        mostPopularTrack,
        leastPopularTrack
    };
}
