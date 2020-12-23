import * as types from '../../constants/actions';

const initialState = {
    hipsterPercent: null,
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
        default:
            return state;
    }
}
