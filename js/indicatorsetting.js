$(function () {
    "use strict";

    var $strategy = $('div.strategy');
    $strategy.append(makeIndicatorSelectorContent());

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

    $(document).on('click', '#delete-indicator-setting', function () {
        $(this).closest('div.indicator').remove();
    });

    $(document).on('click', '#apply-indicator-setting', function () {
        var $indicatorSetting = $(this).closest('div.indicator-setting');

        var indicatorObj = getStrategyObjectFromSetting($indicatorSetting);

        var indicatorDescriptionContent = makeIndicatorDescriptionContent(indicatorObj);

        $(this).closest('div.indicator').find('div.indicator-selector').remove();

        if($(this).closest('div.strategy').find('div.indicator').length !== 5) {
            if($(this).closest('div.strategy').find('div.indicator-selector').length === 0)
                $(this).closest('div.strategy').append(makeIndicatorSelectorContent);
        }

        $indicatorSetting.replaceWith(indicatorDescriptionContent);
    });

    $(document).on('click', 'div.indicator-description', function () {
        //var indicatorObj = getStrategyObjectFromDescription($(this));

        var indicatorSettingContent = makeIndicatorSettingContent(buyStrategy[0]);

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
    });

    function makeIndicatorSelectorContent() {
        var indicatorSelectorContent = '';

        indicatorSelectorContent +=
            '          <div class="indicator">\n' +
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
            '            </div>\n' +
            '          </div>\n';

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
            '                      <div class="settings">\n';

        $.each(obj['indicator']['settings'], function(key, value) {
            if(key !== "trigger") {
                indicatorSettingContent +=
                    '                        <div class="form-group">\n' +
                    '                          <label>' + key + '</label>\n' +
                    '                          <input class="w-50 text-center" type="number" value="' + value + '" id="min">\n' +
                    '                        </div>\n';
            }
        });

        indicatorSettingContent +=
            '                        </div>\n' +
            '                        <div class="position">\n' +
            '                          <div class="text-center">\n' +
            '                            <label>' + obj['indicator']['settings']['trigger']['left'] + '</label>\n' +
            '                            <button type="button" class="btn btn-info btn-circle comparator">' + obj['indicator']['settings']['trigger']['comparator'] + '</button>\n' +
            '                            <label>' + obj['indicator']['settings']['trigger']['right'] + '</label>\n' +
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

        var trigger = 'Trigger : ';
        var setting = '';

        trigger += obj['indicator']['settings']['position']['left'] + ' ' + obj['indicator']['settings']['position']['comparator'] + ' ' + obj['indicator']['settings']['position']['right'];

        var index = 0;

        $.each(obj['indicator']['settings'], function(key, value) {
            if(key !== "position") {
                setting += key + ' : ' + value;

                if(Object.keys(obj['indicator']['settings']).length - 2 !== index)
                    setting += ' / ';
            }

            index++;
        });

        indicatorDescriptionContent +=
            '                <div class="indicator-description">\n' +
            '                  <div class="box">\n' +
            '                    <div class="box-header with-border">\n' +
            '                      <h6 class="box-title">' + obj['indicator']['name'] + '</h6>\n' +
            '                    </div>\n' +
            '                    <div class="box-body">\n';

        indicatorDescriptionContent +=
            '                      <p>' + trigger + '</p>\n' +
            '                      <p>' + setting + '</p>\n';

        indicatorDescriptionContent +=
            '                    </div>\n' +
            '                    <div class="box-footer">\n' +
            '                      <span>이 지표의 가중치</span>\n' +
            '                      <span class="badge badge-pill badge-info">' + obj['weight'] + '</span>\n' +
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

        strategy.indicator.settings = new Object();

        $.each($indicatorSetting.find('.settings').find('.form-group'), function() {
            var key = $(this).find('label').text();
            var value = $(this).find('input').attr('value');

            strategy.indicator.settings[key] = value;
        });

        strategy.indicator.settings.position = new Object();

        strategy.indicator.settings.position.left = 'MACD';
        strategy.indicator.settings.position.comparator = $indicatorSetting.find('.comparator').text();
        strategy.indicator.settings.position.right = 'Signal';

        strategy.weight = $indicatorSetting.find('.weight').find('input').attr('value');

        return strategy;
    }

    function getStrategyObjectFromDescription(obj) {
        var $indicatorDescription = obj;

        var strategy = new Object();

        strategy.indicator = new Object();

        strategy.indicator.name = obj.find('.name').text();

        strategy.indicator.settings = new Object();

        $.each($indicatorSetting.find('.settings').find('.form-group'), function() {
            var key = $(this).find('label').text();
            var value = $(this).find('input').attr('value');

            strategy.indicator.settings[key] = value;
        });

        strategy.indicator.settings.position = new Object();

        strategy.indicator.settings.position.left = 'MACD';
        strategy.indicator.settings.position.comparator = $indicatorSetting.find('.comparator').text();
        strategy.indicator.settings.position.right = 'Signal';

        strategy.weight = $indicatorSetting.find('.weight').find('input').attr('value');

        return strategy;
    }
});