import React, {Component} from 'react';
import {Card, CardBody} from "reactstrap";
import styled from "styled-components";

class WebTickerElement extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let changeRate;

        if (this.props.coin.change === 'RISE')
            changeRate = 'text-green';
        else if (this.props.coin.change === 'FALL')
            changeRate = 'text-red';
        else if (this.props.coin.change === 'EVEN')
            changeRate = '';

        return (
                <Card>
                    <CardBody>
                        <div className="flexbox webTickerContentTop">
                            <img
                                src={window.location.origin + '/images/coin/' + String(this.props.coin.cryptoCurrency).toLowerCase() + '.png'}/>
                            <span>
                                    {this.props.coin.cryptoCurrency}
                                </span>
                            <span className={"text-right" + changeRate}>
                                    <i className="mdi mdi-arrow-up-bold"></i>
                                {Number(this.props.coin.signedChangePrice).toLocaleString('en') + '(+' + (this.props.coin.signedChangeRate * 100).toFixed(2) + '%)'}
                                </span>
                        </div>
                        <div className="flexbox webTickerContentBottom">
                                <span>
                                    {this.props.exchange + ' | ' + this.props.coin.baseCurrency}
                                </span>
                            <span className="text-right text-yellow">
                                    {Number(this.props.coin.tradePrice).toLocaleString('en')}
                                </span>
                        </div>
                    </CardBody>
                </Card>
        );
    }
}

export default WebTickerElement;