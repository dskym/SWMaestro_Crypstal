$(document).on('click', '.bot-data', function () {
    console.log('changed');
    $('.box-save').css('display', 'block');
});

$(document).on('click', '.asset', function () {
    console.log('changed asset');

    var $asset = $("div.bot-list").find('.tab-pane .active').find('asset');

    console.log($asset);

    $('#modal-asset').modal();
});

$(document).on('click', '#modal-asset button[type="submit"]', function () {
    var newAsset = $('input[name="asset"]').val();

    var $asset = $('div.bot-list').find('div.tab-pane.active').find('.asset').find('label');

    $asset.text(newAsset+' KRW');

    $('#modal-asset').modal('hide');
});

$(document).on('click', '.strategy-setting', function () {
    $('#bot-setting').modal();
});

$(document).on('click', '.order-quantity', function () {
    var coinname = $('#bot-coin option:selected').val();

    $('#modal-order-quantity .order-quantity-coin').text(coinname);

    $('input[name="buy-krw"]').attr('placeholder', '100,000 KRW');
    $('input[name="sell-krw"]').attr('placeholder', '100,000 KRW');
    $('input[name="buy-coin"]').attr('placeholder', '1.1 ' + coinname);
    $('input[name="sell-coin"]').attr('placeholder', '1.1 ' + coinname);

    $('#modal-order-quantity').modal();
});

$(document).on('click', '#modal-order-quantity button[type="submit"]', function () {
    var coinname = $('#bot-coin option:selected').val();

    console.log('Success Order Quantity');

    $('.buy li').each( function (index) {
        var selectedtab = $(this).children().hasClass('active');

        if(selectedtab === true && index === 0) {
            $('.order-quantity .order-quantity-buy').text('100% (All-in)');
        }
        else if(selectedtab === true && index === 1) {
            var buykrw = $('input[name="buy-krw"]').val();

            $('.order-quantity .order-quantity-buy').text(buykrw + ' KRW');
        }
        else if(selectedtab === true && index === 2) {
            var buycoin = $('input[name="buy-coin"]').val();

            $('.order-quantity .order-quantity-buy').text(buycoin + ' ' + coinname);
        }
    });

    $('.sell li').each( function (index) {
        var selectedtab = $(this).children().hasClass('active');

        if(selectedtab === true && index === 0) {
            $('.order-quantity .order-quantity-sell').text('100% (All-in)');
        }
        else if(selectedtab === true && index === 1) {
            var sellkrw = $('input[name="sell-krw"]').val();

            $('.order-quantity .order-quantity-sell').text(sellkrw + ' KRW');
        }
        else if(selectedtab === true && index === 2) {
            var sellcoin = $('input[name="sell-coin"]').val();

            $('.order-quantity .order-quantity-sell').text(sellcoin + ' ' + coinname);
        }
    });

    $('.box-save').css('display', 'block');

    $('#modal-order-quantity').modal('hide');
});

$(document).on('click', '.safety', function () {
    $('#modal-safety').modal();
});

$(document).on('click', '.bot-list #bot-alarm', function () {
    console.log($('.bot-list #bot-alarm').is(":checked"));
});

$(document).on('click', '.bot-list #auto-trade', function () {
    console.log($('.bot-list #auto-trade').is(":checked"));
});


$(document).on('click', '.bot-list .save-bot-setting', function () {
    console.log('save-bot-setting');
    saveBotSetting();
});

$(document).on('click', '.bot-list .backtest', function () {
    console.log('backtest');

    $('#modal-backtest-setting').modal();
});

$(document).on('click', '#modal-backtest-setting button[type="submit"]', function () {
    console.log('start backtest');

    var backtestSettingInfo = new Object();

    backtestSettingInfo.startDate = 0;
    backtestSettingInfo.endDate = 0;


    var amount = $('input[name="backtest-amount"]').val();

    if(amount !== "")
        backtestSettingInfo.amount = parseInt(amount);
    else
        backtestSettingInfo.amount = 1000000;


    var fee = $('input[name="backtest-fee"]').val();

    if(fee !== "")
        backtestSettingInfo.fee = fee * 0.01;
    else
        backtestSettingInfo.fee = 0.001;


    var slippage = $('input[name="backtest-slippage"]').val();

    if(slippage !== "")
        backtestSettingInfo.slippage = slippage * 0.01;
    else
        backtestSettingInfo.slippage = 0.004;


    console.log(backtestSettingInfo);
});

$(document).on('click', '.bot-list .bot-start', function () {
    console.log('bot-start');
    saveBotSetting();
});

function saveBotSetting() {
    var botSettingInfo = new Object();

    botSettingInfo.botname = $('#bot-name').text();

    botSettingInfo.botexchange = $('#bot-exchange option:selected').val();
    botSettingInfo.botcoin = $('#bot-coin option:selected').val();
    botSettingInfo.botperiod = $('#bot-period option:selected').val();

    //botSettingInfo.strategyInfo = ;
    //botSettingInfo.additionalInfo = ;

    botSettingInfo.botalarm = $('.bot-list #bot-alarm').is(":checked");
    botSettingInfo.autotrade = $('.bot-list #auto-trade').is(":checked");

    console.log(botSettingInfo);
}