import React, {Component} from 'react';
import styled from "styled-components";

const LogoComponent = styled.a`    
    flex: 2;
    
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

class Logo extends Component {
    render() {
        return (
            <LogoComponent href="#" className="logo">
                <img src={window.location.origin + '/images/logo.png'} alt="logo"/>
                <h2>Crypstal</h2>
            </LogoComponent>
        );
    }
}

export default Logo;
