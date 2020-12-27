import React, { Component } from "react";
import {connect} from 'react-redux';

import Landing from './components/Landing';
import Loading from './components/Loading';
import Results from './components/Results';
import {bindActionCreators} from "redux";
import {login, logout} from "./actions/authActions";
import { CLIENT_URL } from './constants/site';

class App extends Component {

    componentWillMount() {
        this.props.login();
        // this.props.history.push({}, CLIENT_URL);
    };

    render() {
        const { user, error, loading, logout } = this.props;
        const { loggedIn } = user;
        let loadingMessage = "Checking out your music taste...";
        return (
            <div className="App w-full h-full bg-gradient-to-b from-angsty-purple to-angsty-blue" >
                <nav className="w-full fixed flex-row p-7 text-xl">
                    <div className="flex justify-end">
                        <div className="text-white border-white border-2 rounded-full p-3 m-2">
                            About
                        </div>
                        {loggedIn &&
                            <div className="text-white border-white border-2 rounded-full p-3 m-2" onClick={() => logout()}>
                                Log Out
                            </div>
                        }
                    </div>
                </nav>
                <div className="pr-14 pl-14">
                    {
                        error ?
                            this.errorDisplay(error)
                            :
                            (
                                loading ?
                                    <Loading message={loadingMessage}/>
                                    : (
                                        loggedIn ?
                                            <Results />
                                            :
                                            <Landing />
                                    )
                            )
                    }
                </div>
            </div>
        );
    }

    errorDisplay(error) {
        return (
            <p>{error}</p>
        );
    }

}

function mapStateToProps(state) {
    return {
        user: state.user,
        error: state.site.error,
        loading: state.site.loading,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        login: bindActionCreators(login, dispatch),
        logout: bindActionCreators(logout, dispatch)
    };
}


export default connect(
    mapStateToProps,
    mapDispatchToProps,
) (App);
