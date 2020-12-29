import React, { Component } from "react";
import {connect} from 'react-redux';
import {
    Switch,
    Route,
    Link,
    NavLink,
    withRouter,
    BrowserRouter
} from "react-router-dom";
import Particles from 'react-particles-js';

import About from './components/About';
import Landing from './components/Landing';
import Loading from './components/Loading';
import Results from './components/Results';
import Error from './components/Error';
import {bindActionCreators} from "redux";
import {login, logout} from "./actions/authActions";

class App extends Component {

    componentWillMount() {
        this.props.login();
    };

    render() {
        const { user, error, loading, logout, location} = this.props;
        const { loggedIn, topArtists } = user;
        let loadingMessage = "Checking out your music taste...";
        return (
            <BrowserRouter>
                <Particles
                    width='100%'
                    height='100%'
                    params={{
                        particles: {
                            number: {
                                value: 400,
                                density: {
                                    enable: true,
                                    value_area: 1000
                                }
                            },
                            color: {
                                value: '#fff'
                            },
                            opacity: {
                                value: 0.3,
                                anim: {
                                    enable: true
                                }
                            },
                            size: {
                                value: 3,
                                random: true,
                                anim: {
                                    enable: true,
                                    speed: 7
                                }
                            },
                            line_linked: {
                                enable: false
                            },
                            move: {
                                speed: 1
                            }
                        }
                    }}
                    style={{
                        position: 'fixed',
                        'z-index': '1'
                    }}/>
                <div className="App w-full h-full bg-gradient-to-b from-angsty-purple to-angsty-blue fixed overflow-scroll text-white" >
                    <nav className="w-full fixed flex-row p-7 text-xl">
                        <ul className="flex justify-end">
                            <li className="bg-angsty-purple text-white border-white border-2 rounded-full p-3 m-2 hover:bg-white hover:text-purple-900 transition duration-300 ease-in">
                                <NavLink to="/about">About</NavLink>
                            </li>
                            <li className="bg-angsty-purple text-white border-white border-2 rounded-full p-3 m-2 hover:bg-white hover:text-purple-900 transition duration-300 ease-in">
                                <NavLink to="/">Home</NavLink>
                            </li>
                            {loggedIn &&
                                <li className="bg-angsty-purple text-white border-white border-2 rounded-full p-3 m-2 hover:bg-white hover:text-purple-900 transition duration-300 ease-in" onClick={() => logout()}>
                                    <Link to="/">Log Out</Link>
                                </li>
                            }
                        </ul>
                    </nav>
                    <Switch>
                        <Route path="/about" component={About} />
                        <Route path="/">
                            {
                                error ?
                                    <Error message={error} />
                                    :
                                    (
                                        loading ?
                                            <Loading message={loadingMessage} artistArray={topArtists}/>
                                            : (
                                                loggedIn ?
                                                    <Results />
                                                    :
                                                    <Landing />
                                            )
                                    )
                            }
                        </Route>
                    </Switch>
                    <div className="pr-14 pl-14">
                    </div>
                    <div className="text-purple-900 bg-white  text-center fixed left-0 bottom-0 w-full">
                        <p> ⓒ <a href="http://www.jenniferpridemore.com" target="_blank">Jennifer Pridemore 2020</a></p>
                    </div>
                </div>
            </BrowserRouter>
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


export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps,
)(App));

