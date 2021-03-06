$(function () {
    "use strict";

    /*
    * Custom Backtest Event from backtest setting UI.
    */
    $('div.bot-info').on('backtest', function (event, data) {
        console.log('Backtest Custom Event');
        console.log(data);

        var tradeResult = data['result'];
        var tradeHistory = data['history'];

        showTradeResult(tradeResult);
        showTradeHistory(tradeHistory);


        var stockData = [];

        /*
        $.getJSON(chartUrl, function () {
            console.log('Success Load Chart Data');
        }).done(function (tempData) {
            console.log(tempData);

            var stockData = [];

            $.each(tempData['candles'], function(index) {
                stockData.unshift(tempData['candles'][index]);
            });

            chartEvent(tradeHistory, stockData);
        });
        */
        var tempUrl = 'https://api.upbit.com/v1/candles/minutes/5?market=KRW-BTC&to=2018-08-26%2000%3A00%3A00&count=200';

        $.getJSON(tempUrl, function () {
            console.log('Success Load Backtest Chart Data');
        }).done(function (tempData) {

            $.each(tempData, function (index) {
                stockData.unshift({
                    'time': new Date(moment(tempData[index]['candle_date_time_kst']).format("YYYY-MM-DD HH:mm:ss")),
                    'open': tempData[index]['opening_price'],
                    'close': tempData[index]['trade_price'],
                    'high': tempData[index]['high_price'],
                    'low': tempData[index]['low_price'],
                    'volume': tempData[index]['candle_acc_trade_volume']
                });
            });

            var tempUrl = 'https://api.upbit.com/v1/candles/minutes/5?market=KRW-BTC&to=2018-08-25%2016%3A20%3A00&count=200';

            $.getJSON(tempUrl, function () {
                console.log('Success Load Backtest Chart Data');
            }).done(function (tempData) {

                $.each(tempData, function (index) {
                    stockData.unshift({
                        'time': new Date(moment(tempData[index]['candle_date_time_kst']).format("YYYY-MM-DD HH:mm:ss")),
                        'open': tempData[index]['opening_price'],
                        'close': tempData[index]['trade_price'],
                        'high': tempData[index]['high_price'],
                        'low': tempData[index]['low_price'],
                        'volume': tempData[index]['candle_acc_trade_volume']
                    });
                });

                var tempUrl = 'https://api.upbit.com/v1/candles/minutes/5?market=KRW-BTC&to=2018-08-25%2008%3A40%3A00&count=200';

                $.getJSON(tempUrl, function () {
                    console.log('Success Load Backtest Chart Data');
                }).done(function (tempData) {

                    $.each(tempData, function (index) {
                        stockData.unshift({
                            'time': new Date(moment(tempData[index]['candle_date_time_kst']).format("YYYY-MM-DD HH:mm:ss")),
                            'open': tempData[index]['opening_price'],
                            'close': tempData[index]['trade_price'],
                            'high': tempData[index]['high_price'],
                            'low': tempData[index]['low_price'],
                            'volume': tempData[index]['candle_acc_trade_volume']
                        });
                    });

                    var tempUrl = 'https://api.upbit.com/v1/candles/minutes/5?market=KRW-BTC&to=2018-08-25%2001%3A00%3A00&count=200';

                    $.getJSON(tempUrl, function () {
                        console.log('Success Load Backtest Chart Data');
                    }).done(function (tempData) {

                        $.each(tempData, function (index) {
                            stockData.unshift({
                                'time': new Date(moment(tempData[index]['candle_date_time_kst']).format("YYYY-MM-DD HH:mm:ss")),
                                'open': tempData[index]['opening_price'],
                                'close': tempData[index]['trade_price'],
                                'high': tempData[index]['high_price'],
                                'low': tempData[index]['low_price'],
                                'volume': tempData[index]['candle_acc_trade_volume']
                            });
                        });

                        var tempUrl = 'https://api.upbit.com/v1/candles/minutes/5?market=KRW-BTC&to=2018-08-24%2017%3A20%3A00&count=200';

                        $.getJSON(tempUrl, function () {
                            console.log('Success Load Backtest Chart Data');
                        }).done(function (tempData) {

                            $.each(tempData, function (index) {
                                stockData.unshift({
                                    'time': new Date(moment(tempData[index]['candle_date_time_kst']).format("YYYY-MM-DD HH:mm:ss")),
                                    'open': tempData[index]['opening_price'],
                                    'close': tempData[index]['trade_price'],
                                    'high': tempData[index]['high_price'],
                                    'low': tempData[index]['low_price'],
                                    'volume': tempData[index]['candle_acc_trade_volume']
                                });
                            });

                            var tempUrl = 'https://api.upbit.com/v1/candles/minutes/5?market=KRW-BTC&to=2018-08-24%2009%3A40%3A00&count=200';

                            $.getJSON(tempUrl, function () {
                                console.log('Success Load Backtest Chart Data');
                            }).done(function (tempData) {

                                $.each(tempData, function (index) {
                                    stockData.unshift({
                                        'time': new Date(moment(tempData[index]['candle_date_time_kst']).format("YYYY-MM-DD HH:mm:ss")),
                                        'open': tempData[index]['opening_price'],
                                        'close': tempData[index]['trade_price'],
                                        'high': tempData[index]['high_price'],
                                        'low': tempData[index]['low_price'],
                                        'volume': tempData[index]['candle_acc_trade_volume']
                                    });
                                });

                                console.log(stockData);

                                chartEvent(tradeHistory, stockData);
                            });
                        });
                    });
                });
            });
        });

        var $botContentTab = $('ul.content-tab');
        $botContentTab.find('a[href="#info"]').closest('li').removeClass('hide');

        var $botChart = $('div.bot-info').find('div.bot-chart');
        $botChart.removeClass('hide');
    });

    function showTradeResult(tradeResult) {

        var startDate = tradeResult['period']['from'];
        var endDate = tradeResult['period']['to'];
        var initialAsset = tradeResult['asset']['initial'];
        var finalAsset = tradeResult['asset']['final'];
        var profitAsset = tradeResult['asset']['profit'];
        var exchangeFee = tradeResult['exchange']['fee'];
        var exchangeSlippage = tradeResult['exchange']['slippage'];
        var tradingCount = tradeResult['trading']['count'];
        var tradingWinCount = tradeResult['trading']['win'];
        var tradingLoseCount = tradeResult['trading']['lose'];
        var tradingMaxProfit = tradeResult['trading']['maxProfit'];
        var tradingMaxLoss = tradeResult['trading']['maxLoss'];
        var tradingWinningRate = tradeResult['trading']['winningRate'];
        var tradingReturnRate = tradeResult['trading']['returnRate'];
        var tradingAmountChangeRate = tradeResult['trading']['amountChangeRate'];

        var $botInfo = $('div.bot-info');

        //Bot Result UI
        var $botResult = $botInfo.find('div.bot-result');
        $botResult.empty();

        var tableNode = '';

        tableNode +=
            '                                                            <div class="box">\n' +
            '                                                                <div class="box-header without-border">\n' +
            '                                                                    <h6 class="box-title">Trade Result</h6>\n' +
            '                                                                </div>\n' +
            '                                                                <div class="box-body">\n' +
            '                                                                    <div class="table-responsive">\n' +
            '                                                                        <table class="table">\n';

        tableNode +=
            '                                      <tr>\n' +
            '                                        <th>테스트 기간</th>\n' +
            '                                        <td colspan="5">' + startDate + ' ~ ' + endDate + '</td>\n' +
            '                                      </tr>\n';

        tableNode +=
            '                                      <tr>\n' +
            '                                        <th rowspan="2">거래 횟수</th>\n' +
            '                                        <td>WIN</td>\n' +
            '                                        <td><span class="text-green">' + addComma(tradingWinCount) + '</span></td>\n' +
            '                                        <th rowspan="2">승률</th>\n' +
            '                                        <td>최대 이익</td>\n';

        if (tradingMaxProfit > 0) {
            tableNode +=
                '                                        <td><span class="text-green">+' + addComma(tradingMaxProfit) + '%</span></td>\n' +
                '                                      </tr>\n';
        }
        else if (tradingMaxProfit < 0) {
            tableNode +=
                '                                        <td><span class="text-red">' + addComma(tradingMaxProfit) + '%</span></td>\n' +
                '                                      </tr>\n';
        }
        else {
            tableNode +=
                '                                        <td><span>-' + addComma(tradingMaxProfit) + '%</span></td>\n' +
                '                                      </tr>\n';
        }

        tableNode +=
            '                                      <tr>\n' +
            '                                        <td>LOSE</td>\n' +
            '                                        <td><span class="text-red">' + addComma(tradingLoseCount) + '</span></td>\n' +
            '                                        <td>최대 손실</td>\n';

        if (tradingMaxLoss > 0) {
            tableNode +=
                '                                        <td><span class="text-green">+' + addComma(tradingMaxLoss) + '%</span></td>\n' +
                '                                      </tr>\n';
        }
        else if (tradingMaxLoss < 0) {
            tableNode +=
                '                                        <td><span class="text-red">' + addComma(tradingMaxLoss) + '%</span></td>\n' +
                '                                      </tr>\n';
        }
        else {
            tableNode +=
                '                                        <td><span>' + addComma(tradingMaxLoss) + '%</span></td>\n' +
                '                                      </tr>\n';
        }

        tableNode +=
            '                                      <tr>\n';

        if (tradingReturnRate > 0) {
            tableNode +=
                '                                        <th rowspan="6"><div>수익률</div><div class="text-green">+' + addComma(Number(tradingReturnRate).toFixed(2)) + '%</div></th>\n';
        }
        else if (tradingReturnRate < 0) {
            tableNode +=
                '                                        <th rowspan="6"><div>수익률</div><div class="text-red">' + addComma(Number(tradingReturnRate).toFixed(2)) + '%</div></th>\n';
        }
        else {
            tableNode +=
                '                                        <th rowspan="6"><div>수익률</div><div>' + addComma(Number(tradingReturnRate).toFixed(2)) + '%</div></th>\n';
        }


        tableNode +=
            '                                        <td>초기투자금액</td>\n' +
            '                                        <td colspan="4">' + addComma(initialAsset) + ' KRW</td>\n' +
            '                                      </tr>\n';

        tableNode +=
            '                                      <tr>\n' +
            '                                        <td>총 자산</td>\n' +
            '                                        <td colspan="4"><span class="text-green">' + addComma(Number(finalAsset).toFixed()) + ' KRW</span></td>\n' +
            '                                      </tr>\n';

        tableNode +=
            '                                      <tr>\n' +
            '                                        <td>손익 자산</td>\n' +
            '                                        <td colspan="4"><span class="text-green">' + addComma(Number(profitAsset).toFixed()) + ' KRW</span></td>\n' +
            '                                      </tr>\n';

        tableNode +=
            '                                      <tr>\n' +
            '                                        <td>코인가격 변동률</td>\n';

        if (tradingAmountChangeRate > 0) {
            tableNode +=
                '                                        <td colspan="4"><span class="text-green">+' + addComma(tradingAmountChangeRate) + '%</span></td>\n' +
                '                                      </tr>\n';
        }
        else if (tradingAmountChangeRate < 0) {
            tableNode +=
                '                                        <td colspan="4"><span class="text-red">' + addComma(tradingAmountChangeRate) + '%</span></td>\n' +
                '                                      </tr>\n';
        }
        else {
            tableNode +=
                '                                        <td colspan="4"><span>' + addComma(tradingAmountChangeRate) + '%</span></td>\n' +
                '                                      </tr>\n';
        }


        tableNode +=
            '                                      <tr>\n' +
            '                                        <td>거래소 수수료</td>\n' +
            '                                        <td colspan="4"><span class="text-red">' + addComma(exchangeFee) + ' KRW</span></td>\n' +
            '                                      </tr>\n';

        tableNode +=
            '                                      <tr>\n' +
            '                                        <td>슬리피지 비율</td>\n' +
            '                                        <td colspan="4">' + addComma(exchangeSlippage) + '%</td>\n' +
            '                                      </tr>\n';

        tableNode +=
            '                                                                        </table>\n' +
            '                                                                    </div>\n' +
            '                                                                </div>\n' +
            '                                                            </div>\n';

        $botResult.append(tableNode);

    }

    function showTradeHistory(tradeHistory) {
        var $botInfo = $('div.bot-info');

        //Bot History UI
        var $botHistory = $botInfo.find('div.bot-history');
        $botHistory.empty();

        var tableNode = '';

        tableNode +=
            '                                                            <div class="box">\n' +
            '                                                                <div class="box-header without-border">\n' +
            '                                                                    <h6 class="box-title">Trade History</h6>\n' +
            '                                                                </div>\n' +
            '                                                                <div class="box-body">\n' +
            '                                                                    <div class="table-responsive">\n' +
            '                                                                        <table class="table table-hover">\n' +
            '                                                                            <tr>\n' +
            '                                                                                <th>거래시간</th>\n' +
            '                                                                                <th>매수/매도</th>\n' +
            '                                                                                <th>가격</th>\n' +
            '                                                                                <th>수량</th>\n' +
            '                                                                                <th>평가금액</th>\n' +
            '                                                                            </tr>\n';

        $.each(tradeHistory, function (index, historyElement) {
            $.each(historyElement, function (key, value) {
                if (new Date(value['time']).getTime() >= new Date(2018,7,24,2,0,0).getTime()) {
                    tableNode += '<tr>';
                    tableNode += '<td><a href="javascript:void(0)"><span class="text-black">' + value['time'] + '</span></a></td>';

                    if (key === 'BUY')
                        tableNode += '<td><span class="label label-success">' + key + '</span></td>';
                    else if (key === 'SELL')
                        tableNode += '<td><span class="label label-danger">' + key + '</span></td>';

                    tableNode += '<td>' + addComma(value['price']) + '</td>';
                    tableNode += '<td>' + addComma(value['amount']) + '</td>';
                    tableNode += '<td>' + addComma(Number(value['asset']).toFixed()) + '</td>';
                    tableNode += '</tr>';
                }
            });
        });
        /*
        $.each(tradeHistory, function (index, historyElement) {
            $.each(historyElement, function(key, value) {
                tableNode += '<tr>';
                tableNode += '<td><a href="javascript:void(0)"><span class="text-black">' + value['time'] + '</span></a></td>';

                if (key === 'BUY')
                    tableNode += '<td><span class="label label-success">' + key + '</span></td>';
                else if(key === 'SELL')
                    tableNode += '<td><span class="label label-danger">' + key + '</span></td>';

                tableNode += '<td>' + addComma(value['price']) + '</td>';
                tableNode += '<td>' + addComma(value['amount']) + '</td>';
                tableNode += '<td>' + addComma(Number(value['asset']).toFixed()) + '</td>';
                tableNode += '</tr>';
            });
        });
        */

        tableNode +=
            '                                                                        </table>\n' +
            '                                                                    </div>\n' +
            '                                                                </div>\n' +
            '                                                            </div>\n';

        $botHistory.append(tableNode);
    }

    function chartEvent(tradeHistory, chartData) {
        //Trade Chart
        var tradeChart = AmCharts.makeChart("tradeChart", {
            "type": "stock",
            "theme": "light",

            autoDisplay: true,

            "dataSets": [{
                fieldMappings: [{
                    fromField: "open",
                    toField: "open"
                }, {
                    fromField: "close",
                    toField: "close"
                }, {
                    fromField: "high",
                    toField: "high"
                }, {
                    fromField: "low",
                    toField: "low"
                }, {
                    fromField: "volume",
                    toField: "volume"
                }],
                dataProvider: chartData,
                categoryField: "time"
            }],

            dataDateFormat: "YYYY-MM-DD HH:NN:SS",

            valueAxesSettings: {
                minPeriod: "5mm",
                equalSpacing: true,
            },

            categoryAxesSettings: {
                minPeriod: "5mm",
                equalSpacing: true,
            },

            mouseWheelZoomEnabled: true,

            glueToTheEnd: true,

            panels: [{
                title: "Price",
                showCategoryAxis: true,
                percentHeight: 80,

                categoryAxis: {
                    minPeriod: "5mm"
                },

                stockGraphs: [{
                    title: 'BTC',
                    type: "candlestick",
                    id: "g1",
                    balloonText: "Open:<b>[[open]]</b><br>Low:<b>[[low]]</b><br>High:<b>[[high]]</b><br>Close:<b>[[close]]</b><br>",
                    openField: "open",
                    closeField: "close",
                    highField: "high",
                    lowField: "low",
                    lineColor: "#0000ff",
                    fillColors: "#0000ff",
                    negativeLineColor: "#ff0000",
                    negativeFillColors: "#ff0000",
                    fillAlphas: 1,
                    useDataSetColors: false,
                    showBalloon: true,
                }],

                stockLegend: {
                    markerType: "none",
                    markerSize: 0,
                    labelText: "",
                }
            }, {
                title: "Volume",
                percentHeight: 20,
                showCategoryAxis: false,

                stockGraphs: [{
                    valueField: "volume",
                    type: "column",
                    useDataSetColors: false,
                    lineColor: "#2B4073",
                    balloonText: "Volume<br><b><span style='font-size:14px;'>Volume: [[value]]</span></b>",
                    showBalloon: true,
                    fillAlphas: false
                }],

                stockLegend: {
                    markerType: "none",
                    markerSize: 0,
                    labelText: "",
                }
            }],

            chartScrollbarSettings: {
                graph: "g1",
                graphType: "line",
                usePeriod: "5mm"
            },

            chartCursorSettings: {
                valueLineBalloonEnabled: true,
                valueLineEnabled: true,
                valueBalloonsEnabled: true
            },

            panelsSettings: {
                "usePrefixes": false
            },
        });

        //set stock event.
        var stockEvents = new Array();

        $.each(tradeHistory, function (index, historyElement) {
            $.each(historyElement, function (key, value) {
                var stockEvent = new Object();

                stockEvent.date = new Date(moment(value['time']).format("YYYY-MM-DD HH:mm:ss"));
                stockEvent.type = 'sign';
                stockEvent.graph = 'g1';
                stockEvent.color = '#ffffff';
                stockEvent.fontSize = '20';
                stockEvent.rollOverColor = '#00ff00';
                stockEvent.description = moment(value['time']).format("YYYY-MM-DD HH:mm:ss");

                if (key === 'BUY') {
                    stockEvent.text = 'B';
                    stockEvent.backgroundColor = '#ff0000';
                }
                else if (key === 'SELL') {
                    stockEvent.text = 'S';
                    stockEvent.backgroundColor = '#0000ff';
                }

                stockEvents.push(stockEvent);
            });
        });

        tradeChart.dataSets[0].stockEvents = stockEvents;
        tradeChart.validateData();
        /*
        var shortMADouble = new Array();
        var longMADouble = new Array();

        $.getJSON(chartUrl, function () {
        }).done(function(chartData) {
            var shortSum = 0;
            var longSum = 0;

            $.each(chartData, function(index, value) {
                shortSum += value['tradePrice'];
                longSum += value['tradePrice'];
                //9days

                if(index >= 8) {
                    shortMADouble.push(shortSum / 9);
                    shortSum -= chartData[index - 8]['tradePrice'];
                }

                //26days
                if(index >= 25) {
                    longMADouble.push(longSum / 26);
                    longSum -= chartData[index - 25]['tradePrice'];
                }
            });

            //console.log(shortMADouble);
            //console.log(longMADouble);
        });

        tradeChart.panels[0].stockGraphs.push({
            title: 'MA Double-9',
            type: "line",
            valueField: shortMADouble,
        });

        tradeChart.panels[0].stockGraphs.push({
            title: 'MA Double-26',
            type: "line",
            valueField: longMADouble,
        });

        */
    }

    function addComma(value) {
        return Number(value).toLocaleString('en');
    }
});


