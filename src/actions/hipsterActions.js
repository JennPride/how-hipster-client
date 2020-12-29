import axios from 'axios';

import {SERVER_URL} from "../constants/site";
import {REFRESH_TOKEN} from "../constants/responseMessages";
import {refreshSpotifyToken} from "./authActions";
import {
    FETCH_ARTISTS_FAILURE,
    FETCH_ARTISTS_SUCCESS,
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
            if (artists.length) {
                dispatch({type: FETCH_ARTISTS_SUCCESS, topArtists: artists});
            }
            const response = await axios.post(`${SERVER_URL}/hipster`, {token: authToken});
            const { error, hipsterPercent, mostPopular, leastPopular, topTrack} = response.data || {};
            if (error) {
                if (error === REFRESH_TOKEN) {
                    dispatch(refreshSpotifyToken(refreshToken));
                } else {
                    dispatch({type: FETCH_HIPSTER_DATA_FAILURE, error});
                    console.log(error);
                }
            } else {
                dispatch(setHipsterData(hipsterPercent, mostPopular, leastPopular, topTrack));
            }
        } catch (err) {
            console.log(err);
            dispatch({type: FETCH_HIPSTER_DATA_FAILURE, error: err.message});
        }
    }
}

function setHipsterData(hipsterPercent, mostPopularTrack, leastPopularTrack, topTrack) {
    return {
        type: FETCH_HIPSTER_DATA_SUCCESS,
        hipsterPercent,
        mostPopularTrack,
        leastPopularTrack,
        topTrack
    };
}
