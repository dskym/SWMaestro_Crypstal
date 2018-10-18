import React, { Component } from 'react';
import Bot from './Bot.js'
import BotAddButton from "./BotAddButton";
import BotDeleteButton from "./BotDeleteButton";

class BotList extends Component {
    render() {
        return (
            <div>
                <div className="vtabs customvtab">
                    <ul className="nav nav-tabs tabs-vertical bot-tab" role="tablist">
                        <Bot />
                        <BotAddButton />
                        <BotDeleteButton />
                    </ul>
                </div>
            </div>
        );
    }
}

export default BotList;
