$(function () {
    "use strict";

    /*
    * params
    * baseCurrency
    * cryptoCurrency
    *
    * data
    * {
    *   'exchange' : 'UPBIT',
    *   'marketConditionList': [
    *   {
    *     "baseCurrency": "KRW",
    *     "cryptoCurrency": "RVN",
    *     "tradePrice": 7334000.0,
    *     "change": "FALL" or "RISE",
    *     "signedChangePrice": 79000.0,
    *     "signedChangeRate": 0.010889042
    *   }],
    *   'updatedTime' : '2018-08-21T01:10:13.896',
    * }
    */

    var webtickerUrl = 'http://crypstal-env.7xcrjvhg9m.ap-northeast-2.elasticbeanstalk.com/v1/ticker?baseCurrency=KRW';

    $.getJSON(webtickerUrl, function () {
        console.log('Success Load Web Ticker');
    }).done(function (webTickerData) {
        setWebTickerContent(webTickerData);

        $("#webticker").webTicker({
            height:'auto',
            duplicate:true,
            startEmpty:false,
            rssfrequency:5,
            direction: 'right'
        });
    });

    function setWebTickerContent(webTickerData) {

        //webTickerData['exchange'] -> 'UPBIT'

        $.each(webTickerData['marketConditionList'], function(index, value) {
            var webTickerContent = '';

            webTickerContent +=
                '<li>' +
                '  <div>' +
                '<i class="cc ' + value['cryptoCurrency'] + '"></i> ' +
                value['cryptoCurrency'] +
                ' <span class="text-yellow"> ' +
                value['tradePrice'] +
                ' </span>' +
                '  </div>' +
                '</li>';

            $("#webticker").append(webTickerContent);
        });
    }
});
