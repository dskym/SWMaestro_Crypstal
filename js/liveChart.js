$(function () {
    var server_url = 'http://crypstal-env.7xcrjvhg9m.ap-northeast-2.elasticbeanstalk.com/v1/chart/candles/minutes/5';

    var liveChart = AmCharts.makeChart("liveChart", {
        type: "stock",
        theme: "light",

        dataSets: [{
            fieldMappings: [{
                fromField: "openingPrice",
                toField: "open"
            }, {
                fromField: "tradePrice",
                toField: "close"
            }, {
                fromField: "highPrice",
                toField: "high"
            }, {
                fromField: "lowPrice",
                toField: "low"
            }, {
                fromField: "candleAccTradeVolume",
                toField: "volume"
            }],
            dataLoader: {
                url: server_url,
                format: 'json',
            },
            categoryField: "candleDateTimeKST"
        }],

        valueAxesSettings: {
            minPeriod: "mm",
            equalSpacing: true,
        },

        categoryAxesSettings: {
            minPeriod: "mm",
            equalSpacing: true,
        },

        mouseWheelZoomEnabled: true,

        glueToTheEnd: true,

        panels: [{
            title: "Price",
            showCategoryAxis: true,
            percentHeight: 80,
            valueAxes: [{
                id: "v1",
                dashLength: 5
            }],

            categoryAxis: {
                minPeriod: "mm",
                dashLength: 5
            },

            stockGraphs: [{
                title: 'BTC',
                type: "candlestick",
                id: "g1",
                balloonText: "Open:<b>[[open]]</b><br>Low:<b>[[low]]</b><br>High:<b>[[high]]</b><br>Close:<b>[[close]]</b><br>Volume:<b>[[value]]</b><br>",
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
                valueTextRegular: undefined,
                periodValueTextComparing: "[[percents.value.close]]%"
            }
        },
            {
                title: "Volume",
                percentHeight: 20,
                marginTop: 1,
                showCategoryAxis: true,
                valueAxes: [{
                    id: "v3",
                    dashLength: 5
                }],

                categoryAxis: {
                    dashLength: 5
                },

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
                    periodValueTextRegular: "[[value.close]]"
                }
            }
        ],

        chartScrollbarSettings: {
            graph: "g1",
            graphType: "line",
            usePeriod: "mm"
        },

        chartCursorSettings: {
            valueLineBalloonEnabled: true,
            valueLineEnabled: true,
            valueBalloonsEnabled: true
        },

        panelsSettings: {
            "usePrefixes": true
        },

        periodSelector: {
            dateFormat: "YYYY-MM-DD HH:NN",
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
            selectFromStart: true
        },

        listeners: [
            {
                'event': 'dataUpdated',
                'method': function () {
                    console.log('data updated');
                }
            },
            {
                'event': 'zoomed',
                'method': function () {
                    console.log('zoomed');
                }
            }
        ]
    });
});