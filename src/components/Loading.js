import React, {Component} from 'react';
import {connect} from "react-redux";

class Loading extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message: 'Judging music taste'
        };
    }

    render() {

        const { message } = this.state;

        return(
            <div className="flex h-screen">
                <div className="m-auto text-center">
                    <h1 className="text-white text-6xl text-center p-7">{message}...</h1>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        topArtists: state.user.topArtists,
    };
}


export default connect(mapStateToProps, null)(Loading);
