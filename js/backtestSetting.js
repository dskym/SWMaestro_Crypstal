$(function () {
    "use strict";

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

        if (amount !== "")
            backtestSettingInfo.amount = parseInt(amount);
        else
            backtestSettingInfo.amount = parseInt($('input[name="backtest-amount"]').attr('placeholder'));


        var fee = $('input[name="backtest-fee"]').val();

        if (fee !== "")
            backtestSettingInfo.fee = fee * 0.01;
        else
            backtestSettingInfo.fee = $('input[name="backtest-fee"]').attr('placeholder') * 0.01;


        var slippage = $('input[name="backtest-slippage"]').val();

        if (slippage !== "")
            backtestSettingInfo.slippage = slippage * 0.01;
        else
            backtestSettingInfo.slippage = $('input[name="backtest-slippage"]').attr('placeholder') * 0.01;

        //setting Strategy

        //send data to server.
        console.log(backtestSettingInfo);

        //send event.
        $('div.bot-info').trigger('backtest', 'Backtest Result Object');

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

        $('#modal-backtest-setting').modal('hide');
    });
});
