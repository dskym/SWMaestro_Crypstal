import React, {Component} from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, ButtonGroup, Button} from 'reactstrap';

class OrderQuantityModal extends Component {
    render() {
        return (
            <Modal isOpen={this.props.modal} toggle={this.props.toggle} backdrop={true}>
                <ModalHeader>
                    <h4>주문 수량</h4>
                </ModalHeader>
                <ModalBody>
                    <div className="buy">
                        <h4 className="text-green">매수</h4>
                        <ul className="nav nav-tabs customtab" role="tablist">
                            <li className="nav-item"><a className="nav-link active" data-toggle="tab" href="#buy-allin"
                                                        role="tab">ALL-IN</a>
                            </li>
                            <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#buy-krw"
                                                        role="tab">KRW</a>
                            </li>
                            <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#buy-coin"
                                                        role="tab"><span
                                className="order-quantity-coin">1</span></a></li>
                        </ul>
                        <div className="tab-content">
                            <div className="tab-pane active" id="buy-allin" role="tabpanel">거래시점의 잔고 100% 매수(all-in
                                매수)
                            </div>
                            <div className="tab-pane pad" id="buy-krw" role="tabpanel">
                                <label>지정한 자산만큼 매수</label>
                                <div className="form-element">
                                    <input className="form-control" type="text" name="buy-krw"/>
                                </div>
                            </div>
                            <div className="tab-pane pad" id="buy-coin" role="tabpanel">
                                <label>지정한 코인 수량만큼 매수</label>
                                <div className="form-element">
                                    <input className="form-control" type="text" name="buy-coin"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="sell">
                        <h4 className="text-red">매도</h4>
                        <ul className="nav nav-tabs customtab" role="tablist">
                            <li className="nav-item"><a className="nav-link active" data-toggle="tab" href="#sell-allin"
                                                        role="tab">ALL-IN</a>
                            </li>
                            <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#sell-krw"
                                                        role="tab">KRW</a>
                            </li>
                            <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#sell-coin"
                                                        role="tab"><span
                                className="order-quantity-coin">1</span></a></li>
                        </ul>
                        <div className="tab-content">
                            <div className="tab-pane active" id="sell-allin" role="tabpanel">거래시점의 잔고 100% 매도(all-in
                                매도)
                            </div>
                            <div className="tab-pane pad" id="sell-krw" role="tabpanel">
                                <label>지정한 자산만큼 매도</label>
                                <div className="form-element">
                                    <input className="form-control" type="text" name="sell-krw"/>
                                </div>
                            </div>
                            <div className="tab-pane pad" id="sell-coin" role="tabpanel">
                                <label>지정한 코인 수량만큼 매도</label>
                                <div className="form-element">
                                    <input className="form-control" type="text" name="sell-coin"/>
                                </div>
                            </div>
                        </div>
                    </div>
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

    export default OrderQuantityModal;
