$(function () {
    "use strict";

    $.getJSON(botListUrl, function () {
        console.log('Success Load Bot List');
    }).done(function (botLists) {
        var $botList = $('div.bot-list');
        var $botTab = $botList.find('ul.bot-tab');

        $.each(botLists, function (index, bot) {

            var currentBot = new Object();

            currentBot.id = bot['id'];
            currentBot.name = bot['name'];
            currentBot.exchange = bot['exchange'];
            currentBot.cryptoCurrency = bot['crypto'];
            currentBot.tradingPeriod = bot['period'];
            currentBot.asset = bot['asset'];
            currentBot.signalAlarm = bot['alarm'];
            currentBot.autoTrading = bot['autoTrading'];
            /*
            * draw Bot Content UI
            */
            var $botTabContent = $botList.find('div.bot-tab-content');

            var content = '';

            if (index === 0) {
                $botTab.append('<li class="nav-item bot' + (index + 1) +'"> <a class="nav-link active" data-toggle="tab" href="#bot' + (index + 1) + '" role="tab" aria-expanded="true"><img src="../images/robot.png"/><span class="bot-name">' + currentBot.name + '</span></a></li>');
                $botTab.find('li.bot' + (index+1)).data('botId', currentBot.id);
                content += '<div class="tab-pane active" id="bot' + (index + 1) + '" role="tabpanel" aria-expanded="true">';
            } else {
                $botTab.append('<li class="nav-item"> <a class="nav-link" data-toggle="tab" href="#bot' + (index + 1) + '" role="tab" aria-expanded="true"><img src="../images/robot.png" />' + currentBot.name + '</a></li>');
                content += '<div class="tab-pane" id="bot' + (index + 1) + '" role="tabpanel" aria-expanded="true">';
            }

            content += getBotContent(index, currentBot);
            content += '</div>';

            $botTabContent.append(content);


            /*
            * Initial Setting
            */
            var $botExchange = $botList.find('#bot' + (index + 1)).find('select.exchange');
            var $botCoin = $botList.find('#bot' + (index + 1)).find('select.coin');
            var $botPeriod = $botList.find('#bot' + (index + 1)).find('select.period');

            $.each($botExchange.children(), function() {
                if($(this).text().toUpperCase() === currentBot.exchange.toUpperCase()) {
                    $(this).prop('selected', true);
                }
            });

            $.each($botCoin.children(), function() {
                if ($(this).text().toUpperCase() === currentBot.cryptoCurrency.toUpperCase()) {
                    $(this).prop('selected', true);
                }
            });

            $.each($botPeriod.children(), function() {
                if($(this).text() === '5m' && currentBot.tradingPeriod === 5)
                    $(this).prop('selected', true);
                else if($(this).text() === '15m' && currentBot.tradingPeriod === 15)
                    $(this).prop('selected', true);
                else if($(this).text() === '30m' && currentBot.tradingPeriod === 30)
                    $(this).prop('selected', true);
                else if($(this).text() === '1h' && currentBot.tradingPeriod === 60)
                    $(this).prop('selected', true);
                else if($(this).text() === '2h' && currentBot.tradingPeriod === 120)
                    $(this).prop('selected', true);
            });

            var $botAlarm = $botList.find('#bot' + (index + 1)).find('input.bot-alarm');
            var $botAutoTrade = $botList.find('#bot' + (index + 1)).find('input.auto-trade');

            if(currentBot.signalAlarm === true)
                $botAlarm.prop('checked', true);
            else
                $botAlarm.prop('checked', true);

            if(currentBot.autoTrading === true)
                $botAutoTrade.prop('checked', true);
            else
                $botAutoTrade.prop('checked', false);
        });

        /*
        * Bot Operation
        */
        $botTab.append('<li class="nav-item"> <a class="nav-link" data-toggle="modal" data-target="#modal-add-bot"><img src="../images/bot-add.png" />Add</a></li>');
        $botTab.append('<li class="nav-item"> <a class="nav-link" data-toggle="modal" data-target="#moodal-delete-bot"><img src="../images/bot-minus.png" />Delete</a></li>');
    });

    /*
    * If user want to create a new bot, client send request to server.
    * Then, receive default new bot data and print it.
    */
    $('#modal-add-bot button[type="submit"]').click(function () {
        var botname = $('input[name="bot-name"]').val();

        if(botname !== "") {
            /* Todo
            * request to server to add bot.
            */

            /* Todo
            * Receive default new bot data.
            */
            var newBot = new Object();

            newBot.id = 2;
            newBot.name = botname;
            newBot.exchange = 'Bithumb';
            newBot.crypto = 'BTC';
            newBot.period = '5';
            newBot.asset = 0.0;
            newBot.alarm = false;
            newBot.autoTrading = false;

            botListData.push(newBot);

            console.log('Add New Bot');
            console.log(botListData);


            /*
            * Change bot content.
            */
            var $botList = $('div.bot-list');
            var $botTab = $botList.find('ul.bot-tab');
            var $botTabContent = $botList.find('div.bot-tab-content');

            var $botActiveTabNode = $botTab.find('.active');
            $botActiveTabNode.removeClass('active');

            var $botActiveTabContentNode = $botTabContent.find('.active');
            $botActiveTabContentNode.removeClass('active');

            var botCount = botListData.length;

            var $botTabNode = $botTab.find('li:eq(' + (botCount - 1) + ')');
            $botTabNode.before('<li class="nav-item bot' + botCount + '"> <a class="nav-link active" data-toggle="tab" href="#bot' + botCount + '" role="tab" aria-expanded="true"><img src="../images/robot.png"/><span class="bot-name">' + botname + '</span></a></li>');
            $botTab.find('li.bot' + botCount).data('botId', newBot.id);

            /*
            * draw Bot Content UI
            */
            var content = '';

            content += '<div class="tab-pane active" id="bot' + botCount + '" role="tabpanel" aria-expanded="true">';
            content += getBotContent(botCount, newBot);
            content += '</div>';

            $botTabContent.append(content);

            /*
            * Close bot add modal.
            */
            $('#modal-add-bot').modal('hide');
        }
        else {
            swal({
                title: '봇 이름을 입력해주세요.'
            });
        }
    });

    /*
    * Reset data in bot add modal.
    */
    $('#modal-add-bot').on('hide.bs.modal', function() {
        $('#modal-add-bot').find('input[name="bot-name"]').val('');
    });

    /*
    * Draw bot content UI using bot data.
    */
    function getBotContent(index, bot) {
        var content = '';

        content +=
            '              <div class="bot">\n' +
            '                <h4 class="text-bold text-center">' + bot['name'] + '</h4>\n' +
            '                  <div class="box">\n' +
            '                    <div class="box-header with-border">\n' +
            '                      <h6 class="box-title">투자 금액</h6>\n' +
            '                    </div>\n' +
            '\n' +
            '                    <div class="box-body">\n' +
            '                      <div class="asset">\n' +
            '                        <label class="mb-0">' + Number(bot['asset']).toLocaleString('en') + ' KRW</label>\n' +
            '                      </div>\n' +
            '                    </div>\n' +
            '                  </div>\n' +
            '\n' +
            '                  <div class="box">\n' +
            '                    <div class="box-header with-border">\n' +
            '                      <h6 class="box-title">봇의 전략</h6>\n' +
            '                      <ul class="box-controls pull-right">\n' +
            '                        <li><a class="box-btn-slide"  href="#"></a></li>\n' +
            '                      </ul>\n' +
            '                    </div>\n' +
            '\n' +
            '                    <div class="box-body">\n' +
            '                      <div class="form-group">\n' +
            '                        <label>거래소</label>\n' +
            '                        <select id="bot-exchange" class="form-control exchange bot-data">\n' +
            '                          <option value="Bithumb">Bithumb</option>\n' +
            '                          <option value="Upbit">Upbit</option>\n' +
            '                          <option value="Coinone">Coinone</option>\n' +
            '                        </select>\n' +
            '                      </div>\n' +
            '\n' +
            '                      <div class="form-group">\n' +
            '                        <label>코인</label>\n' +
            '                        <select id="bot-coin" class="form-control coin bot-data">\n' +
            '                          <option value="BTC">BTC</option>\n' +
            '                          <option value="ETH">ETH</option>\n' +
            '                          <option value="XRP">XRP</option>\n' +
            '                        </select>\n' +
            '                      </div>\n' +
            '\n' +
            '                      <div class="form-group">\n' +
            '                        <label>주기</label>\n' +
            '                        <select id="bot-period" class="form-control period bot-data">\n' +
            '                          <option value="5m">5m</option>\n' +
            '                          <option value="15m">15m</option>\n' +
            '                          <option value="30m">30m</option>\n' +
            '                          <option value="1h">1h</option>\n' +
            '                          <option value="2h">2h</option>\n' +
            '                        </select>\n' +
            '                      </div>\n' +
            '\n' +
            '                      <div class="b-1 h-30px"></div>\n' +
            '\n' +
            '                      <div class="strategy-setting">\n' +
            '                        <h4 style="margin: 0.5rem 0rem">전략 제목 : <span class="strategy-description-title">제목 없음</span></h4>\n' +
            '                        <p style="margin-bottom: 0px">전략 설명 : <span class="strategy-description-content">설명 없음</span></p>\n' +
            '                      </div>\n' +
            '                    </div>\n' +
            '                  </div>\n' +
            '\n' +
            '                  <div>\n' +
            '                    <input type="checkbox" id="bot-alarm" class="filled-in bot-alarm bot-data"/>\n' +
            '                    <label for="bot-alarm">챗봇 알림 받기</label>\n' +
            '                  </div>\n' +
            '                  <div>\n' +
            '                    <input type="checkbox" id="auto-trade" class="filled-in auto-trade bot-data"/>\n' +
            '                    <label for="auto-trade">자동 거래</label>\n' +
            '                  </div>\n' +
            '                  <div class="box-save">\n' +
            '                    <button class="btn btn-info save-bot-setting">현재 봇 설정 저장</button>\n' +
            '                  </div>\n' +
            '                  <div class="box-submit">\n' +
            '                    <button class="btn btn-info backtest">백테스팅</button>\n' +
            '                    <button class="btn btn-info bot-start">봇 시작</button>\n' +
            '                  </div>\n' +
            '                </div>\n';
        /*
        content +=
            '              <div class="bot">\n' +
            '                <h4 class="text-bold text-center">' + bot['name'] + '</h4>\n' +
            '                  <div class="box">\n' +
            '                    <div class="box-header with-border">\n' +
            '                      <h6 class="box-title">투자 금액</h6>\n' +
            '                    </div>\n' +
            '\n' +
            '                    <div class="box-body">\n' +
            '                      <div class="asset">\n' +
            '                        <label class="mb-0">' + Number(bot['asset']).toLocaleString('en') + ' KRW</label>\n' +
            '                      </div>\n' +
            '                    </div>\n' +
            '                  </div>\n' +
            '\n' +
            '                  <div class="box">\n' +
            '                    <div class="box-header with-border">\n' +
            '                      <h6 class="box-title">봇의 전략</h6>\n' +
            '                      <ul class="box-controls pull-right">\n' +
            '                        <li><a class="box-btn-slide"  href="#"></a></li>\n' +
            '                      </ul>\n' +
            '                    </div>\n' +
            '\n' +
            '                    <div class="box-body">\n' +
            '                      <div class="form-group">\n' +
            '                        <label>거래소</label>\n' +
            '                        <select id="bot-exchange" class="form-control exchange bot-data">\n' +
            '                          <option value="Bithumb">Bithumb</option>\n' +
            '                          <option value="Upbit">Upbit</option>\n' +
            '                          <option value="Coinone">Coinone</option>\n' +
            '                        </select>\n' +
            '                      </div>\n' +
            '\n' +
            '                      <div class="form-group">\n' +
            '                        <label>코인</label>\n' +
            '                        <select id="bot-coin" class="form-control coin bot-data">\n' +
            '                          <option value="BTC">BTC</option>\n' +
            '                          <option value="ETH">ETH</option>\n' +
            '                          <option value="XRP">XRP</option>\n' +
            '                        </select>\n' +
            '                      </div>\n' +
            '\n' +
            '                      <div class="form-group">\n' +
            '                        <label>주기</label>\n' +
            '                        <select id="bot-period" class="form-control period bot-data">\n' +
            '                          <option value="5m">5m</option>\n' +
            '                          <option value="15m">15m</option>\n' +
            '                          <option value="30m">30m</option>\n' +
            '                          <option value="1h">1h</option>\n' +
            '                          <option value="2h">2h</option>\n' +
            '                        </select>\n' +
            '                      </div>\n' +
            '\n' +
            '                      <div class="b-1 h-30px"></div>\n' +
            '\n' +
            '                      <div class="strategy-setting">\n' +
            '                        <h4 style="margin: 0.5rem 0rem">전략 제목 : <span class="strategy-description-title">제목 없음</span></h4>\n' +
            '                        <p style="margin-bottom: 0px">전략 설명 : <span class="strategy-description-content">설명 없음</span></p>\n' +
            '                      </div>\n' +
            '                    </div>\n' +
            '                  </div>\n' +
            '\n' +
            '                  <div class="box">\n' +
            '                    <div class="box-header with-border">\n' +
            '                      <h6 class="box-title">추가 설정</h6>\n' +
            '                      <ul class="box-controls pull-right">\n' +
            '                        <li><a class="box-btn-slide"  href="#"></a></li>\n' +
            '                      </ul>\n' +
            '                    </div>\n' +
            '\n' +
            '                    <div class="box-body">\n' +
            '                      <div class="order-quantity">\n' +
            '                        <p>주문 수량</p>\n' +
            '                        <p><span class="badge badge-success mr-10">매수</span><span class="order-quantity-buy" >100% (All-in)</span></p>\n' +
            '                        <p><span class="badge badge-danger mr-10">매도</span><span class="order-quantity-sell" >100% (All-in)</span></p>\n' +
            '                      </div>\n' +
            '\n' +
            '                      <div class="b-1 h-5 mt-10 mb-10"></div>\n' +
            '\n' +
            '                      <div class="safety">\n' +
            '                        <p>Safety</p>\n' +
            '                        <div class="safety-content">* 선택한 Safety 옵션이 없습니다.</div>\n' +
            '                      </div>\n' +
            '                    </div>\n' +
            '                  </div>\n' +
            '\n' +
            '                  <div>\n' +
            '                    <input type="checkbox" id="bot-alarm" class="filled-in bot-alarm bot-data"/>\n' +
            '                    <label for="bot-alarm">챗봇 알림 받기</label>\n' +
            '                  </div>\n' +
            '                  <div>\n' +
            '                    <input type="checkbox" id="auto-trade" class="filled-in auto-trade bot-data"/>\n' +
            '                    <label for="auto-trade">자동 거래</label>\n' +
            '                  </div>\n' +
            '                  <div class="box-save">\n' +
            '                    <button class="btn btn-info save-bot-setting">현재 봇 설정 저장</button>\n' +
            '                  </div>\n' +
            '                  <div class="box-submit">\n' +
            '                    <button class="btn btn-info backtest">백테스팅</button>\n' +
            '                    <button class="btn btn-info bot-start">봇 시작</button>\n' +
            '                  </div>\n' +
            '                </div>\n';
        */

        return content;
    }
});
