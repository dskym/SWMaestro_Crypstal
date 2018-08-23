$(function () {
    "use strict";

    var server_url = 'http://crypstal-env.7xcrjvhg9m.ap-northeast-2.elasticbeanstalk.com/v1/chart/candles/minutes/5';

    //Trade Chart
    var tradeChart = AmCharts.makeChart("tradeChart", {
        "type": "stock",
        "theme": "light",

        "dataSets": [{
            fieldMappings: [ {
                fromField: "openingPrice",
                toField: "open"
            },{
                fromField: "tradePrice",
                toField: "close"
            },{
                fromField: "highPrice",
                toField: "high"
            },{
                fromField: "lowPrice",
                toField: "low"
            },{
                fromField: "candleAccTradeVolume",
                toField: "volume"
            } ],
            dataLoader: {
                url: server_url,
                format: 'json',
            },
            categoryField: "candleDateTimeKST"
        }],

        valueAxesSettings: {
            minPeriod: "mm",
            equalSpacing : true,
        },

        categoryAxesSettings: {
            minPeriod: "mm",
            equalSpacing : true,
        },

        mouseWheelZoomEnabled: true,

        "color": "#b0de09",
        "categoryField": "date",

        // EVENTS
        "stockEvents": [{
            "date": new Date(2018, 8, 14),
            "type": "sign",
            "backgroundColor": "#85CDE6",
            "graph": "g1",
            "text": "B",
            "description": "This is description of an event"
        }, {
            "date": new Date(2010, 10, 19),
            "type": "sign",
            "backgroundColor": "#85CDE6",
            "graph": "g1",
            "text": "B",
            "description": "This is description of an event"
        }, {
            "date": new Date(2010, 11, 10),
            "type": "sign",
            "backgroundColor": "#85CDE6",
            "graph": "g1",
            "text": "B",
            "description": "This is description of an event"
        }, {
            "date": new Date(2010, 11, 26),
            "type": "sign",
            "backgroundColor": "#85CDE6",
            "graph": "g1",
            "text": "B",
            "description": "This is description of an event"
        }, {
            "date": new Date(2011, 1, 3),
            "type": "sign",
            "backgroundColor": "#85CDE6",
            "graph": "g1",
            "text": "B",
            "description": "This is description of an event"
        }, {
            "date": new Date(2011, 1, 26),
            "type": "sign",
            "backgroundColor": "#85CDE6",
            "graph": "g1",
            "text": "S",
            "description": "This is description of an event"
        }, {
            "date": new Date(2011, 3, 5),
            "type": "sign",
            "backgroundColor": "#85CDE6",
            "graph": "g1",
            "text": "B",
            "description": "This is description of an event"
        }, {
            "date": new Date(2011, 3, 19),
            "type": "sign",
            "backgroundColor": "#85CDE6",
            "graph": "g1",
            "text": "S",
            "description": "This is description of an event"
        }, {
            "date": new Date(2011, 5, 15),
            "type": "sign",
            "backgroundColor": "#85CDE6",
            "graph": "g1",
            "text": "B",
            "description": "This is description of an event"
        }, {
            "date": new Date(2011, 6, 25),
            "type": "sign",
            "backgroundColor": "#85CDE6",
            "graph": "g1",
            "text": "B",
            "description": "This is description of an event"
        }, {
            "date": new Date(2011, 8, 1),
            "type": "sign",
            "backgroundColor": "#85CDE6",
            "graph": "g1",
            "text": "S",
            "description": "This is description of an event"
        }],

        panels: [ {
            title: "Price",
            showCategoryAxis: true,
            percentHeight: 80,
            valueAxes: [ {
                id: "v1",
                dashLength: 5
            } ],

            categoryAxis: {
                minPeriod: "mm",
                dashLength: 5
            },

            stockGraphs: [ {
                title: 'BTC',
                type: "candlestick",
                id: "g1",
                openField: "open",
                closeField: "close",
                highField: "high",
                lowField: "low",
                categoryField: "candleDateTimeKST",
                lineColor: "#0000ff",
                fillColors: "#0000ff",
                negativeLineColor: "#ff0000",
                negativeFillColors: "#ff0000",
                fillAlphas: 1,
                useDataSetColors: false,
                comparable: true,
                showBalloon: true,
                proCandlesticks: true,
                gapField: 10
            }],

            stockLegend: {
                "valueTextRegular": " ",
                "markerType": "none"
            }
        }],

        chartCursorSettings: {
            valueLineBalloonEnabled: true,
            valueLineEnabled: true,
            valueBalloonsEnabled:true
        },

        panelsSettings: {
            "usePrefixes": true
        },
    });



    var $botInfo = $('div.bot-info');

    var $botResult = $botInfo.find('div.bot-result');
    var $botResultTable = $botResult.find('table');

    var tableNode = '';

    tableNode +=
        '                                      <tr>\n' +
        '                                        <th>테스트 기간</th>\n' +
        '                                        <td colspan="5">' + tradeResult['startDate'] + ' ~ ' + tradeResult['endDate'] + '</td>\n' +
        '                                      </tr>\n';

    tableNode +=
        '                                      <tr>\n' +
        '                                        <th rowspan="2">거래 횟수</th>\n' +
        '                                        <td>WIN</td>\n' +
        '                                        <td><span class="text-green">' + addComma(tradeResult['win']) + '</span></td>\n' +
        '                                        <th rowspan="2">승률</th>\n' +
        '                                        <td>최대 이익</td>\n';

    if(tradeResult['maxProfit'] > 0) {
        tableNode +=
            '                                        <td><span class="text-green">+' + addComma(tradeResult['maxProfit']) + '%</span></td>\n' +
            '                                      </tr>\n';
    }
    else if(tradeResult['maxProfit'] < 0){
        tableNode +=
            '                                        <td><span class="text-red">' + addComma(tradeResult['maxProfit']) + '%</span></td>\n' +
            '                                      </tr>\n';
    }
    else {
        tableNode +=
            '                                        <td><span>-' + addComma(tradeResult['maxProfit']) + '%</span></td>\n' +
            '                                      </tr>\n';
    }

    tableNode +=
        '                                      <tr>\n' +
        '                                        <td>LOSE</td>\n' +
        '                                        <td><span class="text-red">' + addComma(tradeResult['lose']) + '</span></td>\n' +
        '                                        <td>최대 손실</td>\n';

    if(tradeResult['maxLoss'] > 0) {
        tableNode +=
            '                                        <td><span class="text-green">+' + addComma(tradeResult['maxLoss']) + '%</span></td>\n' +
            '                                      </tr>\n';
    }
    else if(tradeResult['maxLoss'] < 0){
        tableNode +=
            '                                        <td><span class="text-red">'  + addComma(tradeResult['maxLoss']) + '%</span></td>\n' +
            '                                      </tr>\n';
    }
    else {
        tableNode +=
            '                                        <td><span>' + addComma(tradeResult['maxLoss']) + '%</span></td>\n' +
            '                                      </tr>\n';
    }

    tableNode +=
        '                                      <tr>\n';

    if(tradeResult['revenueRate'] > 0) {
        tableNode +=
            '                                        <th rowspan="6"><div>수익률</div><div class="text-green">+' + addComma(tradeResult['revenueRate']) + '%</div></th>\n';
    }
    else if(tradeResult['revenueRate'] < 0) {
        tableNode +=
            '                                        <th rowspan="6"><div>수익률</div><div class="text-red">' + addComma(tradeResult['revenueRate']) + '%</div></th>\n';
    }
    else {
        tableNode +=
            '                                        <th rowspan="6"><div>수익률</div><div>' + addComma(tradeResult['revenueRate']) + '%</div></th>\n';
    }


    tableNode +=
        '                                        <td>초기투자금액</td>\n' +
        '                                        <td colspan="4">' + addComma(tradeResult['initialInvestmentAmount']) +' KRW</td>\n' +
        '                                      </tr>\n';

    tableNode +=
        '                                      <tr>\n' +
        '                                        <td>총 자산</td>\n' +
        '                                        <td colspan="4"><span class="text-green">' + addComma(tradeResult['totalAmount']) + ' KRW</span></td>\n' +
        '                                      </tr>\n';

    tableNode +=
        '                                      <tr>\n' +
        '                                        <td>손익 자산</td>\n' +
        '                                        <td colspan="4"><span class="text-green">' + addComma(tradeResult['profitAndLossAmount']) + ' KRW</span></td>\n' +
        '                                      </tr>\n';

    tableNode +=
        '                                      <tr>\n' +
        '                                        <td>코인가격 변동률</td>\n';

    if(tradeResult['changeRate'] > 0) {
        tableNode +=
            '                                        <td colspan="4"><span class="text-green">+' + addComma(tradeResult['changeRate']) + '%</span></td>\n' +
            '                                      </tr>\n';
    }
    else if(tradeResult['changeRate'] < 0) {
        tableNode +=
            '                                        <td colspan="4"><span class="text-red">'+ addComma(tradeResult['changeRate']) +'%</span></td>\n' +
            '                                      </tr>\n';
    }
    else {
        tableNode +=
            '                                        <td colspan="4"><span>' + addComma(tradeResult['changeRate']) + '%</span></td>\n' +
            '                                      </tr>\n';
    }


    tableNode +=
        '                                      <tr>\n' +
        '                                        <td>거래소 수수료</td>\n' +
        '                                        <td colspan="4"><span class="text-red">'+ addComma(tradeResult['exchangeFee']) +' KRW</span></td>\n' +
        '                                      </tr>\n';

    tableNode +=
        '                                      <tr>\n' +
        '                                        <td>슬리피지 비율</td>\n' +
        '                                        <td colspan="4">' + addComma(tradeResult['slippageRate']) + '%</td>\n' +
        '                                      </tr>\n';

    $botResultTable.append(tableNode);


    var $botHistory = $botInfo.find('div.bot-history');
    var $botHistoryTable = $botHistory.find('table');

    $.each(tradeHistory, function(index, value) {
        var tableNode = '';

        tableNode += '<tr>';
        tableNode += '<td><a href="javascript:void(0)"><span class="text-black">' + moment(value['date']).format('YYYY-MM-DD hh:mm') + '</span></a></td>';

        if(value['action'] === 'Buy')
            tableNode += '<td><span class="label label-success">' + value['action'] + '</span></td>';
        else
            tableNode += '<td><span class="label label-danger">' + value['action'] + '</span></td>';

        tableNode += '<td>' + addComma(value['price']) + '</td>';
        tableNode += '<td>' + addComma(value['volume']) + '</td>';
        tableNode += '<td>' + addComma(value['evaluation']) + '</td>';
        tableNode += '</tr>';

        $botHistoryTable.append(tableNode);
    });



    //Trade Chart
    var tradeChart = AmCharts.charts[1];


    var stockEvents = new Array();

    $.each(tradeHistory, function(index, value) {
        var stockEventsObj = new Object();

        stockEventsObj.date = new Date(value['date']);
        stockEventsObj.type = 'sign';
        stockEventsObj.backgroundColor = '#85CDE6';
        stockEventsObj.graph = 'g1';

        if(value['action'] === 'Buy')
            stockEventsObj.text = 'B';
        else if(value['action'] === 'Sell')
            stockEventsObj.text = 'S';

        stockEventsObj.description = 'This is description of an event';

        stockEvents.push(stockEventsObj);
    });

    tradeChart.stockEvents = stockEvents;

    function addComma(value) {
        return Number(value).toLocaleString('en');
    }

    function addComma(value) {
        return Number(value).toLocaleString('en');
    }
});
