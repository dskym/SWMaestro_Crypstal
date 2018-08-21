$(function () {
    "use strict";

    var botListUrl = 'http://crypstal-env.7xcrjvhg9m.ap-northeast-2.elasticbeanstalk.com/v1/bots/';

    $.getJSON(botListUrl, function () {
        console.log('Success Load Bot List');
    }).done(function (botLists) {
        var $botList = $('div.bot-list');
        var $botTab = $botList.find('ul.bot-tab');

        $.each(botLists, function (index, bot) {
            var $botTabContent = $botList.find('div.bot-tab-content');

            var content = '';

            if (index === 0) {
                $botTab.append('<li class="nav-item"> <a class="nav-link active" data-toggle="tab" href="#bot' + (index + 1) + '" role="tab" aria-expanded="true"><img src="../images/robot.png"/><span class="bot-name">' + bot['name'] + '</span></a></li>');
                content += '<div class="tab-pane active" id="bot' + (index + 1) + '" role="tabpanel" aria-expanded="true">';
            } else {
                $botTab.append('<li class="nav-item"> <a class="nav-link" data-toggle="tab" href="#bot' + (index + 1) + '" role="tab" aria-expanded="true"><img src="../images/robot.png" />' + bot['name'] + '</a></li>');
                content += '<div class="tab-pane" id="bot' + (index + 1) + '" role="tabpanel" aria-expanded="true">';
            }

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
                '                        <label>' + Number(bot['asset']).toLocaleString('en') + ' KRW</label>\n' +
                '                        <button class="btn btn-info">수정하기</button>\n' +
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
                '                        <label>계정</label>\n' +
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
                '                      <div class="b-1 h-30px"></div><br>\n' +
                '\n' +
                '                      <div class="strategy-setting">\n' +
                '                        <h2>바보</h2>\n' +
                '                        <p>아무것도 못함</p>\n' +
                '                        <button class="btn btn-info">수정하기</button>\n' +
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
                '                        <button class="btn btn-info">수정하기</button>\n' +
                '                      </div>\n' +
                '\n' +
                '                      <div class="b-1 h-5 mt-10 mb-10"></div>\n' +
                '\n' +
                '                      <div class="safety">\n' +
                '                        <p>Safety</p>\n' +
                '                        <button class="btn btn-info">수정하기</button>\n' +
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
                '                </div>\n' +
                '              </div>';

            $botTabContent.append(content);


            var $botExchange = $botList.find('#bot' + (index + 1)).find('select.exchange');
            var $botCoin = $botList.find('#bot' + (index + 1)).find('select.coin');
            var $botPeriod = $botList.find('#bot' + (index + 1)).find('select.period');

            $.each($botExchange.children(), function() {
                if($(this).text().toUpperCase() === bot['exchange'].toUpperCase()) {
                    $(this).prop('selected', true);
                }
            });

            $.each($botCoin.children(), function() {
                if ($(this).text().toUpperCase() === bot['cryptoCurrency'].toUpperCase()) {
                    $(this).prop('selected', true);
                }
            });

            $.each($botPeriod.children(), function() {
                if($(this).text() === '5m' && bot['tradingPeriod'] === 5)
                    $(this).prop('selected', true);
                else if($(this).text() === '15m' && bot['tradingPeriod'] === 15)
                    $(this).prop('selected', true);
                else if($(this).text() === '30m' && bot['tradingPeriod'] === 30)
                    $(this).prop('selected', true);
                else if($(this).text() === '1h' && bot['tradingPeriod'] === 60)
                    $(this).prop('selected', true);
                else if($(this).text() === '2h' && bot['tradingPeriod'] === 120)
                    $(this).prop('selected', true);
            });

            var $botAlarm = $botList.find('#bot' + (index + 1)).find('input.bot-alarm');
            var $botAutoTrade = $botList.find('#bot' + (index + 1)).find('input.auto-trade');

            if(bot['signalAlarm'] === true)
                $botAlarm.prop('checked', true);
            else
                $botAlarm.prop('checked', true);

            if(bot['autoTrading'] === true)
                $botAutoTrade.prop('checked', true);
            else
                $botAutoTrade.prop('checked', false);
        })

        $botTab.append('<li class="nav-item"> <a class="nav-link" data-toggle="modal" data-target="#modal-add-bot"><img src="../images/bot-add.png" />Add</a></li>');
        $botTab.append('<li class="nav-item"> <a class="nav-link" data-toggle="modal" data-target="#moodal-delete-bot"><img src="../images/bot-minus.png" />Delete</a></li>');

        var $botTabContent = $("div.bot-list").find('div.bot-tab-content');
    });

    /*
    * If user want to create a new bot, client send request to server.
    * Then, receive default new bot data and print it.
    */
    $('#modal-add-bot button[type="submit"]').click(function () {
        var botname = $('input[name="bot-name"]').val();

        if(botname !== "") {
            //send request to server

            //receive default new bot data.
            var newBot = new Object();
            newBot.name = botname;
            newBot.exchange = 'Bithumb';
            newBot.cryptoCurrency = 'BTC';
            newBot.buyStrategy = [];
            newBot.sellStrategy = [];
            newBot.buyStrategyThreshold = 1;
            newBot.sellStrategyThreshold = 1;
            newBot.tradingPeriod = '5';
            newBot.asset = 0.0;
            newBot.signalAlarm = false;
            newBot.autoTrading = false;
            newBot.creationTime = '0000-00-00T00:00:00.000';

            botListData.push(newBot);


            console.log('Add New Bot');
            console.log(botListData);


            var $botList = $('div.bot-list');
            var $botTab = $botList.find('ul.bot-tab');
            var $botTabContent = $botList.find('div.bot-tab-content');

            var $botActiveTabNode = $botTab.find('.active');
            $botActiveTabNode.removeClass('active');

            var $botActiveTanContentNode = $botTabContent.find('.active');
            $botActiveTanContentNode.removeClass('active');

            var botCount = botListData.length;

            //request to add bot to server.
            var $botTabNode = $botTab.find('li:eq(' + (botCount - 1) + ')');
            $botTabNode.before('<li class="nav-item"> <a class="nav-link active" data-toggle="tab" href="#bot' + botCount + '" role="tab" aria-expanded="true"><img src="../images/robot.png"/><span class="bot-name">' + botname + '</span></a></li>');


            var content = '';

            content += '<div class="tab-pane active" id="bot' + botCount + '" role="tabpanel" aria-expanded="true">';
            content += '<div class="bot">\n';
            content +=
                '                <h4 class="text-bold text-center">' + newBot['name'] + '</h4>\n' +
                '                  <div class="box">\n' +
                '                    <div class="box-header with-border">\n' +
                '                      <h6 class="box-title">투자 금액</h6>\n' +
                '                    </div>\n' +
                '\n' +
                '                    <div class="box-body">\n' +
                '                      <div class="asset">\n' +
                '                        <label>' + Number(newBot['asset']).toLocaleString('en') + ' KRW</label>\n' +
                '                        <button class="btn btn-info">수정하기</button>\n' +
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
                '                        <label>계정</label>\n' +
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
                '                      <div class="b-1 h-30px"></div><br>\n' +
                '\n' +
                '                      <div class="strategy-setting">\n' +
                '                        <h2>바보</h2>\n' +
                '                        <p>아무것도 못함</p>\n' +
                '                        <button class="btn btn-info">수정하기</button>\n' +
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
                '                        <button class="btn btn-info">수정하기</button>\n' +
                '                      </div>\n' +
                '\n' +
                '                      <div class="b-1 h-5 mt-10 mb-10"></div>\n' +
                '\n' +
                '                      <div class="safety">\n' +
                '                        <p>Safety</p>\n' +
                '                        <button class="btn btn-info">수정하기</button>\n' +
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
                '                </div>\n' +
                '              </div>';

            $botTabContent.append(content);

            $('#modal-add-bot').find('input[name="bot-name"]').val('');
            $('#modal-add-bot').modal('hide');
        }
        else
            alert('이름을 입력해주세요.');
    });
});
