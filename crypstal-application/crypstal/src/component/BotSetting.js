import React, {Component} from 'react';
import styled from "styled-components";
import {Button, Card, CardHeader, CardBody, CardText, FormGroup, Label, Input} from "reactstrap";
import BotStrategySettingModal from './BotStrategySettingModal';
import AssetModal from './AssetModal';
import BacktestSettingModal from './BacktestSettingModal';
import SafetyModal from "./SafetyModal";
import OrderQuantityModal from "./OrderQuantityModal";


const BotSettingComponent = styled.div`    
    flex: 2;
    
    display: flex;
    flex-direction: column;
`;

const BotName = ({botName}) => {
    return (
        <h4 className="text-bold text-center">{botName}</h4>
    );
};

const InvestmentAmount = ({botAsset, assetModal, assetToggle}) => {
    return (
        <Card onClick={assetToggle}>
            <CardHeader>투자 금액</CardHeader>
            <CardBody>
                <CardText>{botAsset} KRW</CardText>
                <AssetModal modal={assetModal} toggle={assetToggle}/>
            </CardBody>
        </Card>
    );
};

const BotStrategy = ({botStrategy, botStrategyModal, botStrategyModalToggle}) => {
    return (
        <Card>
            <CardHeader>봇의 전략</CardHeader>
            <CardBody>
                <FormGroup>
                    <Label for="exchange">거래소</Label>
                    <Input type="select" name="exchange" id="exchange">
                        <option value="Bithumb">Bithumb</option>
                        <option value="Upbit">Upbit</option>
                        <option value="Coinone">Coinone</option>
                    </Input>
                </FormGroup>

                <FormGroup>
                    <Label for="coin">코인</Label>
                    <Input type="select" name="coin" id="coin">
                        <option value="BTC">BTC</option>
                        <option value="ETH">ETH</option>
                        <option value="XRP">XRP</option>
                    </Input>
                </FormGroup>

                <FormGroup>
                    <Label for="period">주기</Label>
                    <Input type="select" name="period" id="period">
                        <option value="5m">5m</option>
                        <option value="15m">15m</option>
                        <option value="30m">30m</option>
                        <option value="1h">1h</option>
                        <option value="2h">2h</option>
                    </Input>
                </FormGroup>

                <hr className="b-1 h-30px"/>

                <div className="strategy-setting" onClick={botStrategyModalToggle}>
                    <h4 style={{margin: '0.5rem 0rem'}}>전략 제목 : <span
                        className="strategy-description-title">제목 없음</span></h4>
                    <p style={{marginBottom: '0px'}}>전략 설명 : <span
                        className="strategy-description-content">설명 없음</span></p>
                </div>

                <BotStrategySettingModal modal={botStrategyModal} toggle={botStrategyModalToggle}/>
            </CardBody>
        </Card>
    );
}

const AdditionalSetting = (props) => {
    return (
        <Card>
            <CardHeader>추가 설정</CardHeader>
            <CardBody>
                <OrderQuantity modal={props.orderQuantityModal} toggle={props.orderQuantityToggle}/>
                <hr className="b-1 h-5 mt-10 mb-10"/>
                <Safety modal={props.safetyModal} toggle={props.safetyToggle}/>
            </CardBody>
        </Card>
    );
};

const Safety = (props) => {
    return (
        <div className="safety" onClick={props.toggle}>
            <p>Safety</p>
            <div className="safety-content">* 선택한 Safety 옵션이 없습니다.</div>
            <SafetyModal modal={props.modal} toggle={props.toggle}/>
        </div>
    );
};

const OrderQuantity = (props) => {
    return (
        <div className="order-quantity" onClick={props.toggle}>
            <p>주문 수량</p>
            <p><span className="badge badge-success mr-10">매수</span><span
                className="order-quantity-buy">100% (All-in)</span></p>
            <p><span className="badge badge-danger mr-10">매도</span><span
                className="order-quantity-sell">100% (All-in)</span></p>
            <OrderQuantityModal modal={props.modal} toggle={props.toggle}/>
        </div>
    );
};

const BotAlarm = ({botAlarm}) => {
    return (
        <div>
            <input type="checkbox" id="bot-alarm" className="filled-in bot-alarm bot-data" checked={botAlarm}/>
            <label htmlFor="bot-alarm">챗봇 알림 받기</label>
        </div>
    );
};

const BotAutoTrade = ({botAutoTrading}) => {
    return (
        <div>
            <input type="checkbox" id="auto-trade" className="filled-in auto-trade bot-data" checked={botAutoTrading}/>
            <label htmlFor="auto-trade">자동 거래</label>
        </div>
    );
};

const BotSave = () => {
    return (
        <div className="box-save">
            <button className="btn btn-info save-bot-setting">현재 봇 설정 저장</button>
        </div>
    );
};

const BotSubmit = (props) => {
    return (
        <div className="box-submit">
            <Button onClick={props.toggle}>백테스팅</Button>
            <BacktestSettingModal modal={props.modal} toggle={props.toggle}/>
            <Button className="btn btn-info bot-start">봇 시작</Button>
        </div>
    );
};

class BotSetting extends Component {
    constructor(props) {
        super(props);

        this.state = {
            botStrategytModal: false,
            assetModal: false,
            orderQuantityModal: false,
            safetyModal: false,
            backtestModal: false
        };

        this.botStrategyToggle = this.botStrategyToggle.bind(this);
        this.assetToggle = this.assetToggle.bind(this);
        this.orderQuantityToggle = this.orderQuantityToggle.bind(this);
        this.safetyToggle = this.safetyToggle.bind(this);
        this.backtestToggle = this.backtestToggle.bind(this);
    }

    botStrategyToggle() {
        this.setState({
            ...this.state,
            botStrategytModal: !this.state.botStrategytModal
        });
    }

    assetToggle() {
        this.setState({
            ...this.state,
            assetModal: !this.state.assetModal
        });
    }

    orderQuantityToggle() {
        this.setState({
            ...this.state,
            orderQuantityModal: !this.state.orderQuantityModal
        });
    }

    safetyToggle() {
        this.setState({
            ...this.state,
            safetyModal: !this.state.safetyModal
        });
    }

    backtestToggle() {
        this.setState({
            ...this.state,
            backtestModal: !this.state.backtestModal
        });
    }

    render() {
        const {
            name,
            crypto,
            exchange,
            period,
            asset,
            alarm,
            autoTrading
        } = this.props.botState;

        return (
            <BotSettingComponent>
                <BotName botName={name}/>
                <InvestmentAmount
                    botAsset={asset}
                    assetModal={this.state.assetModal}
                    assetToggle={this.assetToggle}
                />
                <BotStrategy
                    botStrategy={{crypto, exchange, period}}
                    botStrategyModal={this.state.botStrategytModal}
                    botStrategyModalToggle={this.botStrategyToggle}
                />

                <AdditionalSetting
                    orderQuantityModal={this.state.orderQuantityModal}
                    orderQuantityToggle={this.orderQuantityToggle}
                    safetyModal={this.state.safetyModal}
                    safetyToggle={this.safetyToggle}
                />

                <BotAlarm botAlarm={alarm}/>
                <BotAutoTrade botAutoTrade={autoTrading}/>

                <BotSave/>
                <BotSubmit modal={this.state.backtestModal} toggle={this.backtestToggle}/>
            </BotSettingComponent>
        );
    }
}

export default BotSetting;
