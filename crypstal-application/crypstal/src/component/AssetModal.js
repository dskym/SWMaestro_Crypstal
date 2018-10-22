import React, {Component} from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, ButtonGroup, Button } from 'reactstrap';

class AssetModal extends Component {
    render() {
        return (
            <Modal isOpen={this.props.modal} toggle={this.props.toggle} backdrop={true}>
                <ModalHeader>
                    <h4>투자 금액 변경</h4>
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for="asset">투자 금액을 입력해주세요.</Label>
                        <Input type="text" name="asset" placeholder="1000000" />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <ButtonGroup>
                        <Button onClick={this.props.toggle}>취소하기</Button>
                        <Button onClick={this.props.toggle}>변경하기</Button>
                    </ButtonGroup>
                </ModalFooter>
            </Modal>
        );
    }
}

export default AssetModal;
