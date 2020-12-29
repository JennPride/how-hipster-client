import {connect} from 'react-redux';
import React, { Component } from 'react';
import {
    withRouter,
} from "react-router-dom";

class About extends Component {

    render() {
        return (
            <div className="m-auto mt-36 mx-28 h-full mb-20">
                <h1 className="text-4xl pb-8">What is this?</h1>
                <p className="text-xl">The <span className="glow">Hipster Test</span> is a little application I built to experiment with the Spotify API and familiarize
                    myself with some new technologies. All of the data pulled from Spotify is never saved anywhere, and the login
                    credentials never touch my site (you'll see Spotify pop up with their own log in window, similar to logging in
                    through Facebook or Instagram on other sites).</p>
                <br/>
                <h1 className="text-4xl py-8">What's next?</h1>
                <p className="text-xl">While this application may be (tentatively) done, I have plans for a <span className="glow">bigger, badder application</span> coming up.
                    The new app will focus on <span className="glow">lesser known artists</span> coming to play in <span className="glow">concerts</span> near you, aggregating and filtering based on your preferences.
                    Pretty cool, right? If you're interested in staying in the loop about this upcoming application, and other hipster-centric apps, <span className="glow">sign up </span>to receive updates!
                </p>
                <br/>
                <p className="text-xl">
                    Oh, and if you're extra bummed (like me) about not being able to see <i>any</i> shows this year, consider giving to the <span className="glow">Save Our Stages</span> fund.
                    Donations go to help independent venues stay afloat in this distressing time. Check it out <a href="https://www.saveourstages.com/" target="_blank" className="underline glow cursor"> here </a> or visit
                    https://www.saveourstages.com/.
                </p>
            </div>
        );
    }
}


export default withRouter(connect(null, null)(About));
