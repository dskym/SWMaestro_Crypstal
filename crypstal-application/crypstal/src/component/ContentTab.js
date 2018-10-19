import React, { Component } from 'react';
import ContentTabElement from "./ContentTabElement";
import styled from "styled-components";

const ContentTabComponent = styled.ul`    
    display: flex;
    flex-direction: row;    
`;

class ContentTab extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contentList:['chart', 'info', 'store']
        };
    }

    render() {
        const contentTabElement = this.state.contentList.map((content) =>
            <ContentTabElement contentName={ content } />
        );

        return (
            <ContentTabComponent>
                { contentTabElement }
            </ContentTabComponent>
        );
    }
}

export default ContentTab;
