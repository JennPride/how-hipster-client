import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {login, logout} from "../actions/authActions";
import {NETWORK_ERROR} from "../constants/responseMessages";


class Error extends Component {

    render() {

        const {error, logout} = this.props;

        let message = error === NETWORK_ERROR ? "Uh oh, we're having a little trouble." : error;
        let subMessage = "This is super awkward. Come back in a little bit?";
        let showHomeButton = true;

        return(
            <div className="flex h-screen">
                <div className="m-auto text-center">
                    <h1 className="text-white text-6xl text-center p-7">{message}</h1>
                    <h3 className="text-white text-2xl text-center pb-7">{subMessage}</h3>
                    {
                        showHomeButton &&
                        <button onClick={() => logout()} className="text-white text-center text-lg border-white border-2 rounded-full p-2 hover:bg-white hover:text-purple-900 transition duration-300 ease-in">Return Home</button>
                    }
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        error: state.site.error
    };
}

function mapDispatchToProps(dispatch) {
    return {
        login: bindActionCreators(login, dispatch),
        logout: bindActionCreators(logout, dispatch)
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Error);

