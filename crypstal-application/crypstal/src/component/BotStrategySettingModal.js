import React, {Component} from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ButtonGroup,
    Button,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
    FormGroup,
    Input,
    Label,
} from 'reactstrap';
import classnames from "classnames";

const BotStrategyIndicatorSelector = () => {
    return (
        <FormGroup>
            <Input type="select" name="indicatorSelector" id="indicatorSelector">
                <option disabled selected>지표를 선택해주세요.</option>
                <option value="MACD">MACD</option>
                <option value="MA Double">MA Double</option>
                <option value="Bollinger Bands">Bollinger Bands</option>
                <option value="Parabolic Sar">Parabolic Sar</option>
            </Input>
        </FormGroup>
    );
};

const BotStrategySettingTab = ({activeTab, toggle}) => {
    return (
        <Nav tabs>
            <NavItem>
                <NavLink
                    className={classnames({active: activeTab === '1'})}
                    onClick={() => {
                        toggle('1');
                    }}
                >
                    매수 전략
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink
                    className={classnames({active: activeTab === '2'})}
                    onClick={() => {
                        toggle('2');
                    }}
                >
                    매도 전략
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink
                    className={classnames({active: activeTab === '3'})}
                    onClick={() => {
                        toggle('3');
                    }}
                >
                    봇 설명
                </NavLink>
            </NavItem>
        </Nav>
    );
};

const BotStrategySettingContent = ({activeTab}) => {
    return (
        <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
                <FormGroup>
                    <Label for="buyStrategyThreshold">매수전략 가중치</Label>
                    <Input type="number" name="buyStrategyThreshold" id="buyStrategyThreshold" placeholder="1"/>
                </FormGroup>

                <BotStrategyIndicatorSelector/>
            </TabPane>
            <TabPane tabId="2">
                <div className="form-group">
                    <FormGroup>
                        <Label for="sellStrategyThreshold">매도전략 가중치</Label>
                        <Input type="number" name="buyStrategyThreshold" id="sellStrategyThreshold" placeholder="1"/>
                    </FormGroup>
                </div>

                <BotStrategyIndicatorSelector/>
            </TabPane>
            <TabPane tabId="3">
                <FormGroup>
                    <Label for="strategyDescriptionTitle">전략 제목</Label>
                    <Input type="text" name="strategyDescriptionTitle" id="strategyDescriptionTitle"
                           placeholder="최대 30자"/>
                </FormGroup>
                <FormGroup>
                    <Label for="strategyDescriptionContent">전략 설명</Label>
                    <Input type="textarea" name="strategyDescriptionContent" id="strategyDescriptionContent"
                           placeholder="최대 100자"/>
                </FormGroup>
            </TabPane>
        </TabContent>
    );
};

class BotStrategySettingModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: '1'
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle(tab) {
        if (this.state.buyActiveTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render() {
        return (
            <Modal isOpen={this.props.modal} toggle={this.props.toggle} backdrop={true}>
                <ModalHeader>
                    <h4>전략 설정</h4>
                </ModalHeader>
                <ModalBody>
                    <BotStrategySettingTab activeTab={this.state.activeTab} toggle={this.toggle}/>
                    <BotStrategySettingContent activeTab={this.state.activeTab}/>
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
