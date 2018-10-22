import React, {Component} from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, ButtonGroup, Button } from 'reactstrap';

class BotStrategySettingModal extends Component {
    render() {
        return (
            <Modal isOpen={this.props.modal} toggle={this.props.toggle} backdrop={true}>
                <ModalHeader>
                    <h4>전략 설정</h4>
                </ModalHeader>
                <ModalBody>
                    <ul className="nav nav-tabs customtab" role="tablist">
                        <li className="nav-item"><a className="nav-link active" data-toggle="tab" href="#buy"
                                                    role="tab">매수 전략</a>
                        </li>
                        <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#sell" role="tab">매도
                            전략</a></li>
                        <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#description"
                                                    role="tab">봇 설명</a>
                        </li>
                    </ul>
                    <div className="tab-content">
                        <div className="tab-pane pad active" id="buy" role="tabpanel">
                            <div className="form-group">
                                <label>매수전략 가중치</label>
                                <input className="w-50 text-center" type="number" placeholder="1"
                                       id="buyStrategyThreshold"/>
                            </div>

                            <div className="strategy">

                            </div>
                        </div>

                        <div className="tab-pane pad" id="sell" role="tabpanel">
                            <div className="form-group">
                                <label>매도전략 가중치</label>
                                <input className="w-50 text-center" type="number" placeholder="1"
                                       id="sellStrategyThreshold"/>
                            </div>

                            <div className="strategy">

                            </div>
                        </div>

                        <div className="tab-pane pad" id="description" role="tabpanel">
                            <div className="form-group">
                                <label>전략 제목</label>
                                <input type="text" className="form-control" name="strategy-description-title"
                                       placeholder="최대 30자"/>
                            </div>
                            <div className="form-group">
                                <label>전략 설명</label>
                                <textarea className="form-control" rows="3" name="strategy-description-content"
                                          placeholder="최대 100자"></textarea>
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <ButtonGroup>
                        <Button onClick={this.props.toggle}>취소</Button>
                        <Button onClick={this.props.toggle}>저장</Button>
                    </ButtonGroup>
                </ModalFooter>
            </Modal>
        );
    }
}

export default BotStrategySettingModal;
