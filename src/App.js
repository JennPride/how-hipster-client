import React, { Component } from "react";
import {connect} from 'react-redux';

import Landing from './components/Landing';
import Results from './components/Results';
import {bindActionCreators} from "redux";
import {login} from "./actions/authActions";
import { CLIENT_URL } from './constants/site';

class App extends Component {

    componentWillMount() {
        this.props.login();
        // this.props.history.push({}, CLIENT_URL);
    };

    render() {
        const { user, error, loading, loadingMessage } = this.props;
        const { loggedIn } = user;

        return (
            <div className="App">
                {
                    error ?
                        this.errorDisplay(error)
                        :
                        (
                            loading ?
                                this.loadingDisplay(loadingMessage)
                                : (
                                    loggedIn ?
                                        <Results />
                                        :
                                        <Landing />
                                )
                        )
                }
            </div>
        );
    }

    errorDisplay(error) {
        return (
            <p>{error}</p>
        );
    }

    loadingDisplay(message) {
        const loadingMessage = `${message || ''}...`;
        return (
            <p>{loadingMessage}</p>
        );
    }

}

function mapStateToProps(state) {
    return {
        user: state.user,
        error: state.site.error,
        loading: state.site.loading,
        loadingMessage: state.site.loadingMessage
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
