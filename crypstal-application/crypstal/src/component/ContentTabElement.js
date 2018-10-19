import React, {Component} from 'react';

class ContentTabElement extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li className="nav-item">
                <a className="nav-link active" data-toggle="tab" href={ '#' + this.props.content } role="tab">
                    <img src={window.location.origin + '/images/chart.png'} />Chart
                </a>
            </li>
        );
    }
}

export default ContentTabElement;
