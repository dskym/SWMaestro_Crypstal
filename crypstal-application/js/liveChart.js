$(function () {
    "use strict";

    $.getJSON(chartUrl, function () {
        console.log('Success Load Chart Data');
    }).done(function (tempData) {
        console.log(tempData);

        var stockData = [];

        $.each(tempData['candles'], function(index) {
            stockData.unshift(tempData['candles'][index]);
        });

        injectStockData(stockData);
    });

    /*
    var tempUrl = 'https://api.upbit.com/v1/candles/minutes/5?market=KRW-BTC&count=200';

    $.getJSON(tempUrl, function () {
        console.log('Success Load Chart Data');
    }).done(function (tempData) {

        var stockData = [];

        $.each(tempData, function(index) {
            var len = tempData.length;

            stockData.push({
                'time': tempData[len - index - 1]['candle_date_time_kst'],
                'open': tempData[len - index - 1]['opening_price'],
                'close': tempData[len - index - 1]['trade_price'],
                'high': tempData[len - index - 1]['high_price'],
                'low': tempData[len - index - 1]['low_price'],
                'volume': tempData[len - index - 1]['candle_acc_trade_volume']
            });
        });
        injectStockData(stockData);
    });
    */

    function injectStockData(stockData) {
        var liveChart = AmCharts.makeChart("liveChart", {
            type: "stock",
            theme: "light",

            autoDisplay: true,

            dataSets: [{
                showInCompare: false,
                title: '5m',
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
                /*
                dataLoader: {
                    url: chartUrl,
                    format: 'json',
                    init: function (data) {
                        console.log(data);
                    }
                },
                */
                dataProvider: stockData,
                categoryField: "time"
            }/*
        , {
            showInCompare: false,
            fieldMappings: [{
                showInCompare: false,
                fromField : 'hi',
                toField : 'op'
            }],
            dataProvider: temp,
            categoryField: "candleDateTimeKST"
        }*/],

            dataSetSelector: {
                position: 'bottom',
                selectText: 'Period ',
                listeners: [{
                    'event': 'dataSetSelected',
                    'method': function (event) {
                        console.log(event);
                    }
                }]
            },

            categoryAxesSettings: {
                minPeriod: "5mm",
                equalSpacing: true,
                groupToPeriods: ['5mm', '15mm', '30mm', '1hh', '2hh']
            },

            mouseWheelZoomEnabled: true,

            glueToTheEnd: true,

            panels: [{
                title: "Price",
                showCategoryAxis: true,
                percentHeight: 80,

                categoryAxis: {
                    parseDates: true,
                    minPeriod: "mm"
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
                    showBalloon: true
                }/*, {
                title: 'MA Double',
                type: "line",
                id: "g2",
                valueField: "open",
                lineColor: "#000000",
            }*/],

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

            panelsSettings: {
                "usePrefixes": false
            },

            /*
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

            periodSelector: {
                periodsText: 'Period : ',
                dateFormat: "YYYY-MM-DD HH:NN:SS",
                inputFieldWidth: 150,
                position: "bottom",
                periods: [{
                    period: "mm",
                    count: 5,
                    label: "5 min"
                }, {
                    period: "mm",
                    count: 15,
                    label: "15 min"
                }, {
                    period: "mm",
                    count: 30,
                    label: "30 min"
                }, {
                    period: "hh",
                    count: 1,
                    label: "1 hour"
                }, {
                    period: "hh",
                    count: 2,
                    label: "2 hour"
                }, {
                    period: "MAX",
                    label: "MAX",
                    selected: true
                }],
                selectFromStart: false,
                listeners: [
                    {
                        'event' : 'changed',
                        'method' : periodChangeEvent
                    }
                ]
            },
            */

            listeners: [
                {
                    'event': 'dataUpdated',
                    'method': function () {
                    }
                }, {
                    'event': 'zoomed',
                    'method': function () {
                    }
                }
            ]
        });
    }
});

var periodChangeEvent = function (event) {
    console.log('Period Event');
    console.log(event);
};