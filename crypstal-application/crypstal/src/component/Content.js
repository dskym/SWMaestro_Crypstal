import React, { Component } from 'react';
import styled from "styled-components";

import ContentTab from "./ContentTab";
import Chart from "./Chart";
import Info from "./Info";
import BotList from "./BotList";
import BotSetting from "./BotSetting";
import connect from "react-redux/es/connect/connect";

const ContentComponent = styled.div`    
    display: flex;
    flex-direction: row;    
`;

const mapStateToProps = (state) => (
    {
        botsState: state.bot
    }
);

class Content extends Component {
    constructor(props) {
        super(props);

        this.state = {
            botIndex: 0,
            botId: 1
        };

        this.changeBot = this.changeBot.bind(this);
    }

    changeBot(id, index) {
        if(this.state.botId !== id) {
            this.setState({
                botId: id,
                botIndex: index
            });
        }
    }

    render() {
        return (
            <ContentComponent>
                <BotList
                    bots={this.props.botsState}
                    botId={this.state.botId}
                    changeBot={this.changeBot}
                />
                <BotSetting
                    botState={this.props.botsState[this.state.botIndex]}
                />
                <Info/>
            </ContentComponent>
        );
    }
}

export default connect(mapStateToProps)(Content);