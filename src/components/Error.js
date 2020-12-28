import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {login, logout} from "../actions/authActions";


class Error extends Component {

    render() {

        const {error, logout} = this.props;

        let message = 'Network Error';
        let subMessage = 'Please try again later';
        let showHomeButton = true;

        return(
            <div className="flex h-screen">
                <div className="m-auto text-center">
                    <h1 className="text-white text-6xl text-center p-7">{message}</h1>
                    <h3 className="text-white text-2xl text-center pb-7">{subMessage}</h3>
                    {
                        showHomeButton &&
                        <button onClick={() => logout()} className="text-white text-center text-lg border-white border-2 rounded-full p-2">Return Home</button>
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

