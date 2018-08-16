$(function () {
    "use strict";

    init();

    $("#webticker").webTicker({
        height:'auto',
        duplicate:true,
        startEmpty:false,
        rssfrequency:5,
        direction: 'right'
    });
});

function init() {
    var webTickerData = new Object();

    var coinData = new Object();

    coinData.btc = '$11.039232';
    coinData.eth = '$1.2792';
    coinData.game = '$11.039232';
    coinData.lbc = '$0.588418';
    coinData.neo = '$161.511';
    coinData.ste = '$0.551955';
    coinData.lit = '$177.80';
    coinData.note = '$13.399';
    coinData.mint = '$0.880694';
    coinData.iot = '$2.555';
    coinData.das = '$769.22';

    webTickerData.exchange = 'upbit';
    webTickerData.coin = coinData;

    console.log(webTickerData);
    console.log(webTickerData['exchange']);
    console.log(webTickerData['coin']);
    $.each(webTickerData['coin'], function(key, value) {
        $("#webticker").append('<li><i class=\"cc BTC\"></i> ' + key + ' <span class=\"text-yellow\"> ' + value + '</span></li>');
    });
}
