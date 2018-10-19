import React, {Component} from 'react';
import styled from "styled-components";
import {TabContent, TabPane} from 'reactstrap';

import ContentTab from "./ContentTab";
import Chart from "./Chart";
import Trade from "./Trade";
import BotStore from "./BotStore";

const InfoComponent = styled.div`    
    flex: 6;
`;

class Info extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: 'chart'
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle(tab) {
        if(this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render() {
        return (
            <InfoComponent>
                <ContentTab toggle={this.toggle}/>

                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="chart">
                        <Chart/>
                    </TabPane>
                    <TabPane tabId="trade">
                        <Trade/>
                    </TabPane>
                    <TabPane tabId="store">
                        <BotStore/>
                    </TabPane>
                </TabContent>
                {/*
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
                                                <TradeResult result={result}/>
                                            </div>

                                            <div className="col-lg-6 col-12">
                                                <TradeHistory history={history}/>
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
                */}
            </InfoComponent>
        );
    }
}

export default Info;
