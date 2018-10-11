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
    * Todo
    * Connect to chatting bot.
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

    //botSettingInfo.botalarm = $('.bot-list #bot-alarm').is(":checked");
    //botSettingInfo.autotrade = $('.bot-list #auto-trade').is(":checked");

    /*
    * If user want to save current bot status or start bot, this function is called.
    * And, send data to server.
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
