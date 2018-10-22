import React, { Component } from 'react';
import styled from "styled-components";
import {connect} from 'react-redux';

import TradeResult from "./TradeResult";
import TradeHistory from "./TradeHistory";
import TradeChart from "./TradeChart";

const TradeComponent = styled.div`
    display: flex;
    flex-direction: column;
`;

const TradeInformationComponent = styled.div`
    display: flex;
    flex-direction: row;
    
    flex: 1;
`;

const TradeChartComponent = styled.div`    
    flex: 1;
`;

const mapStateToProps = (state) => (
    {
        backtestState: state.backtest
    }
);

class Trade extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {result, history} = this.props.backtestState;

        return (
            <TradeComponent>
                <TradeInformationComponent>
                    <TradeResult result={result}/>
                    <TradeHistory history={history}/>
                </TradeInformationComponent>
                <TradeChartComponent>
                    <TradeChart/>
                </TradeChartComponent>
            </TradeComponent>
        );
    }
}

export default connect(mapStateToProps)(Trade);
