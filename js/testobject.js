var botListData = [
    {
        "botId": "test01",
        "botName": "승윤봇",
        "targetCryptoCurrency": "BTC",
        "targetExchangeName": "UPBIT",
        "buyStrategy": {
            "threshold": 0
        },
        "sellStrategy": {
            "threshold": 0
        },
        "tradingPeriod": 5,
        "tradingAsset": 1000000.0,
        "signalAlarm": true,
        "autoTrading": false,
        "running": false,
        "creationTime": "2018-08-27T06:46:05.275",
        "lastStartupTime": "2018-08-27T06:46:05.275",
        "lastShutdownTime": "2018-08-27T06:46:05.275"
    }
];



var botStrategy = new Object();


//Trade Result
var tradeResult = new Object();

tradeResult.startDate = '2018-07-01 00:00:00';
tradeResult.endDate = '2018-07-31 00:00:00';
tradeResult.win = 2;
tradeResult.lose = 2;
tradeResult.maxProfit = 2.21;
tradeResult.maxLoss = -1.99;
tradeResult.revenueRate = 0.59;
tradeResult.initialInvestmentAmount = 1000000;
tradeResult.totalAmount = 1005894;
tradeResult.profitAndLossAmount = 5894;
tradeResult.changeRate = -1.76;
tradeResult.exchangeFee = 8996;
tradeResult.slippageRate = 0.4;




//Trade History
var tradeHistory = new Array();

var tradeHistoryObj = new Object();

tradeHistoryObj.date = new Date(2018, 7, 9, 2);

tradeHistoryObj.action = 'Buy';

tradeHistoryObj.price = 8379384;
tradeHistoryObj.volume = 0.1192;
tradeHistoryObj.evaluation = 999000;

tradeHistory.push(tradeHistoryObj);

var tradeHistoryObj = new Object();

tradeHistoryObj.date = new Date(2018, 7, 9, 21);

tradeHistoryObj.action = 'Sell';

tradeHistoryObj.price = 8305644;
tradeHistoryObj.volume = 0;
tradeHistoryObj.evaluation = 989218;

tradeHistory.push(tradeHistoryObj);


var tradeHistoryObj = new Object();

tradeHistoryObj.date = new Date(2018, 7, 18, 18);

tradeHistoryObj.action = 'Buy';

tradeHistoryObj.price = 7268960;
tradeHistoryObj.volume = 0.136;
tradeHistoryObj.evaluation = 988229;

tradeHistory.push(tradeHistoryObj);


var tradeHistoryObj = new Object();

tradeHistoryObj.date = new Date(2018, 7, 21, 23);

tradeHistoryObj.action = 'Sell';

tradeHistoryObj.price = 7437132;
tradeHistoryObj.volume = 0;
tradeHistoryObj.evaluation = 1010081;

tradeHistory.push(tradeHistoryObj);


var tradeHistoryObj = new Object();

tradeHistoryObj.date = new Date(2018, 7, 26, 18);

tradeHistoryObj.action = 'Buy';

tradeHistoryObj.price = 7022980;
tradeHistoryObj.volume = 0.1437;
tradeHistoryObj.evaluation = 1009071;

tradeHistory.push(tradeHistoryObj);


var tradeHistoryObj = new Object();

tradeHistoryObj.date = new Date(2018, 7, 29, 0);

tradeHistoryObj.action = 'Sell';

tradeHistoryObj.price = 6890328;
tradeHistoryObj.volume = 0;
tradeHistoryObj.evaluation = 989022;

tradeHistory.push(tradeHistoryObj);


var tradeHistoryObj = new Object();

tradeHistoryObj.date = new Date(2018, 7, 30, 22);

tradeHistoryObj.action = 'Buy';

tradeHistoryObj.price = 714840;
tradeHistoryObj.volume = 0.1382;
tradeHistoryObj.evaluation = 988033;

tradeHistory.push(tradeHistoryObj);


var tradeHistoryObj = new Object();

tradeHistoryObj.date = new Date(2018, 7, 30, 23);

tradeHistoryObj.action = 'Sell';

tradeHistoryObj.price = 7296696;
tradeHistoryObj.volume = 0;
tradeHistoryObj.evaluation = 1007510;

tradeHistory.push(tradeHistoryObj);



/*
//Trade History
var tradeHistory = new Array();

var baseDate = new Date(2018, 8, 14, 9, 0, 0);

for(var i = 0;i<8;++i) {
    var tradeHistoryObj = new Object();

    tradeHistoryObj.date = new Date(baseDate);
    baseDate.setMinutes(baseDate.getMinutes() + 5);

    if(i % 2 === 0)
        tradeHistoryObj.action = 'Buy';
    else
        tradeHistoryObj.action = 'Sell';

    tradeHistoryObj.price = 12345678;
    tradeHistoryObj.volume = 123.456;
    tradeHistoryObj.evaluation = 12345678;

    tradeHistory.push(tradeHistoryObj);
}
*/
