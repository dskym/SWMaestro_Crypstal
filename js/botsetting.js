$('.bot-data').change(function () {
    console.log('changed');
    $('.box-save').css('display', 'block');
});

$('.strategy-setting').click(function () {
    $('#bot-setting').modal();
});

$('.order-quantity').click(function () {
    var coinname = $('#bot-coin option:selected').val();

    $('#modal-order-quantity .order-quantity-coin').text(coinname);
    $('input[name="buy-krw"]').attr('placeholder', '100,000 KRW');
    $('input[name="sell-krw"]').attr('placeholder', '100,000 KRW');
    $('input[name="buy-coin"]').attr('placeholder', '1.1 ' + coinname);
    $('input[name="sell-coin"]').attr('placeholder', '1.1 ' + coinname);

    $('#modal-order-quantity').modal();
});

$('#modal-order-quantity button[type="submit"]').click(function () {

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

$('.safety').click(function () {
    $('#modal-safety').modal();
});

$('.modal-add-bot').submit(function () {
    var botname = $('input[name="bot-name"]').val();

    if(botname !== "") {
        console.log('add-bot');
        console.log(botname);
    }
    else
        alert('이름을 입력해주세요.');
});


$('.bot-list #bot-alarm').click(function () {
    console.log($('.bot-list #bot-alarm').is(":checked"));
});

$('.bot-list #auto-trade').click(function () {
    console.log($('.bot-list #auto-trade').is(":checked"));
});


$('.bot-list .save-bot-setting').click(function () {
    console.log('save-bot-setting');
    saveBotSetting();
});

$('.bot-list .backtest').click(function () {
    console.log('backtest');

    $('#modal-backtest-setting').modal();
});

$('#modal-backtest-setting button[type="submit"]').click(function () {
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

$('.bot-list .bot-start').click(function () {
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