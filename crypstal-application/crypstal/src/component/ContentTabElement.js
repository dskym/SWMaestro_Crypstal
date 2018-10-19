import React, {Component} from 'react';
import styled from "styled-components";

const ContentTabElementComponent = styled.li`
    flex: 1;
`;

class ContentTabElement extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ContentTabElementComponent>
                <a className="nav-link active" data-toggle="tab" href={ '#' + this.props.content } role="tab">
                    <img src={window.location.origin + '/images/chart.png'} />Chart
                </a>
            </ContentTabElementComponent>
        );
    }
}

export default ContentTabElement;
