import React, { Component } from 'react';
import styled from "styled-components";
import {connect} from 'react-redux';

import WebTickerElement from "./WebTickerElement";

const WebTickerComponent = styled.div`    
    display: flex;
    flex-direction: row;    

    flex: 6;
`;

const mapStateToProps = (state) => (
    {
        webTickerState: state.webTicker
    }
);

class WebTicker extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const webTicker = this.props.webTickerState;

        const webTickerElements = webTicker.marketConditionList.map((coin) =>
            <WebTickerElement exchange={ webTicker.exchange } coin={coin} />
        );

        return (
            <WebTickerComponent>
                { webTickerElements }
            </WebTickerComponent>
        );
    }
}

export default connect(mapStateToProps)(WebTicker);