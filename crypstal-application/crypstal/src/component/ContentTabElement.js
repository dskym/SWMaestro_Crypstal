import React, {Component} from 'react';
import styled from "styled-components";

const ContentTabElementComponent = styled.li`
    flex: 1;
    
    display: flex;
    flex-direction: column;
`;

class ContentTabElement extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const contentName = this.props.contentName;

        return (
            <ContentTabElementComponent>
                <img src={window.location.origin + '/images/' + contentName + '.png'} />
                <span>{contentName}</span>
            </ContentTabElementComponent>
        );
    }
}

export default ContentTabElement;
