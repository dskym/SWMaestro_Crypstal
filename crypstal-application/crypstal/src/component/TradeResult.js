import React, { Component } from 'react';

class TradeResult extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            period,
            asset,
            crypto,
            exchange,
            trading
        } = this.props.result;

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
                                    <td colSpan="5">{ period.from } ~ { period.to }</td>
                                </tr>
                                <tr>
                                    <th rowSpan="2">거래 횟수</th>
                                    <td>WIN</td>
                                    <td><span className="text-green">{ trading.win }</span></td>
                                    <th rowSpan="2">승률</th>
                                    <td>최대 이익</td>
                                    <td><span className="text-green">{ trading.maxProfit }%</span></td>
                                </tr>
                                <tr>
                                    <td>LOSE</td>
                                    <td><span className="text-red">{ trading.lose }</span></td>
                                    <td>최대 손실</td>
                                    <td><span className="text-red">{ trading.maxLoss }%</span></td>
                                </tr>
                                <tr>
                                    <th rowSpan="6">
                                        <div>수익률</div>
                                        <div>{ trading.returnRate }%</div>
                                    </th>
                                    <td>초기투자금액</td>
                                    <td colSpan="4">{ asset.initial } KRW</td>
                                </tr>
                                <tr>
                                    <td>총 자산</td>
                                    <td colSpan="4"><span className="text-green">{ asset.final } KRW</span></td>
                                </tr>
                                <tr>
                                    <td>손익 자산</td>
                                    <td colSpan="4"><span className="text-green">{ asset.profit } KRW</span></td>
                                </tr>
                                <tr>
                                    <td>코인가격 변동률</td>
                                    <td colSpan="4"><span>{ trading.amountChangeRate }%</span></td>
                                </tr>
                                <tr>
                                    <td>거래소 수수료</td>
                                    <td colSpan="4"><span className="text-red">{ exchange.fee } KRW</span></td>
                                </tr>
                                <tr>
                                    <td>슬리피지 비율</td>
                                    <td colSpan="4">{ exchange.slippage }%</td>
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
