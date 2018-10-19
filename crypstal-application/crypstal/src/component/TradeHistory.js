import React, {Component} from 'react';
import ContentTabElement from "./ContentTabElement";

class TradeHistory extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const history = this.props.history;

        const tradeHistoryElement = history.map((tradeHistoryNode) =>
            Object.keys(tradeHistoryNode).map((key) =>
                <tr>
                    <td>
                        <a href="javascript:void(0)">
                            <span className="text-black">{tradeHistoryNode[key].time}</span>
                        </a>
                    </td>
                    <td>
                        <span className="label label-success">{key}</span>
                    </td>
                    <td>{tradeHistoryNode[key].price}</td>
                    <td>{tradeHistoryNode[key].amount}</td>
                    <td>{tradeHistoryNode[key].asset}</td>
                </tr>
            )
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

                                {tradeHistoryElement}

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