/*

  트레이드 결과 어떻게 보여줄 지 생각(봇 시작 눌렀을 때)

* 언제 사고 언제 팔았는 지 - 거래 내역
* 수익률, 수수료, 거래 횟수 등 종합적인 거래 정보
* 차트로 거래 시점 시각화 - 지점을 좀 더 디테일하게 고민해볼 수 있게
* 거래할 때마다 알림(현재 자산 수익률 등) - 거래 했을 때 알아야 하니까
* 분석(시뮬레이션) 툴이라면 다른 전략과 비교 했을 때 수익률 - 다른 전략에 비해 좋았나
* 현재 자산 현황 - 매수 했는 지 매도 했는 지 기다리고 있는 지
* 다른 코인에 적용했다면? - 다른 코인에 더 적합한 전략일까?
* 사용자랑 상호작용할 수 있게???

* 거래 내역 - 언제 코인 사고 언제 코인 팔았는 지
* 종합적인 거래 정보 - 수익률, 수수료, 거래 횟수
* 현재 자산 현황 - 매수 상태 / 매도 상태 / 대기 상테
* 다른 전략과 비교 했을 때 차트 / 수익률 비교
* 차트로 거래 시점 시각화

* 보여줘야 할 컴포넌트
*** 거래 내역(시간, 매수/매도, 가격, 수량, 금액)
*** 현재 자산 현황(코인, 원화)
*** 종합적인 거래 정보(수익률, 수수료, 거래 횟수, 현재 금액)
*** 현재 전략 거래 차트(투자 기간 내 차트, 매수/매도 표시)
*** 다른 전략과 비교 했을 때 차트 / 수익률 비교(다른 전략 리스트, 차트, )

전체적인 UI 구조 설계

*/

