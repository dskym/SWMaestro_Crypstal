import React, { Component } from 'react';

class Bot extends Component {
    render() {
        return (
            <li className={'nav-item bot' + '1'}>
                <a className="nav-link active" data-toggle="tab" href="#bot1" role="tab" aria-expanded="true">
                    <img src={window.location.origin + '/images/robot.png'} />
                    <span className="bot-name">승윤봇</span>
                </a>
            </li>
        );
    }
}

export default Bot;
