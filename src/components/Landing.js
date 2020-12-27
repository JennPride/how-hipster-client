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
                <h1 className="text-white text-4xl text-center p-7"> How <span className="glow">Hipster</span> Are You?</h1>
                <h2 className="text-white text-2xl text-center p-3"> We'll analyze your listening habits to determine just how hipster your taste in music is.</h2>
                <div className="text-center pt-6 pb-3">
                    <a href={loginUrl}>
                        <button className="text-white text-center text-2xl border-white border-2 rounded-full p-4" > Login with Spotify </button>
                    </a>
                </div>
                <p className="text-white text-lg text-center p-2">What is this?</p>
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
