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
                <img src={window.location.origin + '/images/chart.png'} />
                {this.props.contentName}
            </ContentTabElementComponent>
        );
    }
}

export default ContentTabElement;
