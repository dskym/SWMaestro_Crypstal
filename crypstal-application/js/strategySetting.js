$(function () {
    "use strict";

    /*
    * If user want to set trading strategy, click setting area.
    */
    $(document).on('click', '.strategy-setting', function () {
        $('#modal-bot-step').modal();
    });

    /*
    * Show indicator selector content.
    */
    $('#modal-bot-step').on('show.bs.modal', function() {
        /*
        * If strategy object doesn't have data which key is bot id, add data.
        * Otherwise, search strategy object.
        */

        //get bot id
        var $botList = $('div.bot-list');
        var $botTab = $botList.find('ul.bot-tab');
        var $botActiveTab = $botTab.find('.active').closest('li');

        var botId = $botActiveTab.data('botId');

        if(botStrategy[botId] === undefined) {
            var botStrategyUrl = strategyUrl + '/?botId=' + botId;

            $.getJSON(botStrategyUrl, function () {
                console.log('Success Strategy List');
            }).done(function (strategies) {
                console.log(strategies);
                makeStrategyUI(strategies);
            });

        } else {
            console.log('Read bot Strategy Object.');
            console.log(botStrategy[botId]);
            makeStrategyUI(botStrategy[botId]);
        }
        /*
        * Initial Setting.
        * Load data from server and show UI.
        */

        /*
        * Set Bot Description
        */
        var $currentBot = $('div.bot-list').find('div.tab-pane.active');
        var $currentBotDescription = $currentBot.find('div.strategy-description');
        var $description = $('#modal-bot-step').find('#description');

        var descriptionTitle = $currentBotDescription.find('.strategy-description-title').text();
        var descriptionContent = $currentBotDescription.find('.strategy-description-content').text();

        $description.find('input[name="strategy-description-title"]').val(descriptionTitle);
        $description.find('textarea[name="strategy-description-content"]').val(descriptionContent);
    });

    /*
    * Reset bot description data in bot step modal.
    */
    $('#modal-bot-step').on('hide.bs.modal', function() {
        $('#buy').find('div.strategy').empty();
        $('#sell').find('div.strategy').empty();

        var $description = $('#modal-bot-step').find('#description');

        $description.find('input[name="strategy-description-title"]').val('');
        $description.find('textarea[name="strategy-description-content"]').val('');
    });

    /*
    * Change Bot indicator setting content by Bot indicator selector.
    */
    $(document).on('change', 'div.indicator-selector', function () {
        var $indicatorSelector = $(this);

        var indicatorName = $(this).find(":selected").val();

        $.each(indicators, function(key, value) {
            if(value['name'] === indicatorName) {
                var $indicator = $indicatorSelector.parent('div.indicator');

                var indicatorObject = {};
                var indicatorTemplate = value;
                $.extend(true, indicatorObject, indicatorTemplate);

                var indicatorSettingContent = indicatorObject.getSettingContent();
                $indicator.data('indicatorData', indicatorObject);

                if($indicator.find('div.indicator-setting').length === 0) {
                    $indicator.append(indicatorSettingContent);
                } else {
                    var $indicatorSetting = $indicator.find('div.indicator-setting');
                    $indicatorSetting.replaceWith(indicatorSettingContent);
                }
            }
        });
    });

    /*
    * Apply changed indicator setting data.
    */
    $(document).on('click', '#apply-indicator-setting', function () {
        var $strategy = $(this).closest('div.strategy');
        var $indicator = $(this).closest('div.indicator');
        var $indicatorSetting = $(this).closest('div.indicator-setting');

        //현재 setting 값 가져오기.
        var indicatorObject = $indicator.data('indicatorData');
        var newIndicatorData = indicatorObject.parseSettingContent($indicatorSetting);
        indicatorObject.updateIndicatorData(newIndicatorData);
        var indicatorDescriptionContent = indicatorObject.getDescriptionContent();

        $indicatorSetting.replaceWith(indicatorDescriptionContent);

        $indicator.find('div.indicator-selector').remove();

        if($indicator.length !== 5) {
            if($strategy.find('div.indicator-selector').length === 0) {
                $strategy.append('<div class="indicator">');
                $strategy.find('div.indicator:last').append(makeIndicatorSelectorContent());
                $strategy.append('</div>');
            }
        }
    });

    /*
    * Delete indicator data.
    */
    $(document).on('click', '#delete-indicator-setting', function () {
        $(this).closest('div.indicator').remove();
    });

    /*
    * Change UI from Indicator Description to Indicator Setting.
    */
    $(document).on('click', 'div.indicator-description', function () {
        var $indicator = $(this).closest('div.indicator');

        //현재 setting 값 가져오기.
        var indicatorObject = $indicator.data('indicatorData');
        var indicatorSettingContent = indicatorObject.getSettingContent();

        console.log('Change Indicator Description');
        console.log(indicatorObject);

        $(this).replaceWith(indicatorSettingContent);
    });

    /*
    * Change Comparator UI.
    */
    $(document).on('click', '.comparator', function () {
        var value = $(this).text();

        if(value === '>')
            $(this).text('<');
        else if(value === '<')
            $(this).text('>');
        else if(value === '>=')
            $(this).text('<=');
        else if(value === '<=')
            $(this).text('>=');
        else {
            console.log('value : ' + value);
        }
    });

    /*
    * Save Strategy in Bot data.
    */
    $(document).on('click', '#modal-bot-step button[type="submit"]', function () {
        //get bot id
        var $botList = $('div.bot-list');
        var $botTab = $botList.find('ul.bot-tab');
        var $botActiveTab = $botTab.find('.active').closest('li');

        var botId = $botActiveTab.data('botId');
        botStrategy[botId] = new Object();

        //Set Bot Strategy Description.
        var $description = $('#modal-bot-step').find('#description');
        var newDescriptionTitle = $description.find('input[name="strategy-description-title"]').val();
        var newDescriptionContent = $description.find('textarea[name="strategy-description-content"]').val();

        newDescriptionContent = newDescriptionContent.replace('\r\n', '<br>');

        //Create data object.
        var $buy = $('#buy').find('div.strategy');

        var data = new Object();
        data.position = 'BUY';
        data.strategyThreshold = $buy.data('strategyWeight');
        data.signalConfigList = new Array();

        $.each($buy.find('div.indicator'), function(index, value) {
            if($(this).children().hasClass('indicator-description')) {
                var indicatorData = $(this).data('indicatorData');

                var signalConfig = new Object();

                signalConfig.indicatorName = indicatorData.name;
                signalConfig.serialized = indicatorData.getSerialized();

                data.signalConfigList.push(signalConfig);
            }
        });

        //send strategy data to server.
        //sendStrategy(data);
        //console.log(data);

        var temp = new Object;
        botStrategy[botId]['BUY'] = new Array();

        $.each(data.signalConfigList, function(index, value) {
            botStrategy[botId]['BUY'].push(value.serialized);
        });



        //Create data object.
        var $sell = $('#sell').find('div.strategy');

        var data = new Object();
        data.position = 'SELL';
        data.strategyThreshold = $buy.data('strategyWeight');
        data.signalConfigList = new Array();

        $.each($sell.find('div.indicator'), function(index, value) {
            if($(this).children().hasClass('indicator-description')) {
                var indicatorData = $(this).data('indicatorData');

                var signalConfig = new Object();

                signalConfig.indicatorName = indicatorData.name;
                signalConfig.serialized = indicatorData.getSerialized();

                data.signalConfigList.push(signalConfig);
            }
        });

        //send strategy data to server.
        //sendStrategy(data);
        //console.log(data);

        var temp = new Object;
        botStrategy[botId]['SELL'] = new Array();

        $.each(data.signalConfigList, function(index, value) {
            botStrategy[botId]['SELL'].push(value.serialized);
        });

        console.log(botStrategy);

        //draw Bot Description UI
        var $currentBot = $('div.bot-list').find('div.tab-pane.active');
        var $currentBotStrategy = $currentBot.find('.strategy-setting');
        $currentBotStrategy.find('.strategy-description-title').text(newDescriptionTitle);
        $currentBotStrategy.find('.strategy-description-content').text(newDescriptionContent);

        $('#modal-bot-step').modal('hide');
    });

    /*
     * Send strategy of current bot to server.
     */
    function sendStrategy(data) {
        $.ajax({
            url : strategyUrl,
            data : JSON.stringify(data),
            dataType : 'json',
            type : 'put',
            contentType: "application/json",
            success : function(strategy) {
                console.log('Success to send strategy data');
                console.log(strategy);
            },
            error : function() {
                console.log('error');
            }
        });
    }

    /*
     * draw Indicator Selector UI.
     */
    function makeIndicatorSelectorContent() {
        var indicatorSelectorContent = '';

        indicatorSelectorContent +=
            '            <div class="indicator-selector">\n' +
            '              <div class="form-group">\n' +
            '                <select class="form-control">\n' +
            '                  <option value="" disabled selected>지표를 선택해주세요.</option>\n' +
            '                  <option value="MACD">MACD</option>\n' +
            '                  <option value="MA Double">MA Double</option>\n' +
            '                  <option value="Bollinger Bands">Bollinger Bands</option>\n' +
            '                  <option value="Parabolic Sar">Parabolic Sar</option>\n' +
            '                </select>\n' +
            '              </div>\n' +
            '            </div>\n';

        return indicatorSelectorContent;
    }

    //Draw Strategy UI.
    function makeStrategyUI(strategies) {
        $.each(strategies, function(key, strategy) {
            if(key === 'BUY') {
                var $buyStrategy = $('#buy').find('div.strategy');
                //$buyStrategy.data('strategyWeight', strategy['threshold']);

                $.each(strategy, function(index, indicator) {
                    var indicatorConfig = JSON.parse(indicator);

                    var indicatorObject = {};
                    var indicatorTemplate = indicators[indicatorConfig['indicator']];
                    $.extend(true, indicatorObject, indicatorTemplate);

                    indicatorObject.init(indicatorConfig);

                    var buyIndicatorDescriptionContent = indicatorObject.getDescriptionContent();

                    $buyStrategy.append('<div class="indicator">');
                    $buyStrategy.find('div.indicator:last').append(buyIndicatorDescriptionContent);
                    $buyStrategy.append('</div>');

                    $buyStrategy.find('div.indicator:last').data('indicatorData', indicatorObject);
                });
            }
            else if(key === 'SELL') {
                var $sellStrategy = $('#sell').find('div.strategy');
                //$sellStrategy.data('strategyWeight', strategy['threshold']);

                $.each(strategy, function(index, indicator) {
                    var indicatorConfig = JSON.parse(indicator);

                    var indicatorObject = {};
                    var indicatorTemplate = indicators[indicatorConfig['indicator']];
                    $.extend(true, indicatorObject, indicatorTemplate);

                    indicatorObject.init(indicatorConfig);

                    var sellIndicatorDescriptionContent = indicatorObject.getDescriptionContent();

                    $sellStrategy.append('<div class="indicator">');
                    $sellStrategy.find('div.indicator:last').append(sellIndicatorDescriptionContent);
                    $sellStrategy.append('</div>');

                    $sellStrategy.find('div.indicator:last').data('indicatorData', indicatorObject);
                });
            }

        });

        var $strategy = $('div.strategy');

        $.each($strategy, function() {
            if($(this).find('div.indicator').length !== 5) {
                $(this).append('<div class="indicator">');
                $(this).find('div.indicator:last').append(makeIndicatorSelectorContent());
                $(this).append('</div>');
            }
        });
    }
});