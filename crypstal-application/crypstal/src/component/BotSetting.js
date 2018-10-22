import React, {Component} from 'react';
import styled from "styled-components";
import { Button } from "reactstrap";
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
        <div className="box" onClick={assetToggle}>
            <div className="box-header with-border">
                <h6 className="box-title">투자 금액</h6>
            </div>

            <div className="box-body">
                <div className="asset">
                    <label className="mb-0">{botAsset} KRW</label>
                </div>
            </div>
            <AssetModal modal={assetModal} toggle={assetToggle} />
        </div>
    );
};

const BotStrategy = ({botStrategy}) => {
    return (
        <div className="box">
            <div className="box-header with-border">
                <h6 className="box-title">봇의 전략</h6>
                <ul className="box-controls pull-right">
                    <li><a className="box-btn-slide" href="#"/></li>
                </ul>
            </div>

            <div className="box-body">
                <div className="form-group">
                    <label>거래소</label>
                    <select id="bot-exchange" className="form-control exchange bot-data">
                        <option value="Bithumb">Bithumb</option>
                        <option value="Upbit">Upbit</option>
                        <option value="Coinone">Coinone</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>코인</label>
                    <select id="bot-coin" className="form-control coin bot-data">
                        <option value="BTC">BTC</option>
                        <option value="ETH">ETH</option>
                        <option value="XRP">XRP</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>주기</label>
                    <select id="bot-period" className="form-control period bot-data">
                        <option value="5m">5m</option>
                        <option value="15m">15m</option>
                        <option value="30m">30m</option>
                        <option value="1h">1h</option>
                        <option value="2h">2h</option>
                    </select>
                </div>

                <div className="b-1 h-30px"/>

                <div className="strategy-setting">
                    <h4 style={{margin: '0.5rem 0rem'}}>전략 제목 : <span
                        className="strategy-description-title">제목 없음</span></h4>
                    <p style={{marginBottom: '0px'}}>전략 설명 : <span
                        className="strategy-description-content">설명 없음</span></p>
                </div>
            </div>
        </div>
    );
}

const AdditionalSetting = (props) => {
    return (
        <div className="box">
            <div className="box-header with-border">
                <h6 className="box-title">추가 설정</h6>
                <ul className="box-controls pull-right">
                    <li><a className="box-btn-slide" href="#"/></li>
                </ul>
            </div>

            <div className="box-body">
                <OrderQuantity modal={props.orderQuantityModal} toggle={props.orderQuantityToggle}/>
                <div className="b-1 h-5 mt-10 mb-10"/>
                <Safety modal={props.safetyModal} toggle={props.safetyToggle}/>
            </div>
        </div>
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
            <BacktestSettingModal  modal={props.modal} toggle={props.toggle}/>
            <Button className="btn btn-info bot-start">봇 시작</Button>
        </div>
    );
};

class BotSetting extends Component {
    constructor(props) {
        super(props);

        this.state = {
            assetModal: false,
            orderQuantityModal: false,
            safetyModal: false,
            backtestModal: false
        };

        this.assetToggle = this.assetToggle.bind(this);
        this.orderQuantityToggle = this.orderQuantityToggle.bind(this);
        this.safetyToggle = this.safetyToggle.bind(this);
        this.backtestToggle = this.backtestToggle.bind(this);
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
        const botState = this.props.botState;

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
                <BotStrategy botStrategy={crypto, exchange, period}/>

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
