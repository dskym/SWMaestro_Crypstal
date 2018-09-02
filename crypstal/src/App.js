import React, { Component } from 'react';
import './App.css';
import Webticker from './component/Webticker';
import BotList from './component/BotList';
import BotSetting from './component/BotSetting';
import Info from './component/Info';

class App extends Component {
    render() {
        return (
            <div>
                <div className="main-header">
                    <div className="logo">
                    </div>
                    <Webticker className="bot-list">
                    </Webticker>
                    <div className="menu">
                    </div>
                </div>
                <div className="content-wrapper">
                    <div className="content">
                        <div className="bot">
                            <BotList className="bot-list">
                            </BotList>
                            <BotSetting className="bot-setting">
                            </BotSetting>
                        </div>
                        <Info className="info">
                        </Info>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
