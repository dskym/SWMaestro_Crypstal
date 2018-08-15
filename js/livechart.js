var chartData = [];

generateChartData();

function generateChartData() {
    var firstDate = new Date();
    firstDate.setHours(0, 0, 0, 0);
    firstDate.setDate(firstDate.getDate() - 2000);

    for (var i = 0; i < 2000; i++) {
        var newDate = new Date(firstDate);

        newDate.setDate(newDate.getDate() + i);


        if(i===0) {
            var open = Math.round(Math.random() * (10000) );
        } else {
            var open = close;
        }


        var close = open + Math.round(Math.random() * (15) - Math.random() * 10);

        var low;
        if (open < close) {
            low = open - Math.round(Math.random() * 5);
        } else {
            low = close - Math.round(Math.random() * 5);
        }

        var high;
        if (open < close) {
            high = close + Math.round(Math.random() * 5);
        } else {
            high = open + Math.round(Math.random() * 5);
        }

        var volume = Math.round(Math.random() * (1000 + i)) + 100 + i;

        chartData[i] = ({
            date: newDate,
            open: open,
            close: close,
            high: high,
            low: low,
            volume: volume,
        });
    }
}

var chart = AmCharts.makeChart( "chartdiv1", {
    type: "stock",
    theme: "light",
    dataSets: [ {

        fieldMappings: [ {
            fromField: "open",
            toField: "open"
        },{
            fromField: "close",
            toField: "close"
        },{
            fromField: "high",
            toField: "high"
        },{
            fromField: "low",
            toField: "low"
        },{
            fromField: "volume",
            toField: "volume"
        } ],
        color: "#7f8da9",
        dataProvider: chartData,
        categoryField: "date"
    }],


    categoryAxesSettings: {
        equalSpacing : true,
    },

    mouseWheelZoomEnabled: true,

    panels: [ {
        title: "Price",
        showCategoryAxis: false,
        percentHeight: 70,
        valueAxes: [ {
            id: "v1",
            dashLength: 5
        } ],

        categoryAxis: {
            dashLength: 5
        },

        stockGraphs: [ {
            title: 'BTC',
            type: "candlestick",
            id: "g1",
            balloonText: "Open:<b>[[open]]</b><br>Low:<b>[[low]]</b><br>High:<b>[[high]]</b><br>Close:<b>[[close]]</b><br>Volume:<b>[[volume]]</b><br>",
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
            percentHeight: 30,
            marginTop: 1,
            showCategoryAxis: true,
            valueAxes: [ {
                id: "v3",
                dashLength: 5
            } ],

            categoryAxis: {
                dashLength: 5
            },

            stockGraphs: [ {
                valueField: "volume",
                type: "column",
                useDataSetColors: false,
                lineColor: "#2B4073",
                balloonText: "Volume<br><b><span style='font-size:14px;'>value: [[value]]</span></b>",
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
        usePeriod: "DD"
    },

    chartCursorSettings: {
        valueLineBalloonEnabled: true,
        valueLineEnabled: true,
        valueBalloonsEnabled:true
    },

    periodSelector: {
        position: "bottom",
        periods: [ {
            period: "DD",
            count: 10,
            label: "10 days"
        }, {
            period: "MM",
            count: 1,
            selected: true,
            label: "1 month"
        }, {
            period: "4MM",
            count: 4,
            label: "4 month"
        },{
            period: "MM",
            count: 6,
            label: "6 month"
        },{
            period: "YYYY",
            count: 1,
            label: "1 year"
        }, {
            period: "YTD",
            label: "YTD"
        }, {
            period: "MAX",
            label: "MAX"
        } ]
    },

    listeners : [
            {
            'event':'init',
            'method' : function() {
                console.log('init')

                url = 'https://api.upbit.com/v1/candles/minutes/5?market=KRW-BTC&count=200'

                $.getJSON(url).done(function (e) {
                    console.log(e)
                });
            }}, {
            'event' : 'dataUpdated',
            'method' : function() {
                console.log('data updated')
            }}, {
            'event' : 'zoomed',
            'method' : function() {
                console.log('zoomed')
            }}
        ]
});


var demo5 = function() {
    var chartData = [];
    generateChartData();

    function generateChartData() {
        var firstDate = new Date();
        firstDate.setHours(0, 0, 0, 0);
        firstDate.setDate(firstDate.getDate() - 2000);

        for (var i = 0; i < 2000; i++) {
            var newDate = new Date(firstDate);

            newDate.setDate(newDate.getDate() + i);

            var open = Math.round(Math.random() * (30) + 100);
            var close = open + Math.round(Math.random() * (15) - Math.random() * 10);

            var low;
            if (open < close) {
                low = open - Math.round(Math.random() * 5);
            } else {
                low = close - Math.round(Math.random() * 5);
            }

            var high;
            if (open < close) {
                high = close + Math.round(Math.random() * 5);
            } else {
                high = open + Math.round(Math.random() * 5);
            }

            var volume = Math.round(Math.random() * (1000 + i)) + 100 + i;
            var value = Math.round(Math.random() * (30) + 100);

            chartData[i] = ({
                "date": newDate,
                "open": open,
                "close": close,
                "high": high,
                "low": low,
                "volume": volume,
                "value": value
            });
        }
    }

    var chart = AmCharts.makeChart("lion_amcharts_5", {
        "type": "stock",
        "theme": "light",
        "dataSets": [{
            "fieldMappings": [{
                "fromField": "open",
                "toField": "open"
            }, {
                "fromField": "close",
                "toField": "close"
            }, {
                "fromField": "high",
                "toField": "high"
            }, {
                "fromField": "low",
                "toField": "low"
            }, {
                "fromField": "volume",
                "toField": "volume"
            }, {
                "fromField": "value",
                "toField": "value"
            }],
            "color": "#7f8da9",
            "dataProvider": chartData,
            "title": "West Stock",
            "categoryField": "date"
        }, {
            "fieldMappings": [{
                "fromField": "value",
                "toField": "value"
            }],
            "color": "#fac314",
            "dataProvider": chartData,
            "compared": true,
            "title": "East Stock",
            "categoryField": "date"
        }],


        "panels": [{
            "title": "Value",
            "showCategoryAxis": false,
            "percentHeight": 70,
            "valueAxes": [{
                "id": "v1",
                "dashLength": 5
            }],

            "categoryAxis": {
                "dashLength": 5
            },

            "stockGraphs": [{
                "type": "candlestick",
                "id": "g1",
                "openField": "open",
                "closeField": "close",
                "highField": "high",
                "lowField": "low",
                "valueField": "close",
                "lineColor": "#7f8da9",
                "fillColors": "#7f8da9",
                "negativeLineColor": "#db4c3c",
                "negativeFillColors": "#db4c3c",
                "fillAlphas": 1,
                "useDataSetColors": false,
                "comparable": true,
                "compareField": "value",
                "showBalloon": false,
                "proCandlesticks": true
            }],

            "stockLegend": {
                "valueTextRegular": undefined,
                "periodValueTextComparing": "[[percents.value.close]]%"
            }
        },

            {
                "title": "Volume",
                "percentHeight": 30,
                "marginTop": 1,
                "showCategoryAxis": true,
                "valueAxes": [{
                    "dashLength": 5
                }],

                "categoryAxis": {
                    "dashLength": 5
                },

                "stockGraphs": [{
                    "valueField": "volume",
                    "type": "column",
                    "showBalloon": false,
                    "fillAlphas": 1
                }],

                "stockLegend": {
                    "markerType": "none",
                    "markerSize": 0,
                    "labelText": "",
                    "periodValueTextRegular": "[[value.close]]"
                }
            }
        ],

        "chartScrollbarSettings": {
            "graph": "g1",
            "graphType": "line",
            "usePeriod": "WW"
        },

        "chartCursorSettings": {
            "valueLineBalloonEnabled": true,
            "valueLineEnabled": true
        },

        "periodSelector": {
            "position": "bottom",
            "periods": [{
                "period": "DD",
                "count": 10,
                "label": "10 days"
            }, {
                "period": "MM",
                "selected": true,
                "count": 1,
                "label": "1 month"
            }, {
                "period": "YYYY",
                "count": 1,
                "label": "1 year"
            }, {
                "period": "YTD",
                "label": "YTD"
            }, {
                "period": "MAX",
                "label": "MAX"
            }]
        },
        "export": {
            "enabled": true
        }
    });
}

var demo2 = function() {
    var chartData = [];
    generateChartData();

    function generateChartData() {
        var firstDate = new Date(2012, 0, 1);
        firstDate.setDate(firstDate.getDate() - 500);
        firstDate.setHours(0, 0, 0, 0);

        for (var i = 0; i < 500; i++) {
            var newDate = new Date(firstDate);
            newDate.setDate(newDate.getDate() + i);

            var a = Math.round(Math.random() * (40 + i)) + 100 + i;
            var b = Math.round(Math.random() * 100000000);

            chartData.push({
                "date": newDate,
                "value": a,
                "volume": b
            });
        }
    }

    var chart = AmCharts.makeChart("lion_amcharts_2", {
        "type": "stock",
        "theme": "light",
        "dataSets": [{
            "color": "#b0de09",
            "fieldMappings": [{
                "fromField": "value",
                "toField": "value"
            }, {
                "fromField": "volume",
                "toField": "volume"
            }],
            "dataProvider": chartData,
            "categoryField": "date",
            // EVENTS
            "stockEvents": [{
                "date": new Date(2010, 8, 19),
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
            }]
        }],


        "panels": [{
            "title": "Value",
            "stockGraphs": [{
                "id": "g1",
                "valueField": "value"
            }],
            "stockLegend": {
                "valueTextRegular": " ",
                "markerType": "none"
            }
        }],

        "chartScrollbarSettings": {
            "graph": "g1"
        },

        "chartCursorSettings": {
            "valueBalloonsEnabled": true,
            "graphBulletSize": 1,
            "valueLineBalloonEnabled": true,
            "valueLineEnabled": true,
            "valueLineAlpha": 0.5
        },

        "periodSelector": {
            "periods": [{
                "period": "DD",
                "count": 10,
                "label": "10 days"
            }, {
                "period": "MM",
                "count": 1,
                "label": "1 month"
            }, {
                "period": "YYYY",
                "count": 1,
                "label": "1 year"
            }, {
                "period": "YTD",
                "label": "YTD"
            }, {
                "period": "MAX",
                "label": "MAX"
            }]
        },

        "panelsSettings": {
            "usePrefixes": true
        },
        "export": {
            "enabled": true
        }
    });
}

$(document).ready(function() {

});