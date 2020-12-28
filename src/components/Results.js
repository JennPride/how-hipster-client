import {connect} from 'react-redux';
import React, { Component } from 'react';
import {bindActionCreators} from "redux";
import {login} from "../actions/authActions";

class Results extends Component {

    render() {

        const { hipsterPercent, leastPopularTrack, mostPopularTrack } = this.props.user || {};

        if (hipsterPercent && leastPopularTrack && mostPopularTrack) {
            return (
                <div className="flex h-screen">
                    <div className="m-auto">
                        <h1 className="text-white text-6xl text-center pb-40">{hipsterPercent.toString()}</h1>
                    </div>
                </div>
            );
        } else {
            return (
                <p>Unable to get hipster-ness.</p>
            );
        }
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    };
}


export default connect(mapStateToProps, null)(Results)
