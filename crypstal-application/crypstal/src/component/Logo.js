import React, { Component } from 'react';
import logo from '../logo.png';

class Logo extends Component {
    render() {
        return (
            <div>
                <a href="index.html" className="logo">
                    <b className="logo-mini">
                        <img src={logo} alt="logo"/>
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
