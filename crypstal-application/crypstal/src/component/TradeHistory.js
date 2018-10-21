import React, {Component} from 'react';
import styled from "styled-components";

import {Table, Badge } from "reactstrap";

const TradeHistoryComponent = styled.div`
    flex: 1;
`;

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
                        {tradeHistoryNode[key].time}
                    </td>
                    <td>
                        { key === "BUY" ?
                            <Badge color="success">{key}</Badge>
                            : <Badge color="danger">{key}</Badge>
                        }
                    </td>
                    <td>{tradeHistoryNode[key].price}</td>
                    <td>{tradeHistoryNode[key].amount}</td>
                    <td>{tradeHistoryNode[key].asset}</td>
                </tr>
            )
        );

        return (
            <TradeHistoryComponent>
                <div className="box">
                    <div className="box-header without-border">
                        <h6 className="box-title">Trade History</h6>
                    </div>
                    <div className="box-body">
                        <div className="table-responsive">
                            <Table bordered>
                                <thead>
                                    <tr>
                                        <th>거래시간</th>
                                        <th>매수/매도</th>
                                        <th>가격</th>
                                        <th>수량</th>
                                        <th>평가금액</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tradeHistoryElement}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            </TradeHistoryComponent>
        );
    }
}

export default TradeHistory;

