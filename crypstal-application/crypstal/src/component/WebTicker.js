import React, { Component } from 'react';
import WebTickerElement from "./WebTickerElement";

class WebTicker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            exchange:'UPBIT',
            marketConditionList:[
                {
                    baseCurrency:'KRW',
                    cryptoCurrency:'BTC',
                    tradePrice:7366000,
                    change:'RISE',
                    signedChangePrice:39000,
                    signedChangeRate:0.0053227788
                },
                {
                    baseCurrency:'KRW',
                    cryptoCurrency:'DASH',
                    tradePrice:178100,
                    change:'FALL',
                    signedChangePrice:-1400,
                    signedChangeRate:-0.0077994429
                }
            ]
        };
    }

    render() {
        const webTickerElements = this.state.marketConditionList.map((coin) =>
            <WebTickerElement exchange={ this.state.exchange } coin={coin} />
        );

        return (
            <div className="webticker">
                <div id="webticker">
                    { webTickerElements }
                </div>
            </div>
        );
    }
}

export default WebTicker;