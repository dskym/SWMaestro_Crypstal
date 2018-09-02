import React, { Component } from 'react';

class Logo extends Component {
    render() {
        return (
            <div>
                <a href="index.html" className="logo">
                    <b className="logo-mini">
                        <img src="../images/logo.png" alt="logo"/>
                    </b>
                    <span className="logo-lg">
                        <h2>Crypstal</h2>
                    </span>
                </a>
            </div>
        );
    }
}

export default Logo;
