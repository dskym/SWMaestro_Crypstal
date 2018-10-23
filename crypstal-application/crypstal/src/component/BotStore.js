import React, {Component} from 'react';
import styled from "styled-components";
import {Card, CardHeader, CardBody, CardFooter, Button} from "reactstrap";

const BotStoreComponent = styled.div`    
    display: flex;
    flex-direction: row;    
`;

class BotStore extends Component {
    render() {
        return (
            <BotStoreComponent>
                <Card>
                    <CardHeader>
                        <h4 className="box-title">Bot Strategy 1</h4>
                        <p className="box-subtitle">Bot writer / Reader : 0</p>
                    </CardHeader>
                    <CardBody>
                        <p>2018-06-29 ~ 2018-07-29</p>
                        <h4>Box Body</h4>
                        <p>#BTC #Bithumb #15m</p>
                        <div>
                            <Button className="btn btn-info">전략 보기</Button>
                            <Button className="btn btn-info">전략 구입</Button>
                        </div>
                    </CardBody>
                    <CardFooter>
                        <p>거래 횟수 : </p>
                        <p>슬리피지 비율 : </p>
                        <p>거래소 수수료 : </p>
                        <p>코인가격 변동률 : </p>
                        <p>승률 : </p>
                        <p>승/패 횟수 : </p>
                        <p>최대 이익 : </p>
                        <p>최대 손실 : </p>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader>
                        <h4 className="box-title">Bot Strategy 2</h4>
                    </CardHeader>
                    <CardBody>
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
                    </CardBody>
                    <CardFooter>
                        <button className="btn btn-info">전략 보기</button>
                        <button className="btn btn-info">전략 구입</button>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader>
                        <h4 className="box-title">Bot Strategy 3</h4>
                    </CardHeader>
                    <CardBody>
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
                    </CardBody>
                    <CardFooter>
                        <button className="btn btn-info">전략 보기</button>
                        <button className="btn btn-info">전략 구입</button>
                    </CardFooter>
                </Card>
            </BotStoreComponent>
        );
    }
}

export default BotStore;