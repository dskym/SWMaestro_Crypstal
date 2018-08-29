$(function () {
    "use strict";

    /*
    * Custom Backtest Event from backtest setting UI.
    */
    $('div.bot-info').on('backtest', function(event, data) {
        console.log('Backtest Custom Event');
        console.log(data);

        var tradeResult = data['result'];
        var tradeHistory = data['history'];

        showTradeResult(tradeResult);
        showTradeHistory(tradeHistory);
        chartEvent(tradeHistory);

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

        if(tradingMaxProfit > 0) {
            tableNode +=
                '                                        <td><span class="text-green">+' + addComma(tradingMaxProfit) + '%</span></td>\n' +
                '                                      </tr>\n';
        }
        else if(tradingMaxProfit < 0){
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

        if(tradingMaxLoss > 0) {
            tableNode +=
                '                                        <td><span class="text-green">+' + addComma(tradingMaxLoss) + '%</span></td>\n' +
                '                                      </tr>\n';
        }
        else if(tradingMaxLoss < 0){
            tableNode +=
                '                                        <td><span class="text-red">'  + addComma(tradingMaxLoss) + '%</span></td>\n' +
                '                                      </tr>\n';
        }
        else {
            tableNode +=
                '                                        <td><span>' + addComma(tradingMaxLoss) + '%</span></td>\n' +
                '                                      </tr>\n';
        }

        tableNode +=
            '                                      <tr>\n';

        if(tradingReturnRate > 0) {
            tableNode +=
                '                                        <th rowspan="6"><div>수익률</div><div class="text-green">+' + addComma(tradingReturnRate) + '%</div></th>\n';
        }
        else if(tradingReturnRate < 0) {
            tableNode +=
                '                                        <th rowspan="6"><div>수익률</div><div class="text-red">' + addComma(tradingReturnRate) + '%</div></th>\n';
        }
        else {
            tableNode +=
                '                                        <th rowspan="6"><div>수익률</div><div>' + addComma(tradingReturnRate) + '%</div></th>\n';
        }


        tableNode +=
            '                                        <td>초기투자금액</td>\n' +
            '                                        <td colspan="4">' + addComma(initialAsset) +' KRW</td>\n' +
            '                                      </tr>\n';

        tableNode +=
            '                                      <tr>\n' +
            '                                        <td>총 자산</td>\n' +
            '                                        <td colspan="4"><span class="text-green">' + addComma(finalAsset) + ' KRW</span></td>\n' +
            '                                      </tr>\n';

        tableNode +=
            '                                      <tr>\n' +
            '                                        <td>손익 자산</td>\n' +
            '                                        <td colspan="4"><span class="text-green">' + addComma(profitAsset) + ' KRW</span></td>\n' +
            '                                      </tr>\n';

        tableNode +=
            '                                      <tr>\n' +
            '                                        <td>코인가격 변동률</td>\n';

        if(tradingAmountChangeRate > 0) {
            tableNode +=
                '                                        <td colspan="4"><span class="text-green">+' + addComma(tradingAmountChangeRate) + '%</span></td>\n' +
                '                                      </tr>\n';
        }
        else if(tradingAmountChangeRate < 0) {
            tableNode +=
                '                                        <td colspan="4"><span class="text-red">'+ addComma(tradingAmountChangeRate) +'%</span></td>\n' +
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
            '                                        <td colspan="4"><span class="text-red">'+ addComma(exchangeFee) +' KRW</span></td>\n' +
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
            $.each(historyElement, function(key, value) {
                tableNode += '<tr>';
                tableNode += '<td><a href="javascript:void(0)"><span class="text-black">' + value['time'] + '</span></a></td>';

                if (key === 'BUY')
                    tableNode += '<td><span class="label label-success">' + key + '</span></td>';
                else if(key === 'SELL')
                    tableNode += '<td><span class="label label-danger">' + key + '</span></td>';

                tableNode += '<td>' + addComma(value['price']) + '</td>';
                tableNode += '<td>' + addComma(value['amount']) + '</td>';
                tableNode += '<td>' + addComma(value['asset']) + '</td>';
                tableNode += '</tr>';
            });
        });

        tableNode +=
            '                                                                        </table>\n' +
            '                                                                    </div>\n' +
            '                                                                </div>\n' +
            '                                                            </div>\n';

        $botHistory.append(tableNode);
    }

    function chartEvent(tradeHistory) {
        //Trade Chart
        var tradeChart = AmCharts.makeChart("tradeChart", {
            "type": "stock",
            "theme": "light",

            autoDisplay: true,

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
                    url: chartUrl,
                    format: 'json',
                },
                categoryField: "candleDateTimeKST"
            }],

            dataDateFormat: "YYYY-MM-DD HH:NN:SS",

            valueAxesSettings: {
                minPeriod: "5mm",
                equalSpacing : true,
            },

            categoryAxesSettings: {
                minPeriod: "5mm",
                equalSpacing : true,
            },

            mouseWheelZoomEnabled: true,

            glueToTheEnd: true,

            panels: [ {
                title: "Price",
                showCategoryAxis: true,
                percentHeight: 80,

                categoryAxis: {
                    minPeriod: "5mm"
                },

                stockGraphs: [ {
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
                valueBalloonsEnabled:true
            },

            panelsSettings: {
                "usePrefixes": false
            },
        });

        //set stock event.
        var stockEvents = new Array();

        $.each(tradeHistory, function (index, historyElement) {
            $.each(historyElement, function(key, value) {
                var stockEvent = new Object();

                stockEvent.date = moment(value['time']).format("YYYY-MM-DD hh:mm:ss");
                stockEvent.type = 'sign';
                stockEvent.graph = 'g1';
                stockEvent.color = '#ffffff';
                stockEvent.rollOverColor = '#00ff00';
                stockEvent.description = moment(value['time']).format("YYYY-MM-DD hh:mm:ss");

                if (key === 'buy') {
                    stockEvent.text = 'B';
                    stockEvent.backgroundColor = '#ff0000';
                }
                else if (key === 'sell') {
                    stockEvent.text = 'S';
                    stockEvent.backgroundColor = '#0000ff';
                }

                stockEvents.push(stockEvent);
            });
        });

        tradeChart.dataSets[0].stockEvents = stockEvents;

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

        console.log(tradeChart);
    }

    function addComma(value) {
        return Number(value).toLocaleString('en');
    }
});
