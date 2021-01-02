import axios from 'axios';

import {SUBMIT_CONTACT_EMAIL, SUBMIT_CONTACT_ERROR, SUBMIT_CONTACT_SUCCESS} from "../constants/actions";


export function addEmailToList(email) {
    return async(dispatch) => {
        dispatch({type: SUBMIT_CONTACT_EMAIL});
        try {
            const url = `${process.env.REACT_APP_SERVER_URL}/email-list`;
            const response = await axios.post(url, {email});
            const {error, success} = response.data || {};
            if (!error && success) {
                dispatch({type: SUBMIT_CONTACT_SUCCESS});
            } else {
                dispatch({type: SUBMIT_CONTACT_ERROR});
            }
        } catch (err) {
            console.log(err);
            dispatch({type: SUBMIT_CONTACT_ERROR});
        }
    }
}
