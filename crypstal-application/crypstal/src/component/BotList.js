import React, {Component} from "react";
import styled from "styled-components";
import {Nav, NavItem, NavLink} from 'reactstrap';

import Bot from './Bot'
import BotAddButton from "./BotAddButton";
import BotDeleteButton from "./BotDeleteButton";
import classnames from "classnames";

const BotListComponent = styled.div`    
    flex: 1;
    
    display: flex;
    flex-direction: column;
`;

class BotList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const bots = this.props.bots.map((bot, index) =>
            <NavItem>
                <NavLink
                    className={classnames({active: this.props.botId === bot.id})}
                    onClick={() => {this.props.changeBot(bot.id, index);}}
                >
                    <Bot botName={bot.name}/>
                </NavLink>
            </NavItem>
        );

        return (
            <BotListComponent>
                <Nav vertical pills>
                    {bots}
                    <NavItem>
                        <NavLink
                            onClick={() => {}}
                        >
                            <BotAddButton/>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            onClick={() => {}}
                        >
                            <BotDeleteButton/>
                        </NavLink>
                    </NavItem>
                </Nav>
            </BotListComponent>
        );
    }
}

export default BotList;
