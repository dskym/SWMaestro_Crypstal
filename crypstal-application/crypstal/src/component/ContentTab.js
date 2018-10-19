import React, { Component } from 'react';
import ContentTabElement from "./ContentTabElement";

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
            <div>
                <ul className="nav nav-tabs content-tab" role="tablist">
                    { contentTabElement }
                </ul>
            </div>
        );
    }
}

export default ContentTab;
