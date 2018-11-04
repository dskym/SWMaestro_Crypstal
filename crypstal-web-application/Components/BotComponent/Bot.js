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
                    const removeData = $(this).parents('.box').data('botData');

                    if(removeData.autoTrade === false) {
                        //삭제 요청
                        console.log('Request Delete.');

                        //성공 시
                        botListData = botListData.filter(botData => botData !== removeData);

                        console.log(removeData);
                        console.log(botListData);

                        //재랜더링
                        reRedering();

                        //실패 시
                        //실패 응답
                    } else {
                        //삭제 실패
                        swal('자동 거래를 종료해주세요.', {
                            buttons: false
                        });
                    }

                    break;
            }
        });
    });

    $(document).on('click', 'button.bot-alarm', function (event) {
        event.stopPropagation();

        //다시 한 번 물어보고 변경
        const $botUI = $(this).closest('.bot-setting');

        let oldBotData = $botUI.data('botData');
        let newBotData = {...oldBotData, chatBotAlarm: !oldBotData.chatBotAlarm};

        $.each(botListData, function(index, botData) {
            if(oldBotData === botData) {
                botListData[index] = newBotData;
            }
        });

        $botUI.data('botData', newBotData);
    });

    $(document).on('click', 'button.bot-trade', function (event) {
        event.stopPropagation();

        //다시 한 번 물어보고 변경

        const $botUI = $(this).closest('.bot-setting');

        let oldBotData = $botUI.data('botData');
        let newBotData = {...oldBotData, autoTrade: !oldBotData.autoTrade};

        $.each(botListData, function(index, botData) {
            if(oldBotData === botData) {
                botListData[index] = newBotData;
            }
        });

        $botUI.data('botData', newBotData);
    });

    $(document).on('click', 'div.bot-list-component .bot-setting', function () {
        const $botSettingModal = $('#modal-bot-setting');

        const botData = $(this).data('botData');

        //기존 봇 수정
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

            $botSettingModal.data('mode', 'update');
            $botSettingModal.data('bot', botData);
        //봇 추가
        } else {
            $botSettingModal.data('mode', 'add');
        }

        $('#modal-bot-setting').modal('show');
    });

    $('#modal-bot-setting button[type="submit"]').click(function (event) {
        let newBotData = {};

        const $botSettingModal = $('#modal-bot-setting');
        const $botName = $botSettingModal.find('#bot-name');
        const $botAsset = $botSettingModal.find('#bot-asset');
        const $botExchange = $botSettingModal.find('#bot-exchange');
        const $botCoin = $botSettingModal.find('#bot-coin');
        const $botPeriod = $botSettingModal.find('#bot-period');

        newBotData.id = Math.floor(Math.random() * 100 + 10);
        newBotData.name = $botName.val();
        newBotData.asset = Number($botAsset.val());
        newBotData.exchange = $botExchange.val();
        newBotData.coin = $botCoin.val();
        newBotData.period = $botPeriod.val();
        newBotData.strategy = {};
        newBotData.autoTrade = false;
        newBotData.chatBotAlarm = false;

        if(newBotData.name === '') {
            swal('이름을 입력해주세요.');
            return false;
        }

        if(newBotData.asset === 0) {
            swal('투자 금액을 입력해주세요.');
            return false;
        }

        if(newBotData.exchange === null) {
            swal('거래소를 입력해주세요.');
            return false;
        }

        if(newBotData.coin === null) {
            swal('코인을 입력해주세요.');
            return false;
        }

        if(newBotData.period === null) {
            swal('거래 주기를 입력해주세요.');
            return false;
        }

        const mode = $botSettingModal.data('mode');

        //서버에 전송하고 결과 받아서 화면 전체 재 랜더링.
        if(mode === 'add') {
            botListData.push(newBotData);
        } else if(mode === 'update') {
            const oldBotData = $botSettingModal.data('bot');

            $.each(botListData, function(index, botData) {
                if(oldBotData === botData) {
                    botListData[index] = newBotData;
                }
            });
        } else {
            console.log('Mode Error.');
        }

        console.log(botListData);

        $('#modal-bot-setting').modal('hide');

        reRedering();
    });

    $('#modal-bot-setting').on('show.bs.modal', function(event) {
        /*
        //datepicker 킬 때 막기
        if(event.target.nodeName === 'INPUT') {
            console.log(event);

            return false;
        }
        */

        //tab position reset.
        const $botSettingModal = $('#modal-bot-setting');
        const $botSettingTab = $botSettingModal.find('#bot-setting-tab');
        const $botSettingTabContent = $botSettingModal.find('.tab-content');

        $botSettingTab.children().eq(0).find('a').addClass('active');
        $botSettingTab.children().eq(1).find('a').removeClass('active');

        $botSettingTabContent.children().eq(0).addClass('active');
        $botSettingTabContent.children().eq(1).removeClass('active');
    });

    $('#modal-bot-setting').on('hide.bs.modal', function(event) {
        /*
        console.log(event);

        //datepicker 끌 때 막기
        if(event.target.nodeName === 'INPUT') {
            console.log(event);

            return false;
        }
        */

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