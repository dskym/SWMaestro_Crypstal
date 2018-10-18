import React, { Component } from 'react';

class BotAddButton extends Component {
    render() {
        return (
            <li className="nav-item">
                <a className="nav-link" data-toggle="modal" data-target="#modal-add-bot">
                    <img src={window.location.origin + '/images/bot-add.png'} />
                    Add
                </a>
            </li>
        );
    }
}

export default BotAddButton;