import React, { Component } from 'react';
import styled from "styled-components";

import ContentTab from "./ContentTab";
import Chart from "./Chart";
import Info from "./Info";
import BotList from "./BotList";
import BotSetting from "./BotSetting";

const ContentComponent = styled.div`    
    display: flex;
    flex-direction: row;    
`;

class Content extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ContentComponent>
                <BotList/>
                <BotSetting/>
                <Info/>
            </ContentComponent>
        );
    }
}

export default Content;