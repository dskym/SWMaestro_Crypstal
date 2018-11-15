$(function () {
    "use strict";

    $(window).on('popstate', function (event) {
        console.log(history);
        console.log(event.originalEvent);
    });

    // Slim scrolling
    $('.inner-content-div').slimScroll({
        height: 'auto'
    });

    $(document).on('click', 'div.bot-list-component .report', function (event) {
        event.stopPropagation();

        const $botUI = $(this).closest('.bot-setting');
        let botData = $botUI.data('botData');

        const currentIndex = $('.bot-setting').index($botUI);

        if (botData.autoTrade === false) {
            swal("실패", "자동 거래를 시작해주세요.", "error", {
                buttons: false,
            });

            return false;
        }

        //redraw
        const resultUrl = serverUrl + '/bot/' + botData.id + '/trade';

        console.log(resultUrl);

        $.getJSON(resultUrl, function(tradeHistory) {
            //history.pushState({data: botData}, '', './TradeHistory');
            //console.log(history);

            drawBotReportComponent(currentIndex, tradeHistory);
        });
        //drawBotReportComponent(currentIndex, tradeResultData['history']);
    });

    $('div.content').on('backtest', function (botData) {
        //redraw
        //drawBotReportComponent(botData);
    });

    function makeBotVerticalListComponent(selectedIndex, botListData) {
        let botIndex = selectedIndex;

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

        if (profitRate > 0) {
            profitRateElement = `<span class="font-size-30">수익률 : <span class="text-green margin-top-0">+${profitRate}%</span></span>`;
        } else if (profitRate < 0) {
            profitRateElement = `<span class="font-size-30">수익률 : <span class="text-red margin-top-0">-${profitRate}%</span></span>`;
        } else {
            profitRateElement = `<span class="font-size-30">수익률 : <span class="margin-top-0">${profitRate}%</span></span>`;
        }

        let content = `
            <div class="box">
                <div class="box-body text-center text-black">
                    ${profitRateElement}
                </div>
            </div>
        `;

        return content;
    }

    function makeBotStatusComponent(position) {
        let botStatusElement;

        if (botStatusElement === 'hold') {

        } else if (botStatusElement === 'coin') {

        }

        let content = `
            <div class="box">
                <div class="box-body text-center">
                    <span class="text-black font-size-30">보유 : <span class="margin-top-0 text-black">${position}</span></span>
                </div>
            </div>
        `;

        return content;
    }

    function makeProfitChartComponent() {
        let content = `
            <div class="box">
                <div class="box-body">
                    <div class="chart">
                        <div id="profitChart" style="height: 250px;"></div>
                    </div>
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
                                    <td>${historyElement['amount']}</td>
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

    function makeTradeResultComponent(tradeHistory) {
        let tradeBotProfitRateComponent = makeBotProfitComponent(0.15);
        let tradeHistoryComponent = makeTradeHistoryComponent(tradeHistory);
        let tradeBotStatusComponent = makeBotStatusComponent('Coin');
        let profitChartComponent = makeProfitChartComponent();
        let tradeChartComponent = makeTradeChartComponent();

        let content = `
            <div class="tab-pane active" id="bot" role="tabpanel" aria-expanded="true">
                <div class="pad p-0">
                    <div class="tradeResult">
                        <div class="tradeInformation">
                            <div class="tradeDetail">
                                <div class="tradeTopResult">
                                    <div class="profitRate">
                                        ${tradeBotProfitRateComponent}
                                    </div>
                                    <div class="botStatus">
                                        ${tradeBotStatusComponent}
                                    </div>
                                </div>
                                <div class="profitChart">
                                    ${profitChartComponent}
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
                minPeriod: "1mm",
                equalSpacing: true,
                groupToPeriods: ['1mm'],
            },

            mouseWheelZoomEnabled: true,

            glueToTheEnd: true,

            panels: [{
                title: "Price",
                showCategoryAxis: true,
                percentHeight: 80,

                categoryAxis: {
                    parseDates: true,
                    minPeriod: "1mm"
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
                    showBalloon: true,
                    columnWidth: 0.6,
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
                    fillAlphas: false,
                    columnWidth: 0.6,
                }],

                stockLegend: {
                    markerType: "none",
                    markerSize: 0,
                    labelText: "",
                },
            }],

            panelsSettings: {
                usePrefixes: false,
                marginLeft: 70,
                marginTop: 10,
                marginBottom: 10,
            },

            valueAxesSettings: {
                inside: false,
                showLastLabel: true,
            },

            chartScrollbarSettings: {
                enabled: false
            },

            chartCursorSettings: {
                pan: true,
                valueLineEnabled: true,
                valueLineBalloonEnabled: true
            },
        });

        // DataSet Period Object
        let dataSetPeriod = {
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
        const stockDataUrl = serverUrl + '/candle?exchange=bithumb&coin=btc&period=1m&count=100';

        $.getJSON(stockDataUrl, function () {
            console.log('Success Load Stock Data');
        }).done(function (data) {
            var stockData = [];

            $.each(data, function (index) {
                stockData.unshift(data[index]);
            });

            liveChart.dataSets[0].dataProvider = stockData;
            liveChart.validateData();
        });

        // Get new data and update chart periodically.
        let updateData = function (chart, index) {
            //get data
            //const updateDataUrl = serverUrl + '/candle?exchange=bithumb&coin=btc&period=1m&count=1';
            const updateDataUrl = serverUrl + '/candle?exchange=bithumb&coin=btc&period=1m&count=1';

            $.getJSON(updateDataUrl, function () {
                console.log('Success Load New Stock Data');
            }).done(function (data) {
                //var newData = data['candles'][0];

                //add data
                chart.dataSets[index].dataProvider.push(data);
                chart.validateData();

                console.log(chart);
            });
        };

        console.log(liveChart);

        let liveInterval = setInterval(function () {
            updateData(liveChart, 0);
        }, 60 * 1000);
    }

    function setProfitChartComponent() {
        var chart = AmCharts.makeChart("profitChart", {
            "type": "serial",
            "theme": "light",
            "marginTop": 10,
            "marginRight": 20,
            "dataProvider": [{
                "year": "1950",
                "value": -0.307
            }, {
                "year": "1951",
                "value": -0.168
            }, {
                "year": "1952",
                "value": -0.073
            }, {
                "year": "1953",
                "value": -0.027
            }, {
                "year": "1954",
                "value": -0.251
            }, {
                "year": "1955",
                "value": -0.281
            }, {
                "year": "1956",
                "value": -0.348
            }, {
                "year": "1957",
                "value": -0.074
            }, {
                "year": "1958",
                "value": -0.011
            }, {
                "year": "1959",
                "value": -0.074
            }, {
                "year": "1960",
                "value": -0.124
            }, {
                "year": "1961",
                "value": -0.024
            }, {
                "year": "1962",
                "value": -0.022
            }, {
                "year": "1963",
                "value": 0
            }, {
                "year": "1964",
                "value": -0.296
            }, {
                "year": "1965",
                "value": -0.217
            }, {
                "year": "1966",
                "value": -0.147
            }, {
                "year": "1967",
                "value": -0.15
            }, {
                "year": "1968",
                "value": -0.16
            }, {
                "year": "1969",
                "value": -0.011
            }, {
                "year": "1970",
                "value": -0.068
            }, {
                "year": "1971",
                "value": -0.19
            }, {
                "year": "1972",
                "value": -0.056
            }, {
                "year": "1973",
                "value": 0.077
            }, {
                "year": "1974",
                "value": -0.213
            }, {
                "year": "1975",
                "value": -0.17
            }, {
                "year": "1976",
                "value": -0.254
            }, {
                "year": "1977",
                "value": 0.019
            }, {
                "year": "1978",
                "value": -0.063
            }, {
                "year": "1979",
                "value": 0.05
            }, {
                "year": "1980",
                "value": 0.077
            }, {
                "year": "1981",
                "value": 0.12
            }, {
                "year": "1982",
                "value": 0.011
            }, {
                "year": "1983",
                "value": 0.177
            }, {
                "year": "1984",
                "value": -0.021
            }, {
                "year": "1985",
                "value": -0.037
            }, {
                "year": "1986",
                "value": 0.03
            }, {
                "year": "1987",
                "value": 0.179
            }, {
                "year": "1988",
                "value": 0.18
            }, {
                "year": "1989",
                "value": 0.104
            }, {
                "year": "1990",
                "value": 0.255
            }, {
                "year": "1991",
                "value": 0.21
            }, {
                "year": "1992",
                "value": 0.065
            }, {
                "year": "1993",
                "value": 0.11
            }, {
                "year": "1994",
                "value": 0.172
            }, {
                "year": "1995",
                "value": 0.269
            }, {
                "year": "1996",
                "value": 0.141
            }, {
                "year": "1997",
                "value": 0.353
            }, {
                "year": "1998",
                "value": 0.548
            }, {
                "year": "1999",
                "value": 0.298
            }, {
                "year": "2000",
                "value": 0.267
            }, {
                "year": "2001",
                "value": 0.411
            }, {
                "year": "2002",
                "value": 0.462
            }, {
                "year": "2003",
                "value": 0.47
            }, {
                "year": "2004",
                "value": 0.445
            }, {
                "year": "2005",
                "value": 0.47
            }],
            "valueAxes": [{
                "axisAlpha": 0,
                "position": "left"
            }],
            "graphs": [{
                "id": "g1",
                "lineColor": "#d1655d",
                "lineThickness": 2,
                "negativeLineColor": "#637bb6",
                "type": "smoothedLine",
                "valueField": "value"
            }],
            "chartCursor": {
                "categoryBalloonDateFormat": "YYYY",
                "cursorAlpha": 0,
                "valueLineEnabled": true,
                "valueLineBalloonEnabled": true,
                "valueLineAlpha": 0.5,
                "fullWidth": true
            },
            "dataDateFormat": "YYYY",
            "categoryField": "year",
            "categoryAxis": {
                "minPeriod": "YYYY",
                "parseDates": true,
            },
        });
    }

    function drawBotReportComponent(selectedIndex, tradeHistory) {
        //Load Bot Data.
        const loadBotUrl = serverUrl + '/bot';

        $.getJSON(loadBotUrl, function (result) {
            let botVerticalListComponent = makeBotVerticalListComponent(selectedIndex, result);
            let tradeResultComponent = makeTradeResultComponent(tradeHistory);

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

            const $content = $('div.content');
            $content.empty();

            $content.append(tradeComponent);

            setTradeChartComponent();
            setProfitChartComponent();
        });
    }

    function addComma(value) {
        return Number(value).toLocaleString('en');
    }
});