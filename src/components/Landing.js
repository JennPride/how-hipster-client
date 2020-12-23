import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import React, { Component } from 'react';

import {login} from '../actions/authActions';

class Landing extends Component {

    render() {
        return (
            <div className="Landing">
                <h1> How Hipster Are You? </h1>
                <h3> Blah </h3>
                <div className="app-buttonContainer">
                    <a onClick={() => this.props.login()}>
                        <button className="largeButton"> Log In With Spotify </button>
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
