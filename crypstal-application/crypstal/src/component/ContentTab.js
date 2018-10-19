import React, {Component} from 'react';
import {Nav, NavItem, NavLink} from 'reactstrap';

import ContentTabElement from "./ContentTabElement";
import styled from "styled-components";
import classnames from 'classnames';

const ContentTabComponent = styled.ul`    
    display: flex;
    flex-direction: row;    
`;

class ContentTab extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contentList: ['chart', 'trade', 'store']
        };
    }

    render() {
        const contentTabElement = this.state.contentList.map((content) =>
            <NavItem>
                <NavLink
                    className={classnames({active: this.state.activeTab === content})}
                    onClick={() => {this.props.toggle(content);}}
                >
                    <ContentTabElement contentName={content}/>
                </NavLink>
            </NavItem>
        );

        return (
            <Nav tabs>
                {contentTabElement}
            </Nav>
            /*
                <ContentTabComponent>
                    { contentTabElement }
                </ContentTabComponent>
                */
        )
            ;
    }
}

export default ContentTab;
