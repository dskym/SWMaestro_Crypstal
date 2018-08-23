$(function () {
    "use strict";

    //Show indicator selector content.
    $('#modal-bot-step').on('show.bs.modal', function() {
        ////////////////////////////////////
        //request strategy data to server.//
        ////////////////////////////////////

        var botName = $('div.bot-list').find('div.bot-tab-content').find('.active').find('div.bot').find('h4').text();

        //draw modal
        $.each(botListData, function(index, bot) {
            if(bot['name'] === botName) {
                var buyStrategy = bot['buyStrategy'];
                var sellStrategy = bot['sellStrategy'];

                $.each(buyStrategy, function(index, indicatorObj) {
                    var buyIndicatorDescriptionContent = makeIndicatorDescriptionContent(indicatorObj);


                    $('#buy').find('div.strategy').append('<div class="indicator">');
                    $('#buy').find('div.strategy').find('div.indicator:last').append(buyIndicatorDescriptionContent);
                    $('#buy').find('div.strategy').append('</div>');
                });

                $.each(sellStrategy, function(index, indicatorObj) {
                    var sellIndicatorDescriptionContent = makeIndicatorDescriptionContent(indicatorObj);

                    $('#sell').find('div.strategy').append('<div class="indicator">');
                    $('#sell').find('div.strategy').find('div.indicator:last').append(sellIndicatorDescriptionContent);
                    $('#sell').find('div.strategy').append('</div>');
                });
            }
        });

        ////////////////////////////////////

        var $strategy = $('div.strategy');

        $.each($strategy, function() {
            if($(this).find('div.indicator').length !== 5) {
                $(this).append('<div class="indicator">');
                $(this).find('div.indicator:last').append(makeIndicatorSelectorContent());
                $(this).append('</div>');
            }
        });
    });

    $('#modal-bot-step').on('hide.bs.modal', function() {
        $('div.strategy').empty();
    });

    $(document).on('change', 'div.indicator-selector', function () {
        var $indicatorSelector = $(this);

        var indicatorName = $(this).find(":selected").val();

        $.each(obj, function(index,value) {
            if(value['indicator']['name'] === indicatorName) {
                var $indicator = $indicatorSelector.parent('div.indicator');

                var indicatorSettingContent = makeIndicatorSettingContent(value);

                if($indicator.find('div.indicator-setting').length === 0) {
                    $indicator.append(indicatorSettingContent);
                } else {
                    var $indicatorSetting = $indicator.find('div.indicator-setting');
                    $indicatorSetting.replaceWith(indicatorSettingContent);
                }
            }
        });
    });

    $(document).on('click', '#apply-indicator-setting', function () {
        var $indicatorSetting = $(this).closest('div.indicator-setting');

        var indicatorObj = getStrategyObjectFromSetting($indicatorSetting);

        var indicatorDescriptionContent = makeIndicatorDescriptionContent(indicatorObj);

        $(this).closest('div.indicator').find('div.indicator-selector').remove();

        if($(this).closest('div.strategy').find('div.indicator').length !== 5) {
            if($(this).closest('div.strategy').find('div.indicator-selector').length === 0) {
                $(this).closest('div.strategy').append('<div class="indicator">');
                $(this).closest('div.strategy').find('div.indicator:last').append(makeIndicatorSelectorContent());
                $(this).closest('div.strategy').append('</div>');
            }
        }

        $indicatorSetting.replaceWith(indicatorDescriptionContent);
    });

    $(document).on('click', '#delete-indicator-setting', function () {
        $(this).closest('div.indicator').remove();
    });

    $(document).on('click', 'div.indicator-description', function () {
        //parse description data.

        var $indicatorDescriptionContent = $(this);

        var indicatorObj = getStrategyObjectFromDescription($indicatorDescriptionContent);

        var indicatorSettingContent = makeIndicatorSettingContent(indicatorObj);

        $(this).replaceWith(indicatorSettingContent);
    });

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

    $(document).on('click', '#modal-bot-step button[type="submit"]', function () {

    }

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

    function makeIndicatorSettingContent(obj) {
        var indicatorSettingContent = '';

        indicatorSettingContent +=
            '                <div class="indicator-setting">\n' +
            '                  <div class="box">\n' +
            '                    <div class="box-header with-border">\n' +
            '                      <h6 class="box-title"><span class="name">' + obj['indicator']['name'] + '</span></h6>\n' +
            '                    </div>\n' +
            '                    <div class="box-body">\n' +
            '                      <div class="options">\n';

        $.each(obj['indicator']['options'], function(key, value) {
            if(key !== "trigger") {
                indicatorSettingContent +=
                    '                        <div class="form-group">\n' +
                    '                          <label>' + key + '</label>\n' +
                    '                          <input class="w-50 text-center" type="text" value="' + value + '"">\n' +
                    '                        </div>\n';
            }
        });

        indicatorSettingContent +=
            '                        </div>\n' +
            '                        <div class="position">\n' +
            '                          <div class="text-center">\n' +
            '                            <span class="left">' + obj['indicator']['options']['trigger']['left'] + '</span>\n' +
            '                            <button type="button" class="btn btn-info btn-circle comparator">' + obj['indicator']['options']['trigger']['comparator'] + '</button>\n' +
            '                            <span class="right">' + obj['indicator']['options']['trigger']['right'] + '</span>\n' +
            '                          </div>\n' +
            '                        </div>\n';

        indicatorSettingContent +=
            '                        <div class="weight">\n' +
            '                          <div class="form-group">\n' +
            '                            <label>이 지표의 가중치</label>\n' +
            '                            <input class="w-50 text-center" type="number" value="' + obj['weight'] + '" id="weight">\n' +
            '                          </div>\n' +
            '                        </div>\n';

        indicatorSettingContent +=
            '                    </div>\n' +
            '                    <div class="box-footer pull-right">\n' +
            '                      <button type="button" class="btn btn-default" id="delete-indicator-setting">\n' +
            '                        삭제\n' +
            '                      </button>\n' +
            '                      <button type="button" class="btn btn-default" id="apply-indicator-setting">\n' +
            '                        적용\n' +
            '                      </button>\n' +
            '                    </div>\n' +
            '                  </div>\n' +
            '                </div>\n';

        return indicatorSettingContent;
    }

    function makeIndicatorDescriptionContent(obj) {
        var indicatorDescriptionContent = '';

        var index = 0;

        indicatorDescriptionContent +=
            '                <div class="indicator-description">\n' +
            '                  <div class="box">\n' +
            '                    <div class="box-header with-border">\n' +
            '                      <h6 class="box-title"><span class="name">' + obj['indicator']['name'] + '</span></h6>\n' +
            '                    </div>\n' +
            '                    <div class="box-body">\n';

        indicatorDescriptionContent += '<p>Trigger : ';

        $.each(obj['indicator']['options']['trigger'], function(key, value) {
            indicatorDescriptionContent += '<span class="' + key + '">' + value + '</span>' + ' ';
        });

        var setting = '';

        indicatorDescriptionContent += '</p>';
        indicatorDescriptionContent += '<div class="options">';

        $.each(obj['indicator']['options'], function(key, value) {
            if(key !== "trigger") {
                indicatorDescriptionContent += '<span class="option"><span class="option-key">' + key + '</span> : <span class="option-value">' + value + '</span></span>';

                if(Object.keys(obj['indicator']['options']).length - 2 !== index)
                    indicatorDescriptionContent += ' / ';
            }

            index++;
        });

        indicatorDescriptionContent += '</div>';

        indicatorDescriptionContent +=
            '                    </div>\n' +
            '                    <div class="box-footer">\n' +
            '                      <span>이 지표의 가중치</span>\n' +
            '                      <span class="badge badge-pill badge-info weight">' + obj['weight'] + '</span>\n' +
            '                    </div>\n' +
            '                  </div>\n' +
            '                </div>\n' +
            '              </div>\n';

        return indicatorDescriptionContent;
    }

    function getStrategyObjectFromSetting(obj) {

        var $indicatorSetting = obj;

        var strategy = new Object();

        strategy.indicator = new Object();

        strategy.indicator.name = obj.find('.name').text();

        strategy.indicator.options = new Object();

        $.each($indicatorSetting.find('.options').find('.form-group'), function() {
            var key = $(this).find('label').text();
            var value = $(this).find('input').val();

            strategy.indicator.options[key] = value;
        });

        strategy.indicator.options.trigger = new Object();

        strategy.indicator.options.trigger.left = $indicatorSetting.find('.left').text();
        strategy.indicator.options.trigger.comparator = $indicatorSetting.find('.comparator').text();
        strategy.indicator.options.trigger.right = $indicatorSetting.find('.right').text();

        strategy.weight = $indicatorSetting.find('.weight').find('input').attr('value');

        return strategy;
    }

    function getStrategyObjectFromDescription(obj) {
        var $indicatorDescription = obj;

        var strategy = new Object();

        strategy.indicator = new Object();

        strategy.indicator.name = $indicatorDescription.find('.name').text();


        strategy.indicator.options = new Object;

        $.each($indicatorDescription.find('.options').find('.option'), function() {
            var key = $(this).find('.option-key').text();
            var value = $(this).find('.option-value').text();

            strategy.indicator.options[key] = value;
        });

        strategy.indicator.options.trigger = new Object();
        strategy.indicator.options.trigger.left = $indicatorDescription.find('.left').text();
        strategy.indicator.options.trigger.comparator = $indicatorDescription.find('.comparator').text();
        strategy.indicator.options.trigger.right = $indicatorDescription.find('.right').text();

        strategy.weight = $indicatorDescription.find('.weight').text();

        return strategy;
    }
});