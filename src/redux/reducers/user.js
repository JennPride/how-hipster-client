import * as types from '../../constants/actions';

const initialState = {
    hipsterPercent: null,
    mostPopularTrack: null,
    leastPopularTrack: null,
    topArtists: [],
    name: null,
    loggedIn: false,
    authToken: null,
    refreshToken: null
};

export default function(state = initialState, action) {
    switch (action.type) {
        case types.LOGIN:
            return Object.assign({}, state, {
               loggedIn: true,
                authToken: action.authToken,
                refreshToken: action.refreshToken
            });
        case types.LOGOUT:
            return Object.assign({}, state, initialState);
        case types.FETCH_HIPSTER_DATA_SUCCESS:
            return Object.assign({}, state, {
                hipsterPercent: action.hipsterPercent,
                mostPopularTrack: action.mostPopularTrack,
                leastPopularTrack: action.leastPopularTrack,
                topTrack: action.topTrack
            });
        case types.REFRESH_TOKEN_SUCCESS:
            return Object.assign({}, state, {
               authToken: action.authToken
            });
        case types.REFRESH_TOKEN_FAILURE:
            return Object.assign({}, state, initialState);
        case types.FETCH_ARTISTS_SUCCESS:
            return Object.assign({}, state, {
               topArtists: action.topArtists
            });
        default:
            return state;
    }
}
