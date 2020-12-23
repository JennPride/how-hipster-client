import React, { Component } from "react";
import {connect} from 'react-redux';

import Landing from './components/Landing';
import Results from './components/Results';
import {bindActionCreators} from "redux";
import {login} from "./actions/authActions";

class App extends Component {

    render() {

        const { loggedIn } = this.props.user;

        return (
            <div className="App">
                {
                    loggedIn ?
                        <Results />
                        :
                        <Landing />
                }
            </div>
        );
    }

}

function mapStateToProps(state) {
    return {
        user: state.user,
        error: state.site.error,
        loading: state.site.loading
    };
}

function mapDispatchToProps(dispatch) {
    return {
        login: bindActionCreators(login, dispatch),
    };
}


export default connect(
    mapStateToProps,
    mapDispatchToProps,
) (App);
