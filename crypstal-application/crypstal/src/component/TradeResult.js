import React, { Component } from 'react';

class TradeResult extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tradeResult:{
                period:{
                    from:'2018-09-19',
                    to:'2018-10-19'
                },
                asset:{
                    initial:1000000,
                    final:1029794,
                    profit:29794
                },
                exchange:{
                    fee:0.001,
                    slippage:0.004
                },
                trading:{
                    count:5,
                    win:4,
                    lose:1,
                    maxProfit:0.011,
                    maxLoss:-0.046,
                    winningRate:0.8,
                    returnRate:0.1,
                    amountChangeRate:0.1
                }
            }
        };
    }

    render() {
        return (
            <div className="bot-result">
                <div className="box">
                    <div className="box-header without-border">
                        <h6 className="box-title">Trade Result</h6>
                    </div>
                    <div className="box-body">
                        <div className="table-responsive">
                            <table className="table">
                                <tbody>
                                <tr>
                                    <th>테스트 기간</th>
                                    <td colSpan="5">{ this.state.tradeResult.period.from } ~ { this.state.tradeResult.period.to }</td>
                                </tr>
                                <tr>
                                    <th rowSpan="2">거래 횟수</th>
                                    <td>WIN</td>
                                    <td><span className="text-green">{ this.state.tradeResult.trading.win }</span></td>
                                    <th rowSpan="2">승률</th>
                                    <td>최대 이익</td>
                                    <td><span className="text-green">{ this.state.tradeResult.trading.maxProfit }%</span></td>
                                </tr>
                                <tr>
                                    <td>LOSE</td>
                                    <td><span className="text-red">{ this.state.tradeResult.trading.lose }</span></td>
                                    <td>최대 손실</td>
                                    <td><span className="text-red">{ this.state.tradeResult.trading.maxLoss }%</span></td>
                                </tr>
                                <tr>
                                    <th rowSpan="6">
                                        <div>수익률</div>
                                        <div>{ this.state.tradeResult.trading.returnRate }%</div>
                                    </th>
                                    <td>초기투자금액</td>
                                    <td colSpan="4">{ this.state.tradeResult.asset.initial } KRW</td>
                                </tr>
                                <tr>
                                    <td>총 자산</td>
                                    <td colSpan="4"><span className="text-green">{ this.state.tradeResult.asset.final } KRW</span></td>
                                </tr>
                                <tr>
                                    <td>손익 자산</td>
                                    <td colSpan="4"><span className="text-green">{ this.state.tradeResult.asset.profit } KRW</span></td>
                                </tr>
                                <tr>
                                    <td>코인가격 변동률</td>
                                    <td colSpan="4"><span>{ this.state.tradeResult.trading.amountChangeRate }%</span></td>
                                </tr>
                                <tr>
                                    <td>거래소 수수료</td>
                                    <td colSpan="4"><span className="text-red">{ this.state.tradeResult.exchange.fee } KRW</span></td>
                                </tr>
                                <tr>
                                    <td>슬리피지 비율</td>
                                    <td colSpan="4">{ this.state.tradeResult.exchange.slippage }%</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TradeResult;
