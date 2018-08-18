$(function () {
    "use strict";

    var buyStrategy = new Array();

    var strategy = new Object();

    strategy.indicator = new Object();

    strategy.indicator.name = 'MACD';
    
    strategy.indicator.settings = new Object;

    strategy.indicator.settings.short = 12;
    strategy.indicator.settings.long = 26;
    strategy.indicator.settings.signal = 9;
    strategy.indicator.settings.position = '>';

    strategy.weight = 1;

    buyStrategy.push(strategy);


    var strategy = new Object();

    strategy.indicator = new Object();

    strategy.indicator.name = 'MA Double';

    strategy.indicator.settings = new Object;

    strategy.indicator.settings.shortLength = 55;
    strategy.indicator.settings.shortMaType = 'SMA';
    strategy.indicator.settings.longLength = 130;
    strategy.indicator.settings.longMaType = 'SMA';
    strategy.indicator.settings.position = '>';

    strategy.weight = 1;

    buyStrategy.push(strategy);


    var sellStrategy = new Array();

    var strategy = new Object();

    strategy.indicator = new Object();

    strategy.indicator.name = 'Parabolic Sar';

    strategy.indicator.settings = new Object;

    strategy.indicator.settings.minAf = 0.01;
    strategy.indicator.settings.maxAf = 0.2;
    strategy.indicator.settings.position = '>';

    strategy.weight = 1;

    sellStrategy.push(strategy);


    var strategy = new Object();

    strategy.indicator = new Object();

    strategy.indicator.name = 'Bollinger Bands';

    strategy.indicator.settings = new Object;

    strategy.indicator.settings.period = 100;
    strategy.indicator.settings.standardDeviations = 1.1;
    strategy.indicator.settings.positionIndex = 0;
    strategy.indicator.settings.upOrDown = 'UP';

    strategy.weight = 1;

    sellStrategy.push(strategy);

    console.log(buyStrategy);
    console.log(sellStrategy);







    var $indicator = $('div.indicator');

    $(document).on('change', 'div.indicator-selector', function () {
        var indicatorName = $(this).find(":selected").val();

        var indicatorSettingContent = makeIndicatorSettingContent(buyStrategy[0]);
        $indicator.prepend(indicatorSettingContent);

    });

    $(document).on('click', '#apply-indicator-setting', function () {
        var indicatorDescriptionContent = makeIndicatorDescriptionContent(buyStrategy[0]);

        $indicator.append(indicatorDescriptionContent);
        $(this).closest('div.indicator-setting').remove();
    });

    $(document).on('click', 'div.indicator-description', function () {
        var indicatorSettingContent = makeIndicatorSettingContent(buyStrategy[0]);

        $indicator.append(indicatorSettingContent);
        $(this).remove();
    });

    function makeIndicatorSettingContent(obj) {
        var indicatorSettingContent = '';

        indicatorSettingContent +=
            '                <div class="indicator-setting">\n' +
            '                  <div class="box">\n' +
            '                    <div class="box-header with-border">\n' +
            '                      <h6 class="box-title">' + obj['indicator']['name'] + '</h6>\n' +
            '                    </div>\n' +
            '                    <div class="box-body">\n';

        $.each(obj['indicator']['settings'], function(key, value) {
            indicatorSettingContent +=
                '                      <div class="form-group">\n' +
                '                        <label>' + key + '</label>\n' +
                '                        <input class="form-control" type="number" value="' + value + '" id="min">\n' +
                '                      </div>\n';
            ;
        });

        indicatorSettingContent +=
            '                      <div class="form-group">\n' +
            '                        <label>이 지표의 가중치</label>\n' +
            '                        <input class="form-control" type="number" value="' + obj['weight'] + '" id="weight">\n' +
            '                      </div>\n';

        indicatorSettingContent +=
            '                    </div>\n' +
            '                    <div class="box-footer pull-right">\n' +
            '                      <div class="col-12">\n' +
            '                        <button type="button" class="btn btn-default" data-dismiss="modal" aria-hidden="true">\n' +
            '                          삭제\n' +
            '                        </button>\n' +
            '                        <button type="submit" class="btn btn-default" id="apply-indicator-setting">\n' +
            '                          적용\n' +
            '                        </button>\n' +
            '                      </div>\n' +
            '                    </div>\n' +
            '                  </div>\n' +
            '                </div>\n';

        return indicatorSettingContent;
    }

    function makeIndicatorDescriptionContent(obj) {
        var indicatorDescriptionContent = '';

        var trigger = 'Trigger : ';
        var setting = '';

        $.each(obj['indicator']['settings'], function(key, value) {
            setting += key + ' : ' + value + ' / ';
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
            '                      <p>이 지표의 가중치</p>\n' +
            '                      <span class="badge badge-pill badge-info">' + obj['weight'] + '</span>\n' +
            '                    </div>\n' +
            '                  </div>\n' +
            '                </div>\n' +
            '              </div>\n';

        return indicatorDescriptionContent;
    }
});