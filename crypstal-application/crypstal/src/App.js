import React, {Component} from 'react';
import styled from 'styled-components';

import Header from './component/Header';

import BotList from './component/BotList';
import BotSetting from './component/BotSetting';
import Content from "./component/Content";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

class App extends Component {
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
