import React, { Component } from 'react';

class Info extends Component {
    render() {
        return (
            <div>
                <div className="box box-default mb-0">
                    <div className="box-body p-5">
                        <ul className="nav nav-tabs content-tab" role="tablist">
                            <li className="nav-item"><a className="nav-link active" data-toggle="tab" href="#chart"
                                                        role="tab"><img src="../images/chart.png"/>Chart</a></li>
                            <li className="nav-item info hide"><a className="nav-link" data-toggle="tab"
                                                                  href="#info" role="tab"><img
                                src="../images/information.png"/>Info</a></li>
                            <li className="nav-item hide"><a className="nav-link" data-toggle="tab" href="#store"
                                                             role="tab"><img src="../images/shop.png"/>Store</a>
                            </li>
                        </ul>
                        <div className="tab-content tabcontent-border content-detail">
                            <div className="tab-pane active" id="chart" role="tabpanel">
                                <div className="coin-chart">
                                    <div className="pad">
                                        <div className="box">
                                            <div className="box-body">
                                                <div className="chart">
                                                    <div id="liveChart" style="height: 720px;"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane" id="info" role="tabpanel">
                                <div className="bot-info">
                                    <div className="pad">
                                        <div className="row">
                                            <div className="col-lg-6 col-12">
                                                <div className="bot-result">
                                                </div>
                                            </div>

                                            <div className="col-lg-6 col-12">
                                                <div className="bot-history">
                                                </div>
                                            </div>

                                            <div className="col-lg-12 col-12">
                                                <div className="bot-chart hide">
                                                    <div className="box">
                                                        <div className="box-header with-border">
                                                            <h6 className="box-title">Trade Chart</h6>
                                                        </div>
                                                        <div className="box-body">
                                                            <div className="chart">
                                                                <div id="tradeChart" style="height: 500px;"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane" id="store" role="tabpanel">
                                <div className="bot-store">
                                    <div className="pad">
                                        <div className="col-12">
                                            <div className="box-deck">
                                                <div className="box">
                                                    <div className="box-header with-border">
                                                        <h4 className="box-title">Bot Strategy 1</h4>
                                                        <p className="box-subtitle">Bot writer / Reader : 0</p>
                                                    </div>
                                                    <div className="box-body">
                                                        <p>2018-06-29 ~ 2018-07-29</p>
                                                        <h4>Box Body</h4>
                                                        <p>#BTC #Bithumb #15m</p>
                                                        <div>
                                                            <button className="btn btn-info">전략 보기</button>
                                                            <button className="btn btn-info">전략 구입</button>
                                                        </div>
                                                    </div>
                                                    <div className="box-footer">
                                                        <p>거래 횟수 : </p>
                                                        <p>슬리피지 비율 : </p>
                                                        <p>거래소 수수료 : </p>
                                                        <p>코인가격 변동률 : </p>
                                                        <p>승률 : </p>
                                                        <p>승/패 횟수 : </p>
                                                        <p>최대 이익 : </p>
                                                        <p>최대 손실 : </p>
                                                    </div>
                                                </div>

                                                <div className="box">
                                                    <div className="box-header with-border">
                                                        <h4 className="box-title">Bot Strategy 2</h4>
                                                    </div>
                                                    <div className="box-body">
                                                        <div className="media align-items-center p-0">
                                                            <div className="text-center">
                                                                <a href="#"><i className="cc BTC mr-5"
                                                                               title="BTC"></i></a>
                                                            </div>
                                                            <div>
                                                                <h3 className="no-margin text-bold">Bitcoin BTC</h3>
                                                            </div>
                                                        </div>
                                                        <div className="flexbox align-items-center mt-5">
                                                            <div>
                                                                <p className="no-margin font-weight-600"><span
                                                                    className="text-yellow">0.00000434 </span>BTC<span
                                                                    className="text-info">$0.04</span></p>
                                                            </div>
                                                            <div className="text-right">
                                                                <p className="no-margin font-weight-600"><span
                                                                    className="text-success">+1.35%</span></p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="box-footer no-border">
                                                        <button className="btn btn-info">전략 보기</button>
                                                        <button className="btn btn-info">전략 구입</button>
                                                    </div>
                                                </div>

                                                <div className="box">
                                                    <div className="blog-container">

                                                        <div className="blog-header">
                                                            <div className="blog-author--no-cover">
                                                                <h3>Bot Strategy 3</h3>
                                                            </div>
                                                        </div>

                                                        <div className="blog-body">
                                                            <div className="blog-title">
                                                                <h4>2018-06-01 ~ 2018-08-01</h4>
                                                                <h4>수익률 +100%</h4>
                                                            </div>
                                                            <div className="blog-summary">
                                                                <p>Bot writer / Bot reader : 0</p>
                                                            </div>
                                                            <div className="blog-tags">
                                                                <ul>
                                                                    <li>Bithumb</li>
                                                                    <li>BTC</li>
                                                                    <li>15m</li>
                                                                </ul>
                                                            </div>
                                                        </div>

                                                        <div className="blog-footer">
                                                            <ul>
                                                                <button className="btn btn-info">전략 보기</button>
                                                                <button className="btn btn-info">전략 구입</button>
                                                            </ul>
                                                        </div>

                                                    </div>
                                                </div>

                                            </div>
                                            <div className="box-deck">
                                                <div className="box">
                                                    <div className="box-header with-border">
                                                        <h4 className="box-title">Box Name 2</h4>
                                                    </div>
                                                    <div className="box-body">
                                                        <h4>Box Body</h4>
                                                    </div>
                                                    <div className="box-footer">
                                                        <button className="btn btn-info">Details</button>
                                                        <button className="btn btn-info">Buy</button>
                                                    </div>
                                                </div>

                                                <div className="box">
                                                    <div className="box-header with-border">
                                                        <h4 className="box-title">Box Name 1</h4>
                                                    </div>
                                                    <div className="box-body">
                                                        <h4>Box Body</h4>
                                                    </div>
                                                    <div className="box-footer">
                                                        <button className="btn btn-info">Details</button>
                                                        <button className="btn btn-info">Buy</button>
                                                    </div>
                                                </div>

                                                <div className="box">
                                                    <div className="box-header with-border">
                                                        <h4 className="box-title">Box Name 2</h4>
                                                    </div>
                                                    <div className="box-body">
                                                        <h4>Box Body</h4>
                                                    </div>
                                                    <div className="box-footer">
                                                        <button className="btn btn-info">Details</button>
                                                        <button className="btn btn-info">Buy</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Info;
