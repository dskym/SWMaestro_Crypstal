import React, {Component} from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, ButtonGroup, Button } from 'reactstrap';

class BacktestSettingModal extends Component {
    render() {
        return (
            <Modal isOpen={this.props.modal} toggle={this.props.toggle} backdrop={true}>
                <ModalHeader>
                    <h4>백테스팅</h4>
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for="amount">테스트 금액 (KRW)</Label>
                        <Input type="text" name="amount" placeholder="1000000" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="fee">거래소 수수료(%)</Label>
                        <Input type="text" name="fee" placeholder="0.1" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="slippage">슬리피지 비율(%)</Label>
                        <Input type="text" name="slippage" placeholder="0.4" />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <ButtonGroup>
                        <Button onClick={this.props.toggle}>취소하기</Button>
                        <Button onClick={this.props.toggle}>생성하기</Button>
                    </ButtonGroup>
                </ModalFooter>
            </Modal>
        );
    }
}

export default BacktestSettingModal;
