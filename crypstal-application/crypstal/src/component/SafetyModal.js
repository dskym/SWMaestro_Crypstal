import React, {Component} from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    FormGroup,
    Label,
    Input,
    ButtonGroup,
    Button
} from 'reactstrap';

class SafetyModal extends Component {
    render() {
        return (
            <Modal isOpen={this.props.modal} toggle={this.props.toggle} backdrop={true}>
                <ModalHeader>
                    <h4>Safety</h4>
                </ModalHeader>
                <ModalBody>
                    <span className="text-blue">* Trailing-Stop은 백테스트에 반영되지 않습니다.</span>
                    <Card>
                        <CardHeader>
                            <input type="checkbox" id="checkbox-profit-target" className="filled-in" checked/>
                            <label htmlFor="checkbox-profit-target">Profit-Target <span className="text-blue">(+<span
                                className="profit-target-value">2</span>%)</span></label>
                            <p>봇 시작 후 직전 매수 금액의 <span className="text-blue">+<span
                                className="profit-target-value">1</span>% 이상</span>일
                                경우 매도</p>
                        </CardHeader>
                        <CardBody>
                            <p>봇 시작 후 직전 매수 금액의 <input className="w-50 text-center" type="number"
                                                       id="input-profit-target" placeholder="10"/> %</p>
                            <p>이상 일 경우 매도 (Profit-Target)</p>
                        </CardBody>
                    </Card>

                    <Card>
                        <CardHeader>
                            <input type="checkbox" id="checkbox-stop-loss" className="filled-in" checked/>
                            <label htmlFor="checkbox-stop-loss">Stop-Loss <span className="text-blue">(-<span
                                className="stop-loss-value"></span>%)</span></label>
                            <p>봇 시작 후 직전 매수 금액의 <span className="text-blue">-<span
                                className="stop-loss-value"></span>% 이하</span>일 경우 매도</p>
                        </CardHeader>
                        <CardBody>
                            <p>봇 시작 후 직전 매수 금액의 <input className="w-50 text-center" type="number"
                                                       id="input-stop-loss"
                                                       placeholder="5"/> %</p>
                            <p>이상 일 경우 매도 (Stop-Loss)</p>
                        </CardBody>
                    </Card>

                    <Card>
                        <CardHeader>
                            <input type="checkbox" id="checkbox-trailing-stop" className="filled-in" checked/>
                            <label htmlFor="checkbox-trailing-stop">Trailing-Stop <span className="text-blue">(+<span
                                className="trailing-stop-high-value"></span>% / -<span
                                className="trailing-stop-low-value"></span>%)</span></label>
                            <p>봇 시작 후 직전 매수 금액의 <span className="text-blue"><span
                                className="trailing-stop-high-value"></span>%</span>돌파 후</p>
                            <p>최고가 대비 <span className="text-blue"><span
                                className="trailing-stop-low-value"></span>%</span>
                                하락 시 매도</p>
                        </CardHeader>
                        <CardBody>
                            <p>봇 시작 후 직전 매수 금액의 <input className="w-50 text-center" type="number"
                                                       id="input-trailing-stop-high" placeholder="5"/> % 이상</p>
                            <p>돌파 후 최고가 대비 <input className="w-50 text-center" type="number"
                                                  id="input-trailing-stop-low" placeholder="2"/> % 하락 시 매도</p>
                            <p>(Trailing-Stop)</p>
                        </CardBody>
                    </Card>


                    <Card>
                        <CardHeader>
                            <input type="checkbox" id="checkbox-position-change" className="filled-in" checked/>
                            <label htmlFor="checkbox-position-change">Safety 발동 후 강제 포지션 변경</label>
                        </CardHeader>
                        <CardBody>
                            <p>Safety로 매도될 경우, 즉시 매도 포지션 진입.</p>
                            <p>(미선택시 매도전략 충족 시점에 매도 포지션 진입. 매도전략 충족 시점에는 거래 없이 단순 포지션 변경만 일어남.)</p>
                        </CardBody>
                    </Card>

                    <Card>
                        <CardHeader>
                            <input type="checkbox" id="checkbox-sell-exit" className="filled-in" checked/>
                            <label htmlFor="checkbox-sell-exit">봇 종료 : <span
                                className="text-blue">매도 조건 충족 시 거래 후 봇 종료</span></label>
                        </CardHeader>
                        <CardBody>
                            <p>* 이 옵션을 선택하면, 매도가 발생한 후 봇이 종료됩니다.</p>
                            <p>(미선택시 다음 매수 조건을 모니터링 합니다.)</p>
                        </CardBody>
                    </Card>

                    <Card>
                        <CardHeader>
                            <input type="checkbox" id="checkbox-safety-exit" className="filled-in" checked/>
                            <label htmlFor="checkbox-safety-exit">봇 종료 : <span
                                className="text-blue">Safety 발동 후 봇 종료</span></label>
                        </CardHeader>
                        <CardBody>
                            <p>* 이 옵션을 선택하면 Safety로 인한 매도 발생 후, 봇이 종료됩니다.</p>
                            <p>(미선택시 다음 매수 조건을 모니터링 합니다.)</p>
                        </CardBody>
                    </Card>
                </ModalBody>
                <ModalFooter>
                    <ButtonGroup>
                        <Button onClick={this.props.toggle}>취소하기</Button>
                        <Button onClick={this.props.toggle}>설정하기</Button>
                    </ButtonGroup>
                </ModalFooter>
            </Modal>
        );
    }
}

export default SafetyModal;
