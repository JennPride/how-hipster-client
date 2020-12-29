import {connect} from 'react-redux';
import React, { Component } from 'react';
import {
    withRouter,
} from "react-router-dom";
import { get } from 'lodash';

class Results extends Component {

    getHipsterBlurb(hipsterPercent) {
        if (hipsterPercent < 20) {
            return "Absolutely not hipster";
        } else if (hipsterPercent < 35) {
            return "Eh, you're not totally mainstream";
        } else if (hipsterPercent < 50) {
            return "You know some hidden tracks";
        } else if (hipsterPercent < 60) {
            return "People go to you for fresh melodies";
        } else if (hipsterPercent < 70) {
            return "You're always on the hunt for some underground sounds";
        } else if (hipsterPercent < 80) {
            return "Do people ever know what you're listening to?";
        } else {
            return "Certified hipster";
        }
    }

    getTrackDetails(track, helpedHipsterPercent) {
        const header = helpedHipsterPercent ? 'This Song Helped You Most' : 'This Song Hurt You Most';
        const order = helpedHipsterPercent ? `order-1 sm:order-0` : `order-2`;
        const {album, name, artists = [], popularity, uri} = track;
        const albumImage = get(album, 'images.0.url');
        const artistString = this.getArtistString(artists);
        return (
            <div className={`text-center cursor m-auto self-auto sm:self-end ${order} py-4 sm:py-10`}>
                <p className="text-lg pb-3">{header}</p>
                <div>
                    <a href={uri} target="_blank">
                        <img src={albumImage} className="w-44 block m-auto"/>
                        <p className="text-lg">{name}</p>
                        <p className="text-md">by {artistString}</p>
                        <p className="text-sm">Popularity: {popularity}/100</p>
                    </a>
                </div>
            </div>
        )
    }

    getTopTrackDetails(track) {
        const {album, name, artists = [], popularity, uri} = track;
        const albumImage = get(album, 'images.0.url');
        const artistString = this.getArtistString(artists);
        return (
            <div className="text-center cursor order-1 sm:order-2 self-auto sm:self-end px-10 py-4 sm:py-10">
                <p className="text-4xl pb-1">Your Top Track</p>
                <p className="text-lg pb-3">Well, according to Spotify</p>
                <div>
                    <a href={uri} target="_blank">
                        <img src={albumImage} className="w-60 block m-auto"/>
                        <p className="text-2xl">{name}</p>
                        <p className="text-xl">by {artistString}</p>
                        <p className="text-md">Popularity: {popularity}/100</p>
                    </a>
                </div>
            </div>
        )
    }

    getArtistString(artists = []) {
        const artistArray = artists.map(artist => artist.name);
        return artistArray.length == 1 ? artistArray[0] : [ artistArray.slice(0, artistArray.length - 1).join(", "), artistArray[artistArray.length - 1] ].join(" and ");
    }

    render() {

        const {
            hipsterPercent = null,
            leastPopularTrack,
            mostPopularTrack,
            topTrack
        } = this.props.user || {};

        return (
            <div className="flex h-screen mt-20">
                <div className="m-auto pt-32">
                    {hipsterPercent &&
                        <div>
                            <h1 className="text-6xl text-center p-6 glow">{`${hipsterPercent.toString()}% Hipster`}</h1>
                            <p className="text-center text-3xl">{this.getHipsterBlurb(hipsterPercent)}</p>
                        </div>
                    }
                    <div className="flex flex-col sm:flex-row py-10">
                    {topTrack &&
                        this.getTopTrackDetails(topTrack)
                    }
                    {
                        mostPopularTrack &&
                        this.getTrackDetails(mostPopularTrack, false)
                    }
                    {
                        leastPopularTrack &&
                        this.getTrackDetails(leastPopularTrack, true)
                    }
                    </div>
                </div>
            </div>
        );
    }

}

function mapStateToProps(state) {
    return {
        user: state.user
    };
}


export default withRouter(connect(mapStateToProps, null)(Results));
