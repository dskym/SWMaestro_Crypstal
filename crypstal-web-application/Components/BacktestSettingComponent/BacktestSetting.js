$(function () {
    "use strict";

    /*
    * If user want to backtest using current bot setting, user press this button.
    */
    $(document).on('click', 'div.bot-list-component .backtest', function (event) {
        event.stopPropagation();

        $('#modal-backtest-setting').modal();
    });

    /*
    * Backtest Modal Initial Setting.
    */
    $('#modal-backtest-setting').on('show.bs.modal', function() {
        $('#backtest-date').daterangepicker({
            startDate: moment().subtract(1, 'months').format("YYYY/MM/DD"),
            endDate  : moment(),
            autoclose: true,
            locale: {
                format: 'YYYY/MM/DD'
            }
        });

        $('div.daterangepicker').css("z-index", "9999");
    });

    /*
    * Reset Backtest Modal.
    */
    $('#modal-backtest-setting').on('hide.bs.modal', function() {
        var backtestSetting = $('#modal-backtest-setting');

        $('div.daterangepicker').find('input[name="daterangepicker_start"]').val('');
        $('div.daterangepicker').find('input[name="daterangepicker_end"]').val('');

        backtestSetting.find('.backtest-amount').find('input[name="backtest-amount"]').val('');
        backtestSetting.find('.backtest-fee').find('input[name="backtest-fee"]').val('');
        backtestSetting.find('.backtest-slippage').find('input[name="backtest-slippage"]').val('');
    });

    /*
    * User set some data to do backtest.
    * Then, send data to server.
    */
    $(document).on('click', '#modal-backtest-setting button[type="submit"]', function () {
        //backtest information object.
        var backtestSettingInfo = new Object();

        //set start date.
        var startDate = $('div.daterangepicker').find('input[name="daterangepicker_start"]').val();

        if(startDate === "")
            backtestSettingInfo.from = moment().subtract(1, 'months').format("YYYY-MM-DD");
        else
            backtestSettingInfo.from = startDate;

        //set end date.
        var endDate = $('div.daterangepicker').find('input[name="daterangepicker_end"]').val();

        if(endDate === "")
            backtestSettingInfo.to = moment().format("YYYY-MM-DD");
        else
            backtestSettingInfo.to = endDate;

        //set amount.
        var amount = $('input[name="backtest-amount"]').val();

        if (amount !== "")
            backtestSettingInfo.asset = parseInt(amount);
        else
            backtestSettingInfo.asset = parseInt($('input[name="backtest-amount"]').attr('placeholder'));

        //set fee.
        var fee = $('input[name="backtest-fee"]').val();

        if (fee !== "")
            backtestSettingInfo.fee = fee * 0.01;
        else
            backtestSettingInfo.fee = $('input[name="backtest-fee"]').attr('placeholder') * 0.01;

        //set slippage.
        var slippage = $('input[name="backtest-slippage"]').val();

        if (slippage !== "")
            backtestSettingInfo.slippage = slippage * 0.01;
        else
            backtestSettingInfo.slippage = $('input[name="backtest-slippage"]').attr('placeholder') * 0.01;

        //setting Strategy

        //send data to server.
        console.log(backtestSettingInfo);

        /*
         * Send backtest request to server.
         */
        //get bot id
        var $botList = $('div.bot-list');
        var $botTab = $botList.find('ul.bot-tab');
        var $botActiveTab = $botTab.find('.active').closest('li');

        //var botId = $botActiveTab.data('botId');

        var query = $.param(backtestSettingInfo);

        var backtestUrl = baseUrl + '/v1/bots/1/backtest?' + query;

        console.log(backtestUrl);

        $.getJSON(backtestUrl, function() {
        }).done(function (backtestResponse) {
            //Convert Backtest UI
            var $botContent = $('div.bot-content');
            var $botContentTab = $botContent.find('ul.content-tab');
            var $botContentDetail = $botContent.find('.content-detail');

            var $botActiveContentTab = $botContentTab.find('.active');
            $botActiveContentTab.removeClass('active').removeClass('show');
            $botContentTab.find('a[href="#info"]').addClass('active').addClass('show');

            var $botActiveContentDetail = $botContentDetail.find('.active');
            $botActiveContentDetail.removeClass('active').removeClass('show');
            $botContentDetail.find('#info').addClass('active').addClass('show');

            //send event.
            $('div.content').trigger('backtest', backtestResponse);

            $('#modal-backtest-setting').modal('hide');
        });
    });
});