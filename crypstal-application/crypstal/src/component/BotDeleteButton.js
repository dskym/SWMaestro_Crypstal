import React, { Component } from 'react';

class BotDeleteButton extends Component {
    render() {
        return (
            <li className="nav-item">
                <a className="nav-link" data-toggle="modal" data-target="#moodal-delete-bot">
                    <img src={window.location.origin + '/images/bot-minus.png'} />
                    Delete
                </a>
            </li>
        );
    }
}

export default BotDeleteButton;
