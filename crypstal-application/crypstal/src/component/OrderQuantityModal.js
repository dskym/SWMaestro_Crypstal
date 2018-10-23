import React, {Component} from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    FormGroup,
    Label,
    Input,
    ButtonGroup,
    Button,
    Nav,
    NavItem,
    NavLink,
    TabPane,
    TabContent,
    Card,
    CardHeader,
    CardBody,
    CardText
} from 'reactstrap';

import AssetModal from "./AssetModal";
import classnames from 'classnames';

const BuyOrderQuantityTab = ({activeTab, toggle}) => {
    return (
        <Nav tabs>
            <NavItem>
                <NavLink
                    className={classnames({active: activeTab === '1'})}
                    onClick={() => {
                        toggle('1');
                    }}
                >
                    ALL-IN
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink
                    className={classnames({active: activeTab === '2'})}
                    onClick={() => {
                        toggle('2');
                    }}
                >
                    KRW
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink
                    className={classnames({active: activeTab === '3'})}
                    onClick={() => {
                        toggle('3');
                    }}
                >
                    BTC
                </NavLink>
            </NavItem>
        </Nav>
    );
};

const BuyOrderQuantityTabContent = ({activeTab}) => {
    return (
        <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
                거래시점의 잔고 100% 매수(all-in 매수)
            </TabPane>
            <TabPane tabId="2">
                <FormGroup>
                    <Label for="buyKRW">지정한 자산만큼 매수</Label>
                    <Input type="text" name="buyKRW" id="buyKRW"/>
                </FormGroup>
            </TabPane>
            <TabPane tabId="3">
                <FormGroup>
                    <Label for="buyCoin">지정한 코인 수량만큼 매수</Label>
                    <Input type="text" name="buyCoin" id="buyCoin"/>
                </FormGroup>
            </TabPane>
        </TabContent>
    );
};

const SellOrderQuantityTab = ({activeTab, toggle}) => {
    return (
        <Nav tabs>
            <NavItem>
                <NavLink
                    className={classnames({active: activeTab === '1'})}
                    onClick={() => {
                        toggle('1');
                    }}
                >
                    ALL-IN
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink
                    className={classnames({active: activeTab === '2'})}
                    onClick={() => {
                        toggle('2');
                    }}
                >
                    KRW
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink
                    className={classnames({active: activeTab === '3'})}
                    onClick={() => {
                        toggle('3');
                    }}
                >
                    BTC
                </NavLink>
            </NavItem>
        </Nav>
    );
};

const SellOrderQuantityTabContent = ({activeTab}) => {
    return (
        <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
                거래시점의 잔고 100% 매도(all-in 매도)
            </TabPane>
            <TabPane tabId="2">
                <FormGroup>
                    <Label for="sellKRW">지정한 자산만큼 매도</Label>
                    <Input type="text" name="sellKRW" id="sellKRW"/>
                </FormGroup>
            </TabPane>
            <TabPane tabId="3">
                <FormGroup>
                    <Label for="sellCoin">지정한 코인 수량만큼 매도</Label>
                    <Input type="text" name="sellCoin" id="sellCoin"/>
                </FormGroup>
            </TabPane>
        </TabContent>
    );
};

class OrderQuantityModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            buyActiveTab: '1',
            sellActiveTab: '1'
        };

        this.buyToggle = this.buyToggle.bind(this);
        this.sellToggle = this.sellToggle.bind(this);
    }

    buyToggle(tab) {
        if (this.state.buyActiveTab !== tab) {
            this.setState({
                ...this.state,
                buyActiveTab: tab
            });
        }
    }

    sellToggle(tab) {
        if (this.state.sellActiveTab !== tab) {
            this.setState({
                ...this.state,
                sellActiveTab: tab
            });
        }
    }

    render() {
        return (
            <Modal isOpen={this.props.modal} toggle={this.props.toggle} backdrop={true}>
                <ModalHeader>
                    <h4>주문 수량</h4>
                </ModalHeader>
                <ModalBody>
                    <BuyOrderQuantityTab activeTab={this.state.buyActiveTab} toggle={this.buyToggle}/>
                    <BuyOrderQuantityTabContent activeTab={this.state.buyActiveTab}/>
                    <SellOrderQuantityTab activeTab={this.state.sellActiveTab} toggle={this.sellToggle}/>
                    <SellOrderQuantityTabContent activeTab={this.state.sellActiveTab}/>
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
