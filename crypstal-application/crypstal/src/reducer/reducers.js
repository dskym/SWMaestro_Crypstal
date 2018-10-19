import {combineReducers} from 'redux';

//key : bot id
//value : bot state
const initialBotState = [
    {
        id: 1,
        name: "AAA",
        crypto: "BTC",
        exchange: "UPBIT",
        period: 5,
        asset: 1000000.0,
        alarm: true,
        autoTrading: false
    },
    {
        id: 2,
        name: "BBB",
        crypto: "BTC",
        exchange: "UPBIT",
        period: 5,
        asset: 1000000.0,
        alarm: false,
        autoTrading: true
    }
];

function bot(state = initialBotState, action) {
    switch (action.type) {
        case 1 :
            return 1;
        default :
            return state;
    }
}

//key : bot id
//value : bot strategy
//bot id를 넣으면 나옴.
const initialStrategyState = [
    {
        SELL: [
            {
                indicator: 'MADouble',
                shortTerm: 55,
                longTerm: 130,
                shortTermMAType: 'SMA',
                longTermMAType: 'SMA',
                comparator: '<',
                weight: 1
            }
        ],
        BUY: [
            {
                indicator: 'MADouble',
                shortTerm: 55,
                longTerm: 130,
                shortTermMAType: 'SMA',
                longTermMAType: 'SMA',
                comparator: '>',
                weight: 1
            }
        ]
    }
];

function strategy(state = initialStrategyState, action) {
    switch (action.type) {
        case 1 :
            return 1;
        default :
            return state;
    }
}

const initialCoinState = {
    from: '2018-08-14T17:15:00',
    to: '2018-08-14T17:15:00',
    candles: [
        {
            open: 7077000.0,
            high: 7077000.0,
            low: 7069000.0,
            close: 7072000.0,
            volume: 19.0,
            time: '2018-08-14T17:15:00'
        },
        {
            open: 70770000.0,
            high: 70770000.0,
            low: 70690000.0,
            close: 70720000.0,
            volume: 190.0,
            time: '2018-08-14T17:20:00'
        }
    ]
};

function coin(state = initialCoinState, action) {
    switch (action.type) {
        case 1 :
            return 1;
        default :
            return state;
    }
}

const initialWebTickerState = {
    exchange: 'UPBIT',
    marketConditionList: [
        {
            baseCurrency: 'KRW',
            cryptoCurrency: 'BTC',
            tradePrice: 7305000.0,
            change: 'FALL',
            signedChangePrice: -38000.0,
            signedChangeRate: -0.0051749966
        },
        {
            baseCurrency: 'KRW',
            cryptoCurrency: 'ETH',
            tradePrice: 7305000.0,
            change: 'RISE',
            signedChangePrice: -38000.0,
            signedChangeRate: -0.0051749966
        }
    ]
};

function webTicker(state = initialWebTickerState, action) {
    switch (action.type) {
        case 1 :
            return 1;
        default :
            return state;
    }
}

const initialBacktestState = {
    result: {
        period: {
            from: '2018-09-20',
            to: '2018-10-20'
        },
        asset: {
            initial: 1000000.0,
            final: 1029794.1495124594,
            profit: 29794.149512459408
        },
        crypto: {
            name: 'BTC',
            initial: 7346000.0,
            final: 7604000.0,
            change: 0.258
        },
        exchange: {
            name: 'UPBIT',
            fee: 0.001,
            slippage: 0.004
        },
        trading: {
            count: 5,
            win: 4,
            lose: 1,
            maxProfit: 0.010969664138678229,
            maxLoss: -0.04595513256288231,
            winningRate: 0.9710678590215676,
            returnRate: 0.0,
            amountChangeRate: 0.0
        }
    },
    history: [
        {
            BUY: {
                time: '2018-08-19 18:20',
                price: 7384000.0,
                amount: 0.13542795232936078,
                asset: 1000000.0
            },
            SELL: {
                time: '2018-08-20 07:20',
                price: 7465000.0,
                amount: 0.13542795232936078,
                asset: 1010969.6641386782
            }
        }
    ]
};

function backtest(state = initialBacktestState, action) {
    switch (action.type) {
        case 1 :
            return 1;
        default :
            return state;
    }
}

const botApp = combineReducers({
    bot,
    strategy,
    coin,
    webTicker,
    backtest
});

export default botApp;