import {
    FETCH_HIPSTER_DATA,
    FETCH_HIPSTER_DATA_FAILURE,
    FETCH_HIPSTER_DATA_SUCCESS, REFRESH_TOKEN_FAILURE,
    REFRESH_TOKEN_REQUEST, REFRESH_TOKEN_SUCCESS,
    SET_LOADING_MESSAGE
} from "../../constants/actions";

const initialState = {
    error: null,
    loading: false,
    loadingMessage: '',
};

export default function(state = initialState, action) {
    switch (action.type) {
        case FETCH_HIPSTER_DATA:
            return Object.assign({}, state, {
                error: null,
                loading: true,
            });
        case FETCH_HIPSTER_DATA_FAILURE:
            return Object.assign({}, state, {
                error: action.error,
                loading: false,
            });
        case FETCH_HIPSTER_DATA_SUCCESS:
            return Object.assign({}, state, {
               loading: false,
               error: null
            });
        case REFRESH_TOKEN_FAILURE:
            return Object.assign({}, state, {
                error: action.error
            });
        case REFRESH_TOKEN_SUCCESS:
            return Object.assign({}, state, {
                error: null
            });
        case SET_LOADING_MESSAGE:
            return Object.assign({}, state, {
                loadingMessage: action.loadingMessage
            });
        default:
            return state;
    }
}
