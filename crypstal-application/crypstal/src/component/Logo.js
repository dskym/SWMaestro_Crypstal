import React, { Component } from 'react';
import styled from "styled-components";

const LogoComponent = styled.div`    
    flex: 2;
`;

class Logo extends Component {
    render() {
        return (
            <LogoComponent>
                <a href="index.html" className="logo">
                    <b className="logo-mini">
                        <img src={window.location.origin + '/images/logo.png'} alt="logo"/>
                    </b>
                    <span className="logo-lg">
                        <h2>Crypstal</h2>
                    </span>
                </a>
            </LogoComponent>
        );
    }
}

export default Logo;
