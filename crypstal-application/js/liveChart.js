$(function () {
    "use strict";

    //Live Chart Setting
    var liveChart = AmCharts.makeChart("liveChart", {
        type: "stock",
        theme: "light",

        autoDisplay: true,

        dataSets: [],

        dataSetSelector: {
            position: 'bottom',
            selectText: 'Period '
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

        listeners: [
            {
                'event' : 'rendered',
                'method' : function(event) {
                    var chart = event.chart;

                    chart.dataSetSelector.addListener("dataSetSelected", setStockData);
                }
            }
        ]
    });

    /*
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
    */

    var dataSetPeriod = ['1m', '3m'];

    $.each(dataSetPeriod, function(index) {
        liveChart.dataSets.push({
            showInCompare: false,
            title: dataSetPeriod[index],
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

    /*
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
    */

    function setStockData(event) {
        var period = event.dataSet.title;

        /*
        var data;

        $.each(dataSetPeriod, function(key, value) {
            if(period === key)
                data = value;
        });
        */

        var num = 0;
        var index = -1;

        if(period === '1m') {
            num = 1;
            index = 0;
        }
        else if(period === '3m') {
            num = 3;
            index = 1;
        }

        var stockDataUrl = 'https://api.upbit.com/v1/candles/minutes/' + num + '?market=KRW-BTC&count=200';

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

            event.chart.dataSets[index].dataProvider = stockData;
            event.chart.validateData();
        });

        clearInterval(live);
        var live = setInterval(function() { timer(event.chart, index); }, num * 1000);
    }


    // init data load
    var stockDataUrl = 'https://api.upbit.com/v1/candles/minutes/1?market=KRW-BTC&count=200';

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

        liveChart.dataSets[0].dataProvider = stockData;
        liveChart.validateData();
    });

    // get new data and validate
    var timer = function(chart, index) {
        //get data
        var newData = {
            'time': moment(),
            'open': Math.round(Math.random() * 10000) + 7240000,
            'close': Math.round(Math.random() * 10000) + 7240000,
            'high': Math.round(Math.random() * 10000) + 7240000,
            'low': Math.round(Math.random() * 10000) + 7240000,
            'volume': Math.round(Math.random() * 10)
        };

        //add data
        chart.dataSets[index].dataProvider.push(newData);
        chart.validateData();
    };

    console.log(liveChart);

    var live = setInterval(function() { timer(liveChart, 0); }, 1000);
});