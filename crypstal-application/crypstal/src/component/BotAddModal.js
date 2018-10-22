import React, {Component} from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, ButtonGroup, Button } from 'reactstrap';

class BotAddModal extends Component {
    render() {
        return (
            <Modal isOpen={this.props.modal} toggle={this.props.toggle} backdrop={true}>
                <ModalHeader>
                    <h4>봇 추가</h4>
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for="botName">봇 이름을 입력해주세요.</Label>
                        <Input type="text" name="botName" placeholder="ex) Crypstal" />
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

export default BotAddModal;
