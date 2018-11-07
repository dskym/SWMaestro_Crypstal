$(function () {
    "use strict";

    $(document).on('change', 'div.strategy-selector', function () {
        const botStrategyName = $(this).find(":selected").val();
        let strategyComponent;

        switch (botStrategyName) {
            case 'HighLowStrategy':
                strategyComponent = makeHighLowStrategyComponent();
                break;
            case 'ReinforceLearningStrategy':
                strategyComponent = makeReinforceLearningStrategyComponent();
                break;
            default:
                break;
        }

        let $strategySetting = $('div.strategy-setting');
        $strategySetting.empty();
        $strategySetting.append(strategyComponent);

        if (botStrategyName === 'ReinforceLearningStrategy') {
            setStockChartComponent();

            //Date picker
            $('#startDate').datepicker({
                dateFormat: 'yy-mm-dd',
                changeMonth: true,
                changeYear: true,
                showMonthAfterYear: true ,
                minDate: '-2y',
            }).on('changeDate', function() {
                const date = moment($(this).val()).format('YYYY-MM-DD');

                $(this).val(date);
            }).on('show', function(event) {
                const date = moment($(this).val()).format('YYYY-MM-DD');

                $(this).val(date);

                event.stopPropagation();
            }).on('hide', function(event) {
                const date = moment($(this).val()).format('YYYY-MM-DD');

                $(this).val(date);

                event.stopPropagation();
            });

            $('#endDate').datepicker({
                dateFormat: 'yy-mm-dd',
                changeMonth: true,
                changeYear: true,
                showMonthAfterYear: true ,
                minDate: '-2y',
            }).on('changeDate', function() {
                const date = moment($(this).val()).format('YYYY-MM-DD');

                $(this).val(date);
            }).on('show', function(event) {
                const date = moment($(this).val()).format('YYYY-MM-DD');

                $(this).val(date);

                event.stopPropagation();
            }).on('hide', function(event) {
                const date = moment($(this).val()).format('YYYY-MM-DD');

                $(this).val(date);

                event.stopPropagation();
            });
        }
    });

    function makeHighLowStrategyComponent() {
        let content = `
            <div class="form-group">
                <label>구입 금액</label>
                <input class="form-control" type="text" placeholder="구입 금액을 입력해주세요." />
            </div>
            <div class="form-group">
                <label>판매 금액</label>
                <input class="form-control" type="text" placeholder="판매 금액을 입력해주세요"/>
            </div>
        `;

        return content;
    }

    function setDate(startDate, endDate) {
        const $startDate = $('#startDate');
        const $endDate = $('#endDate');

        $startDate.datepicker('setDate', new Date(startDate));
        $endDate.datepicker('setDate', new Date(endDate));

        $startDate.val(startDate);
        $endDate.val(endDate);
    }

    function setStockChartComponent() {
        // Stock Chart Setting.
        let stockChart = AmCharts.makeChart("stockChart", {
            type: "stock",
            theme: "light",

            autoDisplay: true,

            extendToFullPeriod: false,

            dataSets: [{
                showInCompare: false,
                title: 'Price',
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
            }],

            /*
            chartCursorSettings: {
                pan: true,
                selectWithoutZooming: true,
                categoryBalloonDateFormats: [{period:'DD', format:'YYYY-MM-DD'}]
            },
            */

            categoryAxesSettings: {
                minPeriod: "DD",
                equalSpacing: true,
                groupToPeriods: ['DD']
            },

            panels: [{
                title: "Price",
                showCategoryAxis: true,
                percentHeight: 80,

                categoryAxis: {
                    parseDates: true,
                    minPeriod: "1DD"
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
                    listeners: [
                        {
                            'event': 'selected',
                            'method': function(event) {
                                const startDate = moment(event.chart.chartData[event.startIndex].category).format('YYYY-MM-DD');
                                const endDate = moment(event.chart.chartData[event.endIndex].category).format('YYYY-MM-DD');

                                setDate(startDate, endDate);
                            }
                        }
                    ]
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
                usePrefixes: false
            },

            chartScrollbarSettings: {
                enabled: false
            }
        });

        // Load initial data.
        let stockDataUrl = 'https://api.upbit.com/v1/candles/days?market=KRW-BTC&count=200';

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

            stockChart.dataSets[0].dataProvider = stockData;
            stockChart.validateData();
        });

        console.log(stockChart);
    }

    function makeReinforceLearningStrategyComponent() {
        let content = `
            <div class="chart">
                <div id="stockChart" style="height: 360px;"></div>
            </div>
            
            <div class="form-group">
                <label>시작 날짜</label>

                <div class="input-group date">
                    <div class="input-group-addon">
                        <i class="fa fa-calendar" />
                    </div>
                    <input type="text" class="form-control pull-right" id="startDate" placeholder="2018-10-01">
                </div>
            </div>

            <div class="form-group">
                <label>종료 날짜</label>

                <div class="input-group date">
                    <div class="input-group-addon">
                        <i class="fa fa-calendar" />
                    </div>
                    <input type="text" class="form-control pull-right" id="endDate" placeholder="2018-11-01">
                </div>
            </div>
        `;

        return content;
    }
});