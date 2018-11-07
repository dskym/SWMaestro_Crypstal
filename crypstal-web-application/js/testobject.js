var botListData = [
    {
        id: 1,
        name: 'Test 1',
        asset: 1000000,
        exchange: 'Bithumb',
        coin: 'BTC',
        period: '10s',
        strategy: {
            'name': 'HighLowStrategy',
            'highPrice' : 1000,
            'lowPrice' : 1000,
        },
        chatBotAlarm: false,
        autoTrade: true
    },
    {
        id: 2,
        name: 'Test 2',
        asset: 1000000,
        exchange: 'Upbit',
        coin: 'ETH',
        period: '30s',
        strategy: {},
        chatBotAlarm: true,
        autoTrade: false
    },
    {
        id: 3,
        name: 'Test 3',
        asset: 1000000,
        exchange: 'Coinone',
        coin: 'XRP',
        period: '1m',
        strategy: {},
        chatBotAlarm: false,
        autoTrade: true
    },
    {
        id: 4,
        name: 'Test 4',
        asset: 1000000,
        exchange: 'Bithumb',
        coin: 'BTC',
        period: '3m',
        strategy: {},
        chatBotAlarm: false,
        autoTrade: false
    },
    {
        id: 5,
        name: 'Test 5',
        asset: 1000000,
        exchange: 'Bithumb',
        coin: 'ETH',
        period: '5m',
        strategy: {},
        chatBotAlarm: false,
        autoTrade: false
    },
    {
        id: 6,
        name: 'Test 6',
        asset: 1000000,
        exchange: 'Bithumb',
        coin: 'ETH',
        period: '10m',
        strategy: {},
        chatBotAlarm: true,
        autoTrade: true
    },
    {
        id: 7,
        name: 'Test 7',
        asset: 1000000,
        exchange: 'Bithumb',
        coin: 'XRP',
        period: '30m',
        strategy: {},
        chatBotAlarm: true,
        autoTrade: false
    }
];

var tradeResultData = {
    result: {
        from: "2018-11-01T11:11:10",
        to: "2018-11-01T11:11:10",
        initialAsset: "1,000,000.0",
        currentAsset: "1,100,000.0",
        profit: 0.15,
        hold: "coin"
    },
    history: [
        {
            time: "2018-11-01T11:11:10",
            position: "BUY",
            price: 1000000.0,
            amount: 1000.0,
            asset: 1000000.0
        },
        {
            time: "2018-11-01T11:12:10",
            position: "SELL",
            price: 1100000.0,
            amount: 1000.0,
            asset: 1100000.0
        },
        {
            time: "2018-11-01T11:13:10",
            position: "BUY",
            price: 1050000.0,
            amount: 1200.0,
            asset: 1050000.0
        },
        {
            time: "2018-11-01T11:14:10",
            position: "SELL",
            price: 1200000.0,
            amount: 1200.0,
            asset: 1200000.0
        },
        {
            time: "2018-11-01T11:15:10",
            position: "BUY",
            price: 1100000.0,
            amount: 1400.0,
            asset: 1100000.0
        },
        {
            time: "2018-11-01T11:16:10",
            position: "SELL",
            price: 1400000.0,
            amount: 1400.0,
            asset: 1400000.0
        },
    ]
}