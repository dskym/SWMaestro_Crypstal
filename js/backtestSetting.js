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

        //send data to server.
        console.log(backtestSettingInfo);
    });
});