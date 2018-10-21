import React, {Component} from 'react';
import styled from 'styled-components';

import Header from './component/Header';

import Content from "./component/Content";
import BotAddModal from "./component/BotAddModal";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

class App extends Component {
    componentDidMount() {
        document.title = "Crypstal";
    }

    render() {
        return (
            <Wrapper>
                <Header/>

                <Content/>
            </Wrapper>
        );
    }
}

export default App;
