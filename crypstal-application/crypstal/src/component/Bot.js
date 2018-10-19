import React, {Component} from 'react';

class Bot extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li>
                <img src={window.location.origin + '/images/robot.png'}/>
                <span className="bot-name">{this.props.botName}</span>
            </li>
        );
    }
}

export default Bot;
