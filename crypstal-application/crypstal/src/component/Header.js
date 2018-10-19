import React, { Component } from 'react';
import styled from 'styled-components';


import Logo from "./Logo";
import WebTicker from './WebTicker';
import Menu from './Menu';

const HeaderComponent = styled.div`
    display: flex;
    flex-direction: row;
    
    flex: 3;
`;

class Header extends Component {
    render() {
        return (
            <HeaderComponent>
                <Logo/>
                <WebTicker/>
                <Menu/>
            </HeaderComponent>
        );
    }
}

export default Header;
