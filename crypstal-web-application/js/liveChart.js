$(function () {
    "use strict";

    // Live Chart Setting.
    var liveChart = AmCharts.makeChart("liveChart", {
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
    });

    // DataSet Period Object
    var dataSetPeriod = {
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
    $.each(dataSetPeriod, function(key, value) {
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

        $.each(dataSetPeriod, function(key, value) {
            if(period === key)
                data = value;
        });

        var stockDataUrl = 'https://api.upbit.com/v1/candles/minutes/3?market=KRW-BTC&count=200';

        //var stockDataUrl = chartUrl;

        $.getJSON(stockDataUrl, function () {
            console.log('Success Load Stock Data');
        }).done(function (tempData) {
            var stockData = [];

            $.each(tempData, function(index) {
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
        var liveInterval = setInterval(function() { updateData(event.chart, data.dataSetIndex); }, data.interval * 1000);
    }

    // Load initial data.
    //var stockDataUrl = 'https://api.upbit.com/v1/candles/minutes/1?market=KRW-BTC&count=200';
    var stockDataUrl = 'http://crypstal.ap-northeast-2.elasticbeanstalk.com/v1/chart/candles/seconds/10?symbol=bithumbBTC&count=200';

    $.getJSON(stockDataUrl, function () {
        console.log('Success Load Stock Data');
    }).done(function (data) {
        var stockData = [];

        $.each(data['candles'], function(index) {
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
    var updateData = function(chart, index) {
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

    var liveInterval = setInterval(function() { updateData(liveChart, 0); }, 10 * 1000);
});