$(function () {
    "use strict";

    var botListUrl = 'http://crypstal-env.7xcrjvhg9m.ap-northeast-2.elasticbeanstalk.com/v1/bots/';

    $.getJSON(botListUrl, function () {
        console.log('Success Load Bot List');
    }).done(function (botLists) {
        var $botList = $("div.bot-list");
        var $botTab = $botList.find('ul.bot-tab');

        $.each(botLists, function (index, bot) {
            var $botTabContent = $botList.find('div.bot-tab-content');

            var content = '';

            if (index === 0) {
                $botTab.append('<li class="nav-item"> <a class="nav-link active" data-toggle="tab" href="#bot' + (index + 1) + '" role="tab" aria-expanded="true"><img src="../images/robot.png"/>' + bot['name'] + '</a></li>');
                content += '<div class="tab-pane active" id="bot' + (index + 1) + '" role="tabpanel" aria-expanded="true">';
            } else {
                $botTab.append('<li class="nav-item"> <a class="nav-link" data-toggle="tab" href="#bot' + (index + 1) + '" role="tab" aria-expanded="true"><img src="../images/robot.png" />' + bot['name'] + '</a></li>');
                content += '<div class="tab-pane" id="bot' + (index + 1) + '" role="tabpanel" aria-expanded="true">';
            }

            content += '<h4 class="text-bold text-center">' + bot['name'] + '</h4>\n' +
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
            '                        <select class="form-control select2 exchange">\n' +
            '                          <option value="Bithumb">Bithumb</option>\n' +
            '                          <option value="Upbit">Upbit</option>\n' +
            '                          <option value="Coinone">Coinone</option>\n' +
            '                        </select>\n' +
            '                      </div>\n' +
            '\n' +
            '                      <div class="form-group">\n' +
            '                        <label>코인</label>\n' +
            '                        <select class="form-control select2 coin">\n' +
            '                          <option value="BTC">BTC</option>\n' +
            '                          <option value="ETH">ETH</option>\n' +
            '                          <option value="XRP">XRP</option>\n' +
            '                        </select>\n' +
            '                      </div>\n' +
            '\n' +
            '                      <div class="form-group">\n' +
            '                        <label>주기</label>\n' +
            '                        <select class="form-control select2 period">\n' +
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
            '                      <button class="btn btn-info">수정하기</button>\n' +
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
            '                      <p>주문 수량</p>\n' +
            '                      <p><span class="badge badge-success mr-10">매수</span>100%(All-in)</p>\n' +
            '                      <p><span class="badge badge-danger mr-10">매도</span>100%(All-in)</p>\n' +
            '                      <button class="btn btn-info">수정하기</button>\n' +
            '                    </div>\n' +
            '\n' +
            '                    <div class="box-footer">\n' +
            '                      <p>Safety</p>\n' +
            '                      <button class="btn btn-info">수정하기</button>\n' +
            '                    </div>\n' +
            '\n' +
            '                  </div>\n' +
            '\n' +
            '                  <div>\n' +
            '                    <input type="checkbox" id="basic_checkbox_3" class="filled-in bot-alarm"/>\n' +
            '                    <label for="basic_checkbox_3">챗봇 알림 받기</label>\n' +
            '                  </div>\n' +
            '                  <div>\n' +
            '                    <input type="checkbox" id="basic_checkbox_4" class="filled-in auto-trade"/>\n' +
            '                    <label for="basic_checkbox_4">자동 거래</label>\n' +
            '                  </div>\n' +
            '                  <div class="box-submit">\n' +
            '                    <button class="btn btn-info">백테스팅</button>\n' +
            '                    <button class="btn btn-info">봇 시작</button>\n' +
            '                  </div>\n' +
            '                </div>';

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
                    console.log($(this));
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
        $botTab.append('<li class="nav-item"> <a class="nav-link" data-toggle="modal" data-target="#deletebot"><img src="../images/bot-minus.png" />Delete</a></li>');

        var $botTabContent = $("div.bot-list").find('div.bot-tab-content');
    });

    $('#modal-add-bot button[type="submit"]').click(function () {
        var botname = $('input[name="bot-name"]').val();

        if(botname !== "") {
            console.log('add-bot');
            console.log(botname);
        }
        else
            alert('이름을 입력해주세요.');
    });
});
