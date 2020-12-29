import {connect} from 'react-redux';
import React, { Component } from 'react';
import {
    withRouter,
} from "react-router-dom";
import {
    EmailShareButton,
    FacebookShareButton,
    FacebookIcon,
    InstapaperShareButton,
    RedditShareButton,
    TwitterShareButton,
} from "react-share";
import { get } from 'lodash';

import { CLIENT_URL } from "../constants/site";

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

        const quote = `I got ${hipsterPercent.toString}% hipster! Check out your hipster percent.`;

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
                    <div>
                        <h1 className="text-center text-2xl">Share how hipster you are with friends!</h1>
                        <div className="flex text-center">
                            <FacebookShareButton
                                url={CLIENT_URL}
                                quote={quote}
                                hashtag="#thehipstertest">
                                <FacebookIcon size={36} />
                            </FacebookShareButton>
                        </div>
                    </div>
                    <div>
                        <p>Want to improve your hipster percent?</p>
                        <p>I'm currently building an app to promote lesser known artists' live shows - and it will be ready to go when it's safe
                        for us all to sing, dance, perform, head-bang, crowd surf, and mosh together. If you're interested in staying in the loop (and joining the beta)
                        sign up to join my mailing list! Spam free guaranteed. </p>
                    </div>
                    <div>
                        <p>Miss live shows?</p>
                        <p>Consider giving to the <span className="glow">Save Our Stages</span> fund.
                            Donations go to help independent venues stay afloat in this distressing time. Check it out <a href="https://www.saveourstages.com/" target="_blank" className="underline glow cursor"> here </a> or visit
                            https://www.saveourstages.com/.</p>
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
