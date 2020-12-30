import axios from 'axios';

import {SUBMIT_CONTACT_EMAIL, SUBMIT_CONTACT_ERROR, SUBMIT_CONTACT_SUCCESS} from "../constants/actions";


export function addEmailToList(email) {
    console.log(email);
    let url = 'https://api.sendinblue.com/v3/contacts';
    const emailRequest = {
        method: 'post',
        url,
        params: {
            updateEnabled: false,
            email,
        },
        headers: {
            'Content-Type': 'application/json',
            'api-key': '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'
        }
    };
    console.log(emailRequest);

    return async(dispatch) => {
        dispatch({type: SUBMIT_CONTACT_EMAIL});
        try {
            const response = await axios.post(url, json, {
                headers: {
                    // Overwrite Axios's automatically set Content-Type
                    'Content-Type': 'application/json'
                }
            });
            console.log(response);
            dispatch({type: SUBMIT_CONTACT_SUCCESS});
        } catch (err) {
            console.log(err);
            dispatch({type: SUBMIT_CONTACT_ERROR});
        }
    }
}
