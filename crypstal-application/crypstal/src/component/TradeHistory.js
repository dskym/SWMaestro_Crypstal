import React, {Component} from 'react';
import ContentTabElement from "./ContentTabElement";

class TradeHistory extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tradeHistoryList:[
                {
                    time:'2018-08-24 08:00',
                    buyAndSell:'BUY',
                    price:7420000,
                    amount:0.135,
                    asset:1004875
                },
                {
                    time:'2018-08-25 03:25',
                    buyAndSell:'SELL',
                    price:7480000,
                    amount:0.135,
                    asset:1013001
                }
            ]
        };
    }

    render() {
        const tradeHistoryElement = this.state.tradeHistoryList.map((tradeHistoryNode) =>
            <tr>
                <td>
                    <a href="javascript:void(0)">
                        <span className="text-black">{ tradeHistoryNode.time }</span>
                    </a>
                </td>
                <td>
                    <span className="label label-success">{ tradeHistoryNode.buyAndSell }</span>
                </td>
                <td>{ tradeHistoryNode.price }</td>
                <td>{ tradeHistoryNode.amount }</td>
                <td>{ tradeHistoryNode.asset }</td>
            </tr>
        );

        return (
            <div className="bot-history">
                <div className="box">
                    <div className="box-header without-border">
                        <h6 className="box-title">Trade History</h6>
                    </div>
                    <div className="box-body">
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <tbody>
                                <tr>
                                    <th>거래시간</th>
                                    <th>매수/매도</th>
                                    <th>가격</th>
                                    <th>수량</th>
                                    <th>평가금액</th>
                                </tr>

                                { tradeHistoryElement }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TradeHistory;

