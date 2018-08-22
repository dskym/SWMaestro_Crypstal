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

        $.each(webTickerData['marketConditionList'], function(index, value) {
            var webTickerContent = '';

            webTickerContent +=
                '<li>' +
                '  <div class="webTickerContent">' +
                '    <div class="box">' +
                '      <div class="box-body p-5">' +
                '        <div class="webTickerContentTop">' +
                '          <span>' +
                '            <i class="cc ' + value['cryptoCurrency'] + ' mr-0"></i> ' +
                value['cryptoCurrency'] +
                '          </span>';

            if(value['change'] === 'FALL') {
                webTickerContent +=
                    '          <span class="text-right text-green">' +
                    '            <i class="mdi mdi-arrow-up-bold"></i>' +
                    Number(value['signedChangePrice']).toLocaleString('en') + '(+' + (value['signedChangeRate'] * 100).toFixed(2) + '%)' +
                    '          </span>';
            }
            else if(value['change'] === 'RISE') {
                webTickerContent +=
                    '          <span class="text-right text-red"> ' +
                    '            <i class="mdi mdi-arrow-down-bold"></i>' +
                    value['signedChangePrice'] + '(-' + (value['signedChangeRate'] * 100).toFixed(2) + '%)' +
                    '          </span>';
            }

            webTickerContent +=
                '        </div>' +
                '        <div class="webTickerContentBottom">' +
                '          <span>' +
                webTickerData['exchange'] + ' | ' + value['baseCurrency'] +
                '          </span>' +
                '          <span class="text-right text-yellow">' +
                Number(value['tradePrice']).toLocaleString('en') +
                '          </span>' +
                '        </div>' +
                '      </div>' +
                '    </div>' +
                '  </div>' +
                '</li>';

            $("#webticker").append(webTickerContent);
        });
    }
});
