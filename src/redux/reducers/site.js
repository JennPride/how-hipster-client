import * as actions from "../../constants/actions";

const initialState = {
    error: null,
    loading: false,
    loadingMessage: '',
};

export default function(state = initialState, action) {
    switch (action.type) {
        case actions.LOGOUT:
            return Object.assign({}, state, initialState);
        case actions.FETCH_HIPSTER_DATA:
            return Object.assign({}, state, {
                error: null,
                loading: true,
            });
        case actions.FETCH_HIPSTER_DATA_FAILURE:
            return Object.assign({}, state, {
                error: action.error,
                loading: false,
            });
        case actions.FETCH_HIPSTER_DATA_SUCCESS:
            return Object.assign({}, state, {
               loading: false,
               error: null
            });
        case actions.REFRESH_TOKEN_FAILURE:
            return Object.assign({}, state, {
                error: action.error
            });
        case actions.REFRESH_TOKEN_SUCCESS:
            return Object.assign({}, state, {
                error: null
            });
        case actions.SET_LOADING_MESSAGE:
            return Object.assign({}, state, {
                loadingMessage: action.loadingMessage
            });
        default:
            return state;
    }
}
