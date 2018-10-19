import React, {Component} from "react";
import styled from "styled-components";

import Bot from './Bot'
import BotAddButton from "./BotAddButton";
import BotDeleteButton from "./BotDeleteButton";

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
