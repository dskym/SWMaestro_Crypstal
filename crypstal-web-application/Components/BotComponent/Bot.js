$(function () {
    "use strict";

    $(document).on('click', '.box-btn-close', function (event) {
        event.stopPropagation();

        swal("삭제하시겠습니까?", {
            buttons: {
                cancel: true,
                ok: true,
            },
        }).then((value) => {
            switch(value) {
                case 'cancel':
                    break;
                case 'ok':
                    //삭제 요청

                    //성공 시
                    const removeData = $(this).parents('.box').data('botData');
                    botListData = botListData.filter(botData => botData !== removeData);

                    //재랜더링
                    reRedering();

                    //실패 시
                    //실패 응답
                    break;
            }
        });
    });

    $(document).on('click', 'button.bot-alarm', function (event) {
        event.stopPropagation();

        //다시 한 번 물어보고 변경

        const $botUI = $(this).closest('.bot-setting');
        let botData = $botUI.data('botData');

        botData = {...botData, chatBotAlarm: !botData.chatBotAlarm};

        $botUI.data('botData', botData);
    });

    $(document).on('click', 'button.bot-trade', function (event) {
        event.stopPropagation();

        //다시 한 번 물어보고 변경

        const $botUI = $(this).closest('.bot-setting');
        let botData = $botUI.data('botData');

        botData = {...botData, autoTrade: !botData.autoTrade};

        $botUI.data('botData', botData);
    });

    $(document).on('click', 'div.bot-list-component .bot-setting', function () {
        const botData = $(this).data('botData');

        if(botData !== undefined) {
            if(botData.autoTrade === true) {
                swal("봇 설정 불가", "자동 거래를 종료해주세요.", "error", {
                    buttons: false,
                });

                return false;
            }

            const $botSettingModal = $('#modal-bot-setting');
            const $botName = $botSettingModal.find('#bot-name');
            const $botAsset = $botSettingModal.find('#bot-asset');
            const $botExchange = $botSettingModal.find('#bot-exchange');
            const $botCoin = $botSettingModal.find('#bot-coin');
            const $botPeriod = $botSettingModal.find('#bot-period');

            $botName.val(botData.name);
            $botAsset.val(botData.asset);

            $.each($botExchange.children(), function() {
                if ($(this).val() === botData.exchange) {
                    $(this).prop('selected', true);
                }
            });

            $.each($botCoin.children(), function() {
                if ($(this).val() === botData.coin) {
                    $(this).prop('selected', true);
                }
            });

            $.each($botPeriod.children(), function() {
                if ($(this).val() === botData.period) {
                    $(this).prop('selected', true);
                }
            });
        }

        $('#modal-bot-setting').modal('show');
    });

    $('#modal-bot-setting button[type="submit"]').click(function () {
        //서버에 전송하고 결과 받아서 화면 전체 재 랜더링.
        

        reRedering();
    });

    $('#modal-bot-setting').on('show.bs.modal', function() {
        //tab position reset.
        const $botSettingModal = $('#modal-bot-setting');
        const $botSettingTab = $botSettingModal.find('#bot-setting-tab');
        const $botSettingTabContent = $botSettingModal.find('.tab-content');

        $botSettingTab.children().eq(0).find('a').addClass('active');
        $botSettingTab.children().eq(1).find('a').removeClass('active');

        $botSettingTabContent.children().eq(0).addClass('active');
        $botSettingTabContent.children().eq(1).removeClass('active');
    });

    $('#modal-bot-setting').on('hide.bs.modal', function() {
        //입력된 값 초기화.
        const $botSettingModal = $('#modal-bot-setting');
        const $botName = $botSettingModal.find('#bot-name');
        const $botAsset = $botSettingModal.find('#bot-asset');
        const $botExchange = $botSettingModal.find('#bot-exchange');
        const $botCoin = $botSettingModal.find('#bot-coin');
        const $botPeriod = $botSettingModal.find('#bot-period');
        const $strategySelector = $('#bot-strategy');
        const $strategySetting = $('div.strategy-setting');

        $botName.val('');
        $botAsset.val('');
        $botExchange.val('');
        $botCoin.val('');
        $botPeriod.val('');

        $strategySelector.val('');
        $strategySetting.empty();
    });

    function makeBotAddComponent() {
        let content = `
            <div class="col-3">
                <div class="box bot-setting">
                    <div class="box-body text-center">
                        <img src="../images/bot-add.png">
                    </div>
                </div>
            </div>
        `;

        return content;
    }

    function makeBotComponent(bot) {
        let content = `
            <div class="col-3">
                <div class="box bot-setting" id="bot-${bot.id}">
                    <div class="box-header">
                        <ul class="box-controls pull-right">
                          <li><a class="box-btn-close bot-close" href="#" /></li>
                        </ul>
                    </div>
                    <div class="blog-container">
                        <div class="blog-header">
                            <div class="blog-author--no-cover text-center">
                                <h3>${bot.name}</h3>
                            </div>
                        </div>
    
                        <div class="blog-body">
                            <div class="blog-title text-center">
                                <h4>수익률 +100%</h4>
                            </div>
                            
                            <div class="blog-summary text-center">
                                <span>${bot.asset} 원</span>
                            </div>
                                                                        
                            <div class="blog-tags">
                                <ul>
                                    <li>${bot['exchange']}</li>
                                    <li>${bot['coin']}</li>
                                    <li>${bot['period']}</li>
                                </ul>
                            </div>
                            
                            <div class="blog-buttons">
                                <button class="btn btn-outline-info backtest">백테스팅</button>
                                <button class="btn btn-outline-info report">결과보기</button>
                            </div>
                        </div>
    
                        <div class="blog-footer">
                            <ul>
                                <li>
                                    <label>챗봇 알림</label>
                                    <button type="button" class="btn btn-sm btn-toggle btn-success bot-alarm ${bot.chatBotAlarm === true ? 'active' : ''}" data-toggle="button" aria-pressed="true" />
                                </li>
                                <li>
                                    <label>자동 거래</label>
                                    <button type="button" class="btn btn-sm btn-toggle btn-success bot-trade ${bot.autoTrade === true ? 'active' : ''}" data-toggle="button" aria-pressed="true" />
                                </li>
                            </ul>					  
                        </div>
                    </div>
                </div>
            </div>
        `;

        return content;
    }

    function makeBotListComponent() {
        let botsComponent = '<div class="row">';

        $.each(botListData, function(index, botData) {
            if(index !== 0 && index % 4 === 0) {
                botsComponent += '</div>';
                botsComponent += '<div class="row">';
                botsComponent += makeBotComponent(botData);
            } else {
                botsComponent += makeBotComponent(botData);
            }

        });

        if(botListData.length % 4 !== 0)
            botsComponent += makeBotAddComponent();

        botsComponent += '</div>';

        if(botListData.length % 4 === 0) {
            botsComponent += '<div class="row">';
            botsComponent += makeBotAddComponent();
            botsComponent += '</div>';
        }

        let content = `
            <div class="bot-list-component">
                ${botsComponent}
            </div>
        `;

        return content;
    }

    function bindBotData() {
        $.each(botListData, function(index, botData) {
            $('#bot-' + botData.id).data('botData', botData);
        });
    }

    function drawBotListComponent() {
        let component = makeBotListComponent();

        let $content = $('div.content');
        $content.append(component);

        bindBotData();
    }

    function reRedering() {
        const $content = $('div.content');
        $content.empty();

        drawBotListComponent();
    }

    drawBotListComponent();
});