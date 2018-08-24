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
