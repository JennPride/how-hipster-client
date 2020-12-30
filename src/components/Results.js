import {connect} from 'react-redux';
import React, { Component } from 'react';
import {
    withRouter,
} from "react-router-dom";
import {
    EmailShareButton,
    RedditIcon,
    EmailIcon,
    FacebookShareButton,
    FacebookIcon,
    TwitterIcon,
    RedditShareButton,
    TwitterShareButton,
} from "react-share";
import { get } from 'lodash';

import { CLIENT_URL } from "../constants/site";
import {bindActionCreators} from "redux";
import {addEmailToList} from "../actions/userActions";

class Results extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
        };
    }

    getHipsterBlurb(hipsterPercent) {
        if (hipsterPercent < 20) {
            return "Do you listen to anything other than Taylor Swift?";
        } else if (hipsterPercent < 35) {
            return "Eh, you're not totally mainstream.";
        } else if (hipsterPercent < 50) {
            return "You know some hidden tracks.";
        } else if (hipsterPercent < 60) {
            return "People go to you for fresh melodies.";
        } else if (hipsterPercent < 70) {
            return "You're always on the hunt for some underground sounds.";
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

    updateEmail(email) {
        console.log(email);
        this.setState({
            email
        });
    }

    render() {

        const {
            addEmailToList,
            user
        } = this.props;

        const {
            hipsterPercent = null,
            leastPopularTrack,
            mostPopularTrack,
            topTrack
        } = user || {};

        const quote = `I got ${hipsterPercent.toString}% hipster! Check out your hipster percent.`;
        const { email } = this.state;

        return (
            <div className="flex h-screen mt-20">
                <div className="m-auto pt-32">
                    {hipsterPercent &&
                        <div>
                            <h1 className="text-6xl text-center p-6 glow">{`${hipsterPercent.toString()}% Hipster`}</h1>
                            <p className="text-center text-3xl">{this.getHipsterBlurb(hipsterPercent)}</p>
                        </div>
                    }
                    <div className="flex flex-col sm:flex-row pt-10">
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
                    <div className="text-center px-20 pb-20">
                        <div className="py-4">
                            <h1 className="text-3xl py-4">Want to <span className="glow">improve</span> your hipster percent?</h1>
                            <p>I'm building an app to promote <span className="glow">lesser known artists' live shows </span> - and it will be ready to go when it's safe
                                for us all to sing, dance, perform, head-bang, crowd surf, and mosh together. If you're interested in staying in the loop (and joining the beta)
                                sign up to join my mailing list! Spam free guaranteed. </p>
                            <input type="email" className="w-80 h-10 text-lg rounded-full bg-transparent border-2 border-white focus:border-blue-100 mt-10 p-2" value={email} placeholder="totalHipster@gmail.com" onChange={(e) => this.updateEmail(e.target.value)}/>
                            <button className="text-white bg-transparent border-white border-2 rounded-full p-2 m-2 hover:bg-white hover:text-purple-900 transition duration-300 ease-in" onClick={() => addEmailToList(email)}>Submit</button>
                        </div>
                        <div className="py-4">
                            <h1 className="text-3xl py-4">Miss <span className="glow">live</span> shows?</h1>
                            <p>Consider giving to the <span className="glow">Save Our Stages</span> fund.
                                Donations go to help independent venues stay afloat in this distressing time. Check it out <a href="https://www.saveourstages.com/" target="_blank" className="underline glow cursor"> here </a> or visit
                                https://www.saveourstages.com/.</p>
                        </div>
                        <div>
                            <h1 className="text-2xl py-4">Share how hipster you are with friends!</h1>
                            <div className="flex justify-center align-center space-x-8">
                                <FacebookShareButton
                                    url={CLIENT_URL}
                                    quote={quote}
                                    hashtag="#thehipstertest">
                                    <FacebookIcon size={48} />
                                </FacebookShareButton>
                                <RedditShareButton
                                    url={CLIENT_URL}
                                    title={quote}>
                                    <RedditIcon size={48} />
                                </RedditShareButton>
                                <EmailShareButton
                                    subject={'Check out the Hipster Test!'}
                                    body={quote}
                                    url={CLIENT_URL}>
                                    <EmailIcon size={48}/>
                                </EmailShareButton>
                                <TwitterShareButton
                                    title={quote}
                                    hashtags={['hipster', 'thehipstertest', 'hipstertest']}
                                    url={CLIENT_URL}>
                                    <TwitterIcon size={48}/>
                                </TwitterShareButton>
                            </div>
                        </div>
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

function mapDispatchToProps(dispatch) {
    return {
        addEmailToList: bindActionCreators(addEmailToList, dispatch),
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Results));
