$(function () {
    "use strict";

    $.getJSON(webTickerUrl, function () {
        console.log('Success Load Web Ticker');
    }).done(function (webTickerData) {
        makeWebTickerContent(webTickerData);

        $("#webticker").webTicker({
            height:'100%',
            duplicate:true,
            startEmpty:false,
            rssfrequency:1,
            direction: 'right',
        });
    });

    function makeWebTickerContent(webTickerData) {
        $.each(webTickerData['marketConditionList'], function(index, value) {
            var webTickerContent = `
                <li class="p-1">
                    <div class="webTickerContent">
                        <div class="box m-0">
                            <div class="box-body p-5">
                                <div class="flexbox webTickerContentTop">
                                    <img src="../images/coin/${value['cryptoCurrency'].toLowerCase()}.png" />
                                    <span>${value['cryptoCurrency']}</span>
                                        ${
                                            (value => {
                                                if(value['change'] === 'RISE') {
                                                    return `
                                                        <span class="text-right text-green">
                                                            <i class="mdi mdi-arrow-up-bold"></i>
                                                            ${Number(value['signedChangePrice']).toLocaleString('en')}(${(value['signedChangeRate'] * 100).toFixed(2)}%)
                                                        </span>
                                                    `;
                                                }
                                                else if(value['change'] === 'FALL') {
                                                    return `
                                                        <span class="text-right text-red">
                                                            <i class="mdi mdi-arrow-down-bold"></i>
                                                            ${Number(value['signedChangePrice']).toLocaleString('en')}(${(value['signedChangeRate'] * 100).toFixed(2)}%)
                                                        </span>
                                                    `;
                                                }
                                                else if(value['change'] === 'EVEN') {
                                                    return `
                                                        <span class="text-right">
                                                            ${Number(value['signedChangePrice']).toLocaleString('en')}(${(value['signedChangeRate'] * 100).toFixed(2)}%)
                                                        </span>
                                                    `;
                                                }
                                            })(value)
                                        }
                                </div>
                                <div class="flexbox webTickerContentBottom">
                                    <span>${webTickerData['exchange'] + ' | ' + value['baseCurrency']}</span>
                                    <span class="text-right text-yellow">${Number(value['tradePrice']).toLocaleString('en')}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>;
            `;

            $("#webticker").append(webTickerContent);
        });
    }
});
