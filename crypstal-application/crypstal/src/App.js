import React, {Component} from 'react';
import './App.css';
import { Container, Row, Col } from 'reactstrap';
import WebTicker from './component/WebTicker';
import BotList from './component/BotList';
import BotSetting from './component/BotSetting';
import Info from './component/Info';
import Logo from './component/Logo';
import Menu from './component/Menu';

class App extends Component {
    render() {
        return (
            <div>
                <div className="wrapper">
                    <div className="main-header">
                        <div className="logo">
                            <nav className="navbar navbar-static-top">
                                <Container>
                                    <Row>
                                        <Col md="2" lg="2">
                                            <Logo className="logo pl-0">
                                            </Logo>
                                        </Col>
                                        <Col md="8" lg="8">
                                            <WebTicker>
                                            </WebTicker>
                                        </Col>
                                        <Col md="2" lg="2">
                                            <Menu>
                                            </Menu>
                                        </Col>
                                    </Row>
                                </Container>
                            </nav>
                        </div>
                    </div>
                    <div className="content-wrapper">
                        <div className="content">
                            <Container>
                                <Row>
                                    <Col md="3">
                                        <BotList />
                                    </Col>
                                    <Col md="9">
                                        <BotSetting />
                                    </Col>
                                </Row>
                                <div className="bot">
                                </div>
                                <Info className="info">
                                </Info>
                            </Container>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
