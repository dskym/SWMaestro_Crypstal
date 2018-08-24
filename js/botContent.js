$(function () {
    "use strict";

    /*
    * If bot status is changed, save current bot status button is appeared.
    */
    $(document).on('change', '.bot-data', function () {
        console.log('Save current bot status.');

        $('.box-save').css('display', 'block');
    });

    /*
    * If user want to change asset assigned to bot, click asset area.
    * Appear asset setting modal.
    */
    $(document).on('click', 'div.asset', function () {
        console.log('Change Bot Asset');

        $('#modal-asset').modal();
    });

    /*
    * If user decide to asset assigned to bot, user press submit button.
    * Then, send change request to server.
    */
    $(document).on('click', '#modal-asset button[type="submit"]', function () {
        var newAsset = $('input[name="asset"]').val();

        var $asset = $('div.bot-list').find('div.tab-pane.active').find('.asset').find('label');
        $asset.text(Number(newAsset).toLocaleString('en')+' KRW');

        //send change request to server.

        $('.box-save').css('display', 'block');
        $('#modal-asset').modal('hide');
    });

    /*
    * If user want to set trading strategy, click setting area.
    */
    $(document).on('click', '.strategy-setting', function () {

        $('#modal-bot-step').modal();
    });

    /*
    * Need to thinking more.
    */
    $(document).on('click', '.order-quantity', function () {
        var coinName = $('#bot-coin option:selected').val();

        $('#modal-order-quantity .order-quantity-coin').text(coinName);

        $('input[name="buy-krw"]').attr('placeholder', '100,000 KRW');
        $('input[name="sell-krw"]').attr('placeholder', '100,000 KRW');
        $('input[name="buy-coin"]').attr('placeholder', '1.1 ' + coinName);
        $('input[name="sell-coin"]').attr('placeholder', '1.1 ' + coinName);

        $('#modal-order-quantity').modal();
    });

    /*
    * If user decide to order quantit data to set, user press submit button.
    * Then, send data to server. and change bot status.
    */
    $(document).on('click', '#modal-order-quantity button[type="submit"]', function () {
        var coinName = $('#bot-coin option:selected').val();
        var $orderQuantity = $('div.bot-list').find('div.tab-pane.active').find('div.order-quantity');

        //setting buy part.
        $('.buy li').each( function (index) {
            var selectedTab = $(this).children().hasClass('active');

            if(selectedTab === true && index === 0) {
                $orderQuantity.find('.order-quantity-buy').text('100% (All-in)');
            }
            else if(selectedTab === true && index === 1) {
                var buykrw = $('input[name="buy-krw"]').val();

                $orderQuantity.find('.order-quantity-buy').text(Number(buykrw).toLocaleString('en') + ' KRW');
            }
            else if(selectedTab === true && index === 2) {
                var buycoin = $('input[name="buy-coin"]').val();

                $orderQuantity.find('.order-quantity-buy').text(Number(buycoin).toLocaleString('en') + ' ' + coinName);
            }
        });

        //setting sell part.
        $('.sell li').each( function (index) {
            var selectedtab = $(this).children().hasClass('active');

            if(selectedtab === true && index === 0) {
                $orderQuantity.find('.order-quantity-sell').text('100% (All-in)');
            }
            else if(selectedtab === true && index === 1) {
                var sellkrw = $('input[name="sell-krw"]').val();

                $orderQuantity.find('.order-quantity-sell').text(Number(sellkrw).toLocaleString('en') + ' KRW');
            }
            else if(selectedtab === true && index === 2) {
                var sellcoin = $('input[name="sell-coin"]').val();

                $orderQuantity.find('.order-quantity-sell').text(Number(sellcoin).toLocaleString('en') + ' ' + coinName);
            }
        });

        //appear to bot status save button.
        $('.box-save').css('display', 'block');

        $('#modal-order-quantity').modal('hide');
    });

    /*
    * Need to thinking more.
    */
    $(document).on('click', '.safety', function () {
        $('#modal-safety').modal();
    });

    /*
    * Todo
    * Connect to chatbot system.
    */
    $(document).on('click', '.bot-list #bot-alarm', function () {
        console.log($('.bot-list #bot-alarm').is(":checked"));
    });

    /*
    * Todo
    * Connect to server.
    */
    $(document).on('click', '.bot-list #auto-trade', function () {
        console.log($('.bot-list #auto-trade').is(":checked"));
    });

    /*
    * Save current bot status.
    */
    $(document).on('click', '.bot-list .save-bot-setting', function () {
        saveBotSetting();
    });

    /*
    * If user want to backtest using current bot setting, user press this button.
    */
    $(document).on('click', '.bot-list .backtest', function () {
        $('#backtest-date').daterangepicker({
            startDate: moment().subtract(6, 'months'),
            endDate  : moment(),
            autoclose: true
        });

        $('div.daterangepicker').css("z-index", "9999");

        $('#modal-backtest-setting').modal();
    });

    /*
    * User set some data to do backtest.
    * Then, send data to server.
    */
    $(document).on('click', '#modal-backtest-setting button[type="submit"]', function () {
        //backtest information object.
        var backtestSettingInfo = new Object();

        backtestSettingInfo.startDate = $('div.daterangepicker').find('input[name="daterangepicker_start"]').val();
        backtestSettingInfo.endDate = $('div.daterangepicker').find('input[name="daterangepicker_end"]').val();

        var amount = $('input[name="backtest-amount"]').val();

        if(amount !== "")
            backtestSettingInfo.amount = parseInt(amount);
        else
            backtestSettingInfo.amount = parseInt($('input[name="backtest-amount"]').attr('placeholder'));


        var fee = $('input[name="backtest-fee"]').val();

        if(fee !== "")
            backtestSettingInfo.fee = fee * 0.01;
        else
            backtestSettingInfo.fee = $('input[name="backtest-fee"]').attr('placeholder') * 0.01;


        var slippage = $('input[name="backtest-slippage"]').val();

        if(slippage !== "")
            backtestSettingInfo.slippage = slippage * 0.01;
        else
            backtestSettingInfo.slippage = $('input[name="backtest-slippage"]').attr('placeholder') * 0.01;

        //send data to server.
        console.log(backtestSettingInfo);
    });

    /*
    * If user want to start bot trading, user press this button.
    * And, save current bot status.
    */
    $(document).on('click', '.bot-list .bot-start', function () {
        saveBotSetting();
    });

    /*
    * If user want to save current bot status or start bot, this function is called.
    * And, send data to server.
    */

    /**
     *     {
        "name": "승윤봇",
        "cryptoCurrency": "BTC",
        "exchange": "UPBIT",
        "buyStrategy": [],
        "sellStrategy": [],
        "buyStrategyThreshold": 3,
        "sellStrategyThreshold": 3,
        "tradingPeriod": 5,
        "asset": 1000000.0,
        "signalAlarm": true,
        "autoTrading": false,
        "creationTime": "2018-08-21T06:45:46.009"
    },

     */
    function saveBotSetting() {
        var $currentBot = $('div.bot-list').find('div.bot-tab-content').find('.active').find('div.bot');

        //send data to server.
        $.each(botListData, function(index, bot) {
            //나중에 봇ID 로 비교
            if(bot['name'] === $currentBot.find('h4').text()) {
                bot['name'] = $currentBot.find('h4').text();
                bot['exchange'] = $currentBot.find('#bot-exchange option:selected').val();
                bot['cryptoCurrency'] = $currentBot.find('#bot-coin option:selected').val();
                bot['tradingPeriod'] = $currentBot.find('#bot-period option:selected').val();
                bot['signalAlarm'] = $currentBot.find('#bot-alarm').is(":checked");
                bot['autoTrading'] = $currentBot.find('#auto-trade').is(":checked");
                bot['asset'] = $currentBot.find('.asset').find('label').text();
            }
        });

        //여기서 전략 값을 최종 저장해야 할까? 아니면 전략 설정 후 적용을 누르면 바로 저장하도록 해야 할까...
        //botSettingInfo.strategyInfo = ;
        //botSettingInfo.additionalInfo = ;

        console.log(botListData);
        console.log('Save Current Bot Status');
    }
});
