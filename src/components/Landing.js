import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import React, { Component } from 'react';

import {login} from '../actions/authActions';
import {SERVER_URL} from "../constants/site";

class Landing extends Component {

    render() {

        const loginUrl = SERVER_URL + '/login';

        return (
            <div className="pt-60">
                <h1 className="text-white text-4xl text-center p-7"> How Hipster Are You? </h1>
                <div className="text-center">
                    <a href={loginUrl}>
                        <button className="text-white text-center text-2xl border-white border-2 rounded-full p-3" > Log In With Spotify </button>
                    </a>
                </div>
            </div>
        );
    }
}

Landing.propTypes = {
    login: PropTypes.function
};

function mapDispatchToProps(dispatch) {
    return {
        login: bindActionCreators(login, dispatch),
    };
}


export default connect(null, mapDispatchToProps)(Landing)
