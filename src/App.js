import React, { Component } from "react";
import {connect} from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import Landing from './components/Landing';
import Loading from './components/Loading';
import Results from './components/Results';
import Error from './components/Error';
import {bindActionCreators} from "redux";
import {login, logout} from "./actions/authActions";
import { CLIENT_URL } from './constants/site';

class App extends Component {

    componentWillMount() {
        this.props.login();
        this.props.history.push({}, CLIENT_URL);
    };

    render() {
        const { user, error, loading, logout } = this.props;
        const { loggedIn } = user;
        let loadingMessage = "Checking out your music taste...";
        return (
            <Router>
                <div className="App w-full h-full bg-gradient-to-b from-angsty-purple to-angsty-blue" >
                    <nav className="w-full fixed flex-row p-7 text-xl">
                        <ul className="flex justify-end">
                            <li className="text-white border-white border-2 rounded-full p-3 m-2">
                                <Link to="/about">About</Link>
                            </li>
                            {loggedIn &&
                                <li className="text-white border-white border-2 rounded-full p-3 m-2" onClick={() => logout()}>
                                    <Link to="/">Log Out</Link>
                                </li>
                            }
                        </ul>
                    </nav>
                    <Switch>
                        <Route path="/about">
                        </Route>
                        <Route path="/">
                            <Landing />
                        </Route>
                        <Route path="/results">
                            {
                                error ?
                                    <Error message={error} />
                                    :
                                    (
                                        loading ?
                                            <Loading message={loadingMessage}/>
                                            : <Results />
                                    )
                            }
                        </Route>
                    </Switch>
                    <div className="pr-14 pl-14">

                    </div>
                </div>
            </Router>
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
