import React, { Component } from 'react';

class TradeChart extends Component {
    render() {
        return (
            <div className="bot-chart hide">
                <div className="box">
                    <div className="box-header with-border">
                        <h6 className="box-title">Trade Chart</h6>
                    </div>
                    <div className="box-body">
                        <div className="chart">
                            {/*<div id="tradeChart" style="height: 500px;"></div>*/}
                            <div id="tradeChart"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TradeChart;
