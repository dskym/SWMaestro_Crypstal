$(function () {
    "use strict";

    var tradeResult = new Object();

    tradeResult.startDate = '2017-08-10 00:00:00';
    tradeResult.endDate = '2017-08-16 00:00:00';
    tradeResult.win = 27;
    tradeResult.lose = 17;
    tradeResult.maxProfit = 44.44;
    tradeResult.maxLoss = -22.22;
    tradeResult.revenueRate = 2500.00;
    tradeResult.initialInvestmentAmount = 1000000;
    tradeResult.totalAmount = 25000000;
    tradeResult.profitAndLossAmount = 25000000;
    tradeResult.changeRate = 35.10;
    tradeResult.exchangeFee = 1000000;
    tradeResult.slippageRate = 0.4;

    var $botInfo = $('div.bot-info');

    var $botResult = $botInfo.find('div.bot-result');
    var $botResultTable = $botResult.find('table');

    var tableNode = '';

    tableNode +=
        '                                      <tr>\n' +
        '                                        <th>테스트 기간</th>\n' +
        '                                        <td colspan="5">' + tradeResult['startDate'] + ' ~ ' + tradeResult['endDate'] + '</td>\n' +
        '                                      </tr>\n';

    tableNode +=
        '                                      <tr>\n' +
        '                                        <th rowspan="2">거래 횟수</th>\n' +
        '                                        <td>WIN</td>\n' +
        '                                        <td><span class="text-green">' + addComma(tradeResult['win']) + '</span></td>\n' +
        '                                        <th rowspan="2">승률</th>\n' +
        '                                        <td>최대 이익</td>\n';

    if(tradeResult['maxProfit'] > 0) {
        tableNode +=
            '                                        <td><span class="text-green">+' + addComma(tradeResult['maxProfit']) + '%</span></td>\n' +
            '                                      </tr>\n';
    }
    else if(tradeResult['maxProfit'] < 0){
        tableNode +=
            '                                        <td><span class="text-red">' + addComma(tradeResult['maxProfit']) + '%</span></td>\n' +
            '                                      </tr>\n';
    }
    else {
        tableNode +=
            '                                        <td><span>-' + addComma(tradeResult['maxProfit']) + '%</span></td>\n' +
            '                                      </tr>\n';
    }

    tableNode +=
        '                                      <tr>\n' +
        '                                        <td>LOSE</td>\n' +
        '                                        <td><span class="text-red">' + addComma(tradeResult['lose']) + '</span></td>\n' +
        '                                        <td>최대 손실</td>\n';

    if(tradeResult['maxLoss'] > 0) {
        tableNode +=
            '                                        <td><span class="text-green">+' + addComma(tradeResult['maxLoss']) + '%</span></td>\n' +
            '                                      </tr>\n';
    }
    else if(tradeResult['maxLoss'] < 0){
        tableNode +=
            '                                        <td><span class="text-red">'  + addComma(tradeResult['maxLoss']) + '%</span></td>\n' +
            '                                      </tr>\n';
    }
    else {
        tableNode +=
            '                                        <td><span>' + addComma(tradeResult['maxLoss']) + '%</span></td>\n' +
            '                                      </tr>\n';
    }

    tableNode +=
        '                                      <tr>\n';

    if(tradeResult['revenueRate'] > 0) {
        tableNode +=
            '                                        <th rowspan="6"><div>수익률</div><div class="text-green">+' + addComma(tradeResult['revenueRate']) + '%</div></th>\n';
    }
    else if(tradeResult['revenueRate'] < 0) {
        tableNode +=
            '                                        <th rowspan="6"><div>수익률</div><div class="text-red">' + addComma(tradeResult['revenueRate']) + '%</div></th>\n';
    }
    else {
        tableNode +=
            '                                        <th rowspan="6"><div>수익률</div><div>' + addComma(tradeResult['revenueRate']) + '%</div></th>\n';
    }


    tableNode +=
        '                                        <td>초기투자금액</td>\n' +
        '                                        <td colspan="4">' + addComma(tradeResult['initialInvestmentAmount']) +' KRW</td>\n' +
        '                                      </tr>\n';

    tableNode +=
        '                                      <tr>\n' +
        '                                        <td>총 자산</td>\n' +
        '                                        <td colspan="4"><span class="text-green">' + addComma(tradeResult['totalAmount']) + ' KRW</span></td>\n' +
        '                                      </tr>\n';

    tableNode +=
        '                                      <tr>\n' +
        '                                        <td>손익 자산</td>\n' +
        '                                        <td colspan="4"><span class="text-green">' + addComma(tradeResult['profitAndLossAmount']) + ' KRW</span></td>\n' +
        '                                      </tr>\n';

    tableNode +=
        '                                      <tr>\n' +
        '                                        <td>코인가격 변동률</td>\n';

    if(tradeResult['changeRate'] > 0) {
        tableNode +=
            '                                        <td colspan="4"><span class="text-green">+' + addComma(tradeResult['changeRate']) + '</span></td>\n' +
            '                                      </tr>\n';
    }
    else if(tradeResult['changeRate'] < 0) {
        tableNode +=
            '                                        <td colspan="4"><span class="text-red">'+ addComma(tradeResult['changeRate']) +'%</span></td>\n' +
            '                                      </tr>\n';
    }
    else {
        tableNode +=
            '                                        <td colspan="4"><span>' + addComma(tradeResult['changeRate']) + '%</span></td>\n' +
            '                                      </tr>\n';
    }


    tableNode +=
        '                                      <tr>\n' +
        '                                        <td>거래소 수수료</td>\n' +
        '                                        <td colspan="4"><span class="text-red">'+ addComma(tradeResult['exchangeFee']) +' KRW</span></td>\n' +
        '                                      </tr>\n';

    tableNode +=
        '                                      <tr>\n' +
        '                                        <td>슬리피지 비율</td>\n' +
        '                                        <td colspan="4">' + addComma(tradeResult['slippageRate']) + '%</td>\n' +
        '                                      </tr>\n';

    $botResultTable.append(tableNode);






    var $botHistory = $botInfo.find('div.bot-history');
    var $botHistoryTable = $botHistory.find('table');

    var tradeHistory = new Array();

    for(var i = 0;i<20;++i) {
        var tradeHistoryObj = new Object();

        tradeHistoryObj.date = '2017-08-16 09:00:00';

        if(i % 2 === 0)
            tradeHistoryObj.action = 'Buy';
        else
            tradeHistoryObj.action = 'Sell';

        tradeHistoryObj.price = 12345678;
        tradeHistoryObj.volume = 123.456;
        tradeHistoryObj.evaluation = 12345678;

        tradeHistory.push(tradeHistoryObj);
    }

    $.each(tradeHistory, function(index, value) {
        var tableNode = '';

        tableNode += '<tr>';
        tableNode += '<td><a href="javascript:void(0)"><span class="text-black">' + value['date'] + '</span></a></td>';

        if(value['action'] === 'Buy')
            tableNode += '<td><span class="label label-success">' + value['action'] + '</span></td>';
        else
            tableNode += '<td><span class="label label-danger">' + value['action'] + '</span></td>';

        tableNode += '<td>' + addComma(value['price']) + '</td>';
        tableNode += '<td>' + addComma(value['volume']) + '</td>';
        tableNode += '<td>' + addComma(value['evaluation']) + '</td>';
        tableNode += '</tr>';

        $botHistoryTable.append(tableNode);
    });

    function addComma(value) {
        return Number(value).toLocaleString('en');
    }

});


