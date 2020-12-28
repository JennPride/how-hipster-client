import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import React, { Component } from 'react';

import {login} from '../actions/authActions';
import {SERVER_URL} from "../constants/site";

class Landing extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showWhatIsThisBlurb: false,
        };
    }

    render() {

        const loginUrl = SERVER_URL + '/login';
        const { showWhatIsThisBlurb } = this.state;

        return (
            <div className="pt-60">
                <h1 className="text-white text-6xl text-center p-7"> How <span className="glow">Hipster</span> Are You?</h1>
                <h2 className="text-white text-2xl text-center px-4 max-w-4xl mx-auto my-0"> We'll analyze your listening habits to determine just how hipster - or mainstream - your taste in music is.</h2>
                <div className="text-center pt-6 pb-3">
                    <a href={loginUrl}>
                        <button className="text-white text-center text-2xl border-white border-2 rounded-full p-4" > Login with Spotify </button>
                    </a>
                </div>
                <p className="text-white text-lg text-center p-2 cursor-pointer" onClick={() => this.toggleWhatIsThis(!showWhatIsThisBlurb)}>What is this?</p>
                {
                    showWhatIsThisBlurb &&
                        <p className="text-white text-md text-center"> We use <a href="https://developer.spotify.com/" target="_blank"> Spotify's API </a>
                            to read and analyze your listening habits. Per Spotify's terms of use, we don't save any personal data
                            that we pull from the API. The first time you log in you'll see a range of "scope" values that we request access to -
                            which include your name (for the personalized message), and your listening habits (to determine your hipster percent), neither
                            of which are saved or used outside of this application. Unfortunately, we can't currently offer this test for the more hipster
                            music streaming services - consider yourselves too hipster to test.
                        </p>
                }
            </div>
        );
    }

    toggleWhatIsThis(showBlurb) {
        this.setState({
            showWhatIsThisBlurb: showBlurb
        });
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
