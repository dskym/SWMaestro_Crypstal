$(function () {
    "use strict";

    // Slim scrolling
    $('.inner-content-div').slimScroll({
        height: 'auto'
    });

    $(document).on('click', 'div.bot-list-component .report', function (event) {
        event.stopPropagation();

        const $botUI = $(this).closest('.bot-setting');
        let botData = $botUI.data('botData');

        if(botData.autoTrade === false) {
            swal("실패", "자동 거래를 시작해주세요.", "error", {
                buttons: false,
            });

            return false;
        }

        //redraw
        drawBotReportComponent(botData);
    });

    $('div.content').on('backtest', function (botData) {
        //redraw
        drawBotReportComponent(botData);
    });

    function makeBotVerticalListComponent(selctedBotData) {
        let botIndex;

        $.each(botListData, function(index, botData) {
            if(selctedBotData === botData)
                botIndex = index;
        });

        let listContent = '';

        $.each(botListData, function (index, botData) {
            listContent += `
			    <li class="nav-item">
			        <a class="nav-link ${index === botIndex ? 'active' : ''}" data-toggle="tab" href="#" role="tab" aria-expanded="false">
                        <span style="font-size: 1.5rem">${botData.name}</span>
						<span class="badge ${botData.autoTrade === true ? 'start' : 'stop'}"></span>
                    </a>
                </li>
            `;
        });

        let content = `
            <ul class="nav nav-tabs tabs-vertical" role="tablist">
                ${listContent}
            </ul>
        `;

        return content;
    }

    function makeBotProfitComponent(profitRate) {
        let profitRateElement;

        if(profitRate > 0) {
            profitRateElement = `<h1 class="text-green margin-top-0">+${profitRate}%</h1>`;
        } else if(profitRate < 0) {
            profitRateElement = `<h1 class="text-red margin-top-0">-${profitRate}%</h1>`;
        } else {
            profitRateElement = `<h1 class="margin-top-0">${profitRate}%</h1>`;
        }

        let content = `
            <div class="box">
                <div class="box-body text-center">
                    ${profitRateElement}
                </div>
            </div>
        `;

        return content;
    }

    function makeBotStatusComponent(position) {
        let botStatusElement;

        if(botStatusElement === 'hold') {

        } else if(botStatusElement === 'hold') {

        }

        let content = `
            <div class="box">
                <div class="box-body text-center">
                    <h1 class="margin-top-0">${position}</h1>
                </div>
            </div>
        `;

        return content;
    }

    function makeAssetComponent() {
        let content = `
             <div class="box">
                <div class="box-body text-center">
                    <h1 class="margin-top-0">Asset List</h1>
                </div>
            </div>
       `;

        return content;
    }

    function makeTradeHistoryComponent(tradeHistory) {
        let content = `
            <div class="box">
                <div class="box-content inner-content-div">
                    <div class="box-body p-0">
                        <div class="table-responsive">
                            <table class="table table-striped">
                                <tr>
                                    <th>거래시간</th>
                                    <th>매수/매도</th>
                                    <th>가격</th>
                                    <th>수량</th>
                                    <th>평가금액</th>
                                </tr>
                ${
            (tradeHistory => {
                let result = '';

                $.each(tradeHistory, function (index, historyElement) {
                        let positionElement;

                        if (historyElement.position === 'BUY')
                            positionElement = `<td><span class="label label-success">${historyElement.position}</span></td>`;
                        else if (historyElement.position === 'SELL')
                            positionElement = `<td><span class="label label-danger">${historyElement.position}</span></td>`;

                        result += `
                                <tr>
                                    <td>${historyElement['time']}</td>
                                    ${positionElement}
                                    <td>${addComma(historyElement['price'])}원</td>
                                    <td>${addComma(historyElement['amount'])}</td>
                                    <td>${addComma(Number(historyElement['asset']).toFixed())}원</td>
                                </tr>
                                    `;
                        /*
                        let positionElement;

                        if (key === 'BUY')
                            positionElement = `<td><span class="label label-success">${key}</span></td>`;
                        else if (key === 'SELL')
                            positionElement = `<td><span class="label label-danger">${key}</span></td>`;

                        result += `
                                <tr>
                                    <td>${value['time']}</td>
                                    ${positionElement}
                                    <td>${addComma(value['price'])}원</td>
                                    <td>${addComma(value['amount'])}</td>
                                    <td>${addComma(Number(value['asset']).toFixed())}원</td>
                                </tr>
                                    `;
                        */
                });

                return result;
            })(tradeHistory)
            }
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        `;

        return content;
    }

    function makeTradeChartComponent() {
        let content = `
            <div class="box">
                <div class="box-body">
                    <div class="chart">
                        <div id="liveChart" style="height: 720px;"></div>
                    </div>
                </div>
            </div>
        `;

        return content;
    }

    function makeTradeResultComponent(tempData) {
        let tradeBotProfitRateComponent = makeBotProfitComponent(tempData.result.profit * 100);
        let tradeHistoryComponent = makeTradeHistoryComponent(tempData['history']);
        let tradeBotStatusComponent = makeBotStatusComponent(tempData.result.hold);
        let currentAssetComponent = makeAssetComponent(tempData.result.currentAsset);
        let tradeChartComponent = makeTradeChartComponent();

        let content = `
            <div class="tab-pane active" id="bot" role="tabpanel" aria-expanded="true">
                <div class="pad p-0">
                    <div class="tradeResult">
                        <div class="tradeInformation">
                            <div class="tradeDetail">
                                <div class="tradeLeftResult">
                                    <div class="profitRate">
                                        ${tradeBotProfitRateComponent}
                                    </div>
                                    <div class="botStatus">
                                        ${tradeBotStatusComponent}
                                    </div>
                                </div>
                                <div class="currentAsset">
                                    ${currentAssetComponent}
                                </div>
                            </div>
                            <div class="tradeHistory">
                                ${tradeHistoryComponent}
                            </div>
                        </div>
                        <div class="tradeChart">
                            ${tradeChartComponent}
                        </div>
                    </div>
                </div>
            </div>
        `;

        return content;
    }

    function setTradeChartComponent() {
        // Live Chart Setting.
        let liveChart = AmCharts.makeChart("liveChart", {
            type: "stock",
            theme: "light",

            autoDisplay: true,

            dataSets: [],

            dataSetSelector: {
                position: 'bottom',
                selectText: 'Period ',
                listeners: [
                    {
                        'event': 'dataSetSelected',
                        'method': changeInterval
                    }
                ],
            },

            categoryAxesSettings: {
                minPeriod: "10ss",
                equalSpacing: true,
                groupToPeriods: ['10ss']
            },

            mouseWheelZoomEnabled: true,

            glueToTheEnd: true,

            panels: [{
                title: "Price",
                showCategoryAxis: true,
                percentHeight: 80,

                categoryAxis: {
                    parseDates: true,
                    minPeriod: "10ss"
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
                    lineColor: "#ff0000",
                    fillColors: "#ff0000",
                    negativeLineColor: "#0000ff",
                    negativeFillColors: "#0000ff",
                    fillAlphas: 1,
                    useDataSetColors: false,
                    showBalloon: true
                }],

                stockLegend: {
                    markerType: "none",
                    markerSize: 0,
                    labelText: "",
                },

                chartCursor: {
                    selectWithoutZooming: true,
                },
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
                },
            }],

            panelsSettings: {
                usePrefixes: false
            },

            chartScrollbarSettings: {
                enabled: false
            }
        });

        // DataSet Period Object
        let dataSetPeriod = {
            '10s': {
                dataSetIndex: 0,
                interval: 10
            },
            '30s': {
                dataSetIndex: 1,
                interval: 30
            },
            '1m': {
                dataSetIndex: 2,
                interval: 60
            },
            '3m': {
                dataSetIndex: 3,
                interval: 180
            },
            '5m': {
                dataSetIndex: 4,
                interval: 300
            },
            '10m': {
                dataSetIndex: 5,
                interval: 600
            },
            '15m': {
                dataSetIndex: 6,
                interval: 900
            },
            '30m': {
                dataSetIndex: 7,
                interval: 1800
            },
            '1h': {
                dataSetIndex: 8,
                interval: 3600
            },
            '2h': {
                dataSetIndex: 9,
                interval: 7200
            },
            '4h': {
                dataSetIndex: 10,
                interval: 14400
            },
            '1d': {
                dataSetIndex: 11,
                interval: 86400
            },
        };

        // Add DataSet Array in Chart Object.
        $.each(dataSetPeriod, function (key, value) {
            liveChart.dataSets.push({
                showInCompare: false,
                title: key,
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
                dataProvider: [],
                categoryField: "time"
            });
        });

        // Change Live Chart depending on interval.
        function changeInterval(event) {
            console.log('change');

            var period = event.dataSet.title;

            var data;

            $.each(dataSetPeriod, function (key, value) {
                if (period === key)
                    data = value;
            });

            var stockDataUrl = 'https://api.upbit.com/v1/candles/minutes/3?market=KRW-BTC&count=200';

            //var stockDataUrl = chartUrl;

            $.getJSON(stockDataUrl, function () {
                console.log('Success Load Stock Data');
            }).done(function (tempData) {
                var stockData = [];

                $.each(tempData, function (index) {
                    stockData.unshift({
                        'time': tempData[index]['candle_date_time_kst'],
                        'open': tempData[index]['opening_price'],
                        'close': tempData[index]['trade_price'],
                        'high': tempData[index]['high_price'],
                        'low': tempData[index]['low_price'],
                        'volume': tempData[index]['candle_acc_trade_volume']
                    });
                });

                event.chart.dataSets[data.dataSetIndex].dataProvider = stockData;
                event.chart.validateData();
            });

            clearInterval(liveInterval);
            var liveInterval = setInterval(function () {
                updateData(event.chart, data.dataSetIndex);
            }, data.interval * 1000);
        }

        // Load initial data.
        //var stockDataUrl = 'https://api.upbit.com/v1/candles/minutes/1?market=KRW-BTC&count=200';
        let stockDataUrl = 'http://crypstal.ap-northeast-2.elasticbeanstalk.com/v1/chart/candles/seconds/10?symbol=bithumbBTC&count=200';

        $.getJSON(stockDataUrl, function () {
            console.log('Success Load Stock Data');
        }).done(function (data) {
            var stockData = [];

            $.each(data['candles'], function (index) {
                stockData.unshift({
                    'time': data['candles'][index]['time'],
                    'open': data['candles'][index]['open'],
                    'close': data['candles'][index]['close'],
                    'high': data['candles'][index]['high'],
                    'low': data['candles'][index]['low'],
                    'volume': data['candles'][index]['volume']
                });
            });

            liveChart.dataSets[0].dataProvider = stockData;
            liveChart.validateData();
        });

        // Get new data and update chart periodically.
        let updateData = function (chart, index) {
            //get data
            var updateDataUrl = 'http://crypstal.ap-northeast-2.elasticbeanstalk.com/v1/chart/candles/seconds/10?symbol=bithumbBTC&count=1';

            $.getJSON(updateDataUrl, function () {
                console.log('Success Load New Stock Data');
            }).done(function (data) {
                var newData = data['candles'][0];

                //add data
                chart.dataSets[index].dataProvider.push(newData);
                chart.validateData();
            });
        };

        console.log(liveChart);

        let liveInterval = setInterval(function () {
            updateData(liveChart, 0);
        }, 10 * 1000);
    }

    function drawBotReportComponent(botData) {
        let $content = $('div.content');
        $content.empty();

        /*
        const tempUrl = 'http://crypstal.ap-northeast-2.elasticbeanstalk.com/v1/bots/1/backtest?from=2018-10-01&to=2018-11-01&asset=1000000&fee=0.001&slippage=0.004';

        $.getJSON(tempUrl, function () {
            console.log('Success Load Backtest Chart Data');
        }).done(function (tempData) {
            let botVerticalListComponent = makeBotVerticalListComponent();
            let tradeResultComponent = makeTradeResultComponent(tempData);

            console.log(tempData['result']);

            let tradeComponent = `
                <div class="trade">
                    <div class="vtabs customvtab">
                        ${botVerticalListComponent}
                        <div class="tab-content">
                            ${tradeResultComponent}
                        </div>
                    </div>
                </div>
            `;

            $content.append(tradeComponent);

            setTradeChartComponent();
        });
        */


        let botVerticalListComponent = makeBotVerticalListComponent(botData);
        let tradeResultComponent = makeTradeResultComponent(tradeResultData);

        let tradeComponent = `
                <div class="trade">
                    <div class="vtabs customvtab">
                        ${botVerticalListComponent}
                        <div class="tab-content">
                            ${tradeResultComponent}
                        </div>
                    </div>
                </div>
            `;

        $content.append(tradeComponent);

        setTradeChartComponent();
    }

    function addComma(value) {
        return Number(value).toLocaleString('en');
    }
});