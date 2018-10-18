import React, {Component} from 'react';

class BotSetting extends Component {
    render() {
        return (
            <div>
                <div className="tab-content bot-tab-content">
                    <div className="tab-pane active" id="bot1" role="tabpanel" aria-expanded="true">
                        <div className="bot">
                            <h4 className="text-bold text-center">승윤봇</h4>
                            <div className="box hide">
                                <div className="box-header with-border">
                                    <h6 className="box-title">투자 금액</h6>
                                </div>

                                <div className="box-body">
                                    <div className="asset">
                                        <label className="mb-0">1,000,000 KRW</label>
                                    </div>
                                </div>
                            </div>

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
                                        <h4 style={{margin:'0.5rem 0rem'}}>전략 제목 : <span
                                            className="strategy-description-title">제목 없음</span></h4>
                                        <p style={{marginBottom:'0px'}}>전략 설명 : <span
                                            className="strategy-description-content">설명 없음</span></p>
                                    </div>
                                </div>
                            </div>

                            <div className="box">
                                <div className="box-header with-border">
                                    <h6 className="box-title">추가 설정</h6>
                                    <ul className="box-controls pull-right">
                                        <li><a className="box-btn-slide" href="#"/></li>
                                    </ul>
                                </div>

                                <div className="box-body">
                                    <div className="order-quantity">
                                        <p>주문 수량</p>
                                        <p><span className="badge badge-success mr-10">매수</span><span
                                            className="order-quantity-buy">100% (All-in)</span></p>
                                        <p><span className="badge badge-danger mr-10">매도</span><span
                                            className="order-quantity-sell">100% (All-in)</span></p>
                                    </div>

                                    <div className="b-1 h-5 mt-10 mb-10"/>

                                    <div className="safety">
                                        <p>Safety</p>
                                        <div className="safety-content">* 선택한 Safety 옵션이 없습니다.</div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <input type="checkbox" id="bot-alarm" className="filled-in bot-alarm bot-data"/>
                                <label htmlFor="bot-alarm">챗봇 알림 받기</label>
                            </div>
                            <div>
                                <input type="checkbox" id="auto-trade" className="filled-in auto-trade bot-data"/>
                                <label htmlFor="auto-trade">자동 거래</label>
                            </div>
                            <div className="box-save">
                                <button className="btn btn-info save-bot-setting">현재 봇 설정 저장</button>
                            </div>
                            <div className="box-submit">
                                <button className="btn btn-info backtest">백테스팅</button>
                                <button className="btn btn-info bot-start">봇 시작</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default BotSetting;
