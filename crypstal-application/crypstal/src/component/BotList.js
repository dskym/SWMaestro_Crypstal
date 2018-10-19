import React, {Component} from 'react';
import Bot from './Bot.js'
import BotAddButton from "./BotAddButton";
import BotDeleteButton from "./BotDeleteButton";
import styled from "styled-components";

const BotListComponent = styled.div`    
    flex: 1;
    
    display: flex;
    flex-direction: column;
`;

class BotList extends Component {
    render() {
        return (
            <BotListComponent>
                <Bot/>
                <BotAddButton/>
                <BotDeleteButton/>
            </BotListComponent>
        );
    }
}

export default BotList;
