import axios from 'axios';

import {SERVER_URL} from '../constants/site';
import {LOGIN} from '../constants/actions';

export function login() {
    return async(dispatch, getState) => {

        const {authToken, refreshToken} = getState().user;

        if (!authToken || !refreshToken) {
            try {
                const tokenResponse = await axios.get(`${SERVER_URL}/login`);
                const { error } = tokenResponse;
            } catch (err) {
                console.log(err);
            }
        }

        return {
            type: LOGIN
        };
    }
}
