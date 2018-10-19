import React, { Component } from 'react';
import styled from "styled-components";

import TradeResult from "./TradeResult";
import TradeHistory from "./TradeHistory";
import TradeChart from "./TradeChart";
import BotStore from "./BotStore";
import Chart from "./Chart";
import ContentTab from "./ContentTab";

const InfoComponent = styled.div`    
    flex: 6;
`;

class Info extends Component {
    render() {
        return (
            <InfoComponent>
                <div className="box box-default mb-0">
                    <div className="box-body p-5">
                        <ContentTab/>
                        <div className="tab-content tabcontent-border content-detail">
                            <div className="tab-pane" id="store" role="tabpanel">
                                <Chart/>
                            </div>
                            <div className="tab-pane" id="info" role="tabpanel">
                                <div className="bot-info">
                                    <div className="pad">
                                        <div className="row">
                                            <div className="col-lg-6 col-12">
                                                <TradeResult/>
                                            </div>

                                            <div className="col-lg-6 col-12">
                                                <TradeHistory/>
                                            </div>

                                            <div className="col-lg-12 col-12">
                                                <TradeChart/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane" id="store" role="tabpanel">
                                <BotStore/>
                            </div>
                        </div>
                    </div>
                </div>
            </InfoComponent>
        );
    }
}

export default Info;
