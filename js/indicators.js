var ma_double = {
    name : 'MA Double',
    options : {
        shortTerm: {
            name : 'Short length',
            domain : {
                min : 5,
                max : 300
            },
            value : 55
        },
        shortMAType : {
            name : 'MA Type',
            domain : ['Sma', 'Ema', 'Wma', 'Tma'],
            value : 'Sma'
        },
        longTerm : {
            name : 'Long length',
            domain : {
                min : 5,
                max : 300
            },
            value : 130
        },
        longMAType : {
            name : 'MA Type',
            domain : ['Sma', 'Ema', 'Wma', 'Tma'],
            value : 'Sma'
        }
    },
    position : {
        left: 'Short',
        right: 'Long',
        comparator: '>'
    },
    weight : 1,

    init : function(indicatorConfig) {
        this.options.shortTerm.value = indicatorConfig['shortTerm'];
        this.options.longTerm.value = indicatorConfig['longTerm'];
        this.position.comparator = indicatorConfig['comparator'];
        this.weight = indicatorConfig['weight'];
    },

    updateIndicatorData : function(newIndicatorData) {
        this.options.shortTerm.value = newIndicatorData.shortTerm;
        this.options.shortMAType.value = newIndicatorData.shortMAType;
        this.options.longTerm.value = newIndicatorData.longTerm;
        this.options.longMAType.value = newIndicatorData.longMAType;
        this.position.comparator = newIndicatorData.comparator;
        this.weight = newIndicatorData.weight;
    },

    parseSettingContent : function($indicatorSetting) {
        var indicatorObject = new Object();

        indicatorObject.shortTerm = $indicatorSetting.find('#shortTerm').val();
        indicatorObject.shortMAType = $indicatorSetting.find('#shortMAType').val();
        indicatorObject.longTerm = $indicatorSetting.find('#longTerm').val();
        indicatorObject.longMAType = $indicatorSetting.find('#longMAType').val();
        indicatorObject.comparator = $indicatorSetting.find('.position').find('.comparator').text();
        indicatorObject.weight = $indicatorSetting.find('.weight').find('#weight').val();

        return indicatorObject;
    },

    getSettingContent : function() {
        var indicatorSettingContent = '';

        indicatorSettingContent +=
            '                <div class="indicator-setting">\n' +
            '                  <div class="box">\n' +
            '                    <div class="box-header with-border">\n' +
            '                      <h6 class="box-title"><span class="name">' + this.name + '</span></h6>\n' +
            '                    </div>\n' +
            '                    <div class="box-body">\n' +
            '                      <div class="options">\n';

        $.each(this.options, function(key, data) {
            if(data.domain instanceof Array) {
                indicatorSettingContent +=
                    '                        <div class="form-group">\n' +
                    '                          <label>' + data.name + '</label>\n';

                indicatorSettingContent +=
                    '                        <select id="' + key + '" class="w-100 pull-right">\n';

                for(var i=0;i<data.domain.length;++i) {
                    if(data.domain[i] === data.value) {
                        indicatorSettingContent +=
                            '                          <option value="' + data.domain[i] + '" selected>' + data.domain[i] + '</option>\n';
                    }
                    else {
                        indicatorSettingContent +=
                            '                          <option value="' + data.domain[i] + '">' + data.domain[i] + '</option>\n';
                    }
                }


                indicatorSettingContent +=
                    '                        </select>\n' +
                    '                        </div>\n';
            }
            else if(data.domain instanceof Object) {
                indicatorSettingContent +=
                    '                        <div class="form-group">\n' +
                    '                          <label>' + data.name + ' (' + data.domain.min + '~' + data.domain.max + ')' + '</label>\n' +
                    '                          <input class="w-50 text-center pull-right" id="' + key + '" type="text" value="' + data.value + '"">\n' +
                    '                        </div>\n';
            }
            else {
                indicatorSettingContent +=
                    '                        <div class="form-group">\n' +
                    '                          <label>' + data.name + '</label>\n' +
                    '                          <input class="w-50 text-center pull-right" id="' + key + '" type="text" value="' + data.value + '"">\n' +
                    '                        </div>\n';
            }
        });

        indicatorSettingContent +=
            '                        </div>\n' +
            '                        <div class="position">\n' +
            '                          <div class="text-center">\n' +
            '                            <span class="left">' + this.position.left + '</span>\n' +
            '                            <button type="button" class="btn btn-info btn-circle comparator">' + this.position.comparator + '</button>\n' +
            '                            <span class="right">' + this.position.right + '</span>\n' +
            '                          </div>\n' +
            '                        </div>\n';

        indicatorSettingContent +=
            '                        <div class="weight">\n' +
            '                          <div class="form-group">\n' +
            '                            <label>이 지표의 가중치</label>\n' +
            '                            <input class="w-50 text-center" type="number" value="' + this.weight + '" id="weight">\n' +
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
    },

    getDescriptionContent : function() {
        var indicatorDescriptionContent = '';

        indicatorDescriptionContent +=
            '                <div class="indicator-description">\n' +
            '                  <div class="box">\n' +
            '                    <div class="box-header with-border">\n' +
            '                      <h6 class="box-title"><span class="name">' + this.name + '</span></h6>\n' +
            '                    </div>\n' +
            '                    <div class="box-body">\n';

        indicatorDescriptionContent += '<p>Trigger : ' + this.position.left + ' ' + this.position.comparator + ' ' + this.position.right + '</p>';

        indicatorDescriptionContent += '<div class="options">';

        indicatorDescriptionContent += '<p>' + this.options.shortTerm.name + ' : ' + this.options.shortTerm.value + ' (' + this.options.shortMAType.value + ')'+ ' / ' + this.options.longTerm.name + ' : ' + this.options.longTerm.value + ' (' + this.options.longMAType.value + ')' + '</p>';

        indicatorDescriptionContent +=
            '                      </div>\n' +
            '                    </div>\n' +
            '                    <div class="box-footer">\n' +
            '                      <span>이 지표의 가중치</span>\n' +
            '                      <span class="badge badge-pill badge-info weight">' + this.weight + '</span>\n' +
            '                    </div>\n' +
            '                  </div>\n' +
            '                </div>\n' +
            '              </div>\n';

        return indicatorDescriptionContent;
    },

    getSerialized : function() {
        var obj = new Object();

        $.each(this.options, function(key, data) {
            obj[key] = String(data.value);
        });

        obj['comparator'] = this.position.comparator;
        obj['weight'] = this.weight;

        return JSON.stringify(obj);
    },

    checkValidation : function() {
        if(this.options.shortTerm.value < this.options.shortTerm.min || this.options.shortTerm.max < this.options.shortTerm.value)
            return false;
    }
};

var macd = {
    name : 'MACD',
    options : {
        short : {
            name : 'short',
            domain : {
                min : 5,
                max : 120
            },
            value : 12
        },
        long : {
            name : 'long',
            domain : {
                min : 5,
                max : 120
            },
            value : 26
        },
        signal : {
            name : 'signal',
            domain : {
                min : 5,
                max : 90
            },
            value : 9
        }
    },
    position : {
        left : 'MACD',
        right : 'Signal',
        comparator : '>'
    },

    weight : 1,

    init : function(signalConfig) {
        this.options.short.value = signalConfig['short'];
        this.options.long.value = signalConfig['long'];
        this.options.signal.value = signalConfig['signal'];
        this.position.comparator = signalConfig['comparator'];
        this.weight = signalConfig['weight'];
    },

    updateIndicatorData : function(newIndicatorData) {
        this.options.short.value = newIndicatorData.short;
        this.options.long.value = newIndicatorData.long;
        this.options.signal.value = newIndicatorData.signal;
        this.position.comparator = newIndicatorData.comparator;
        this.weight = newIndicatorData.weight;
    },

    parseSettingContent : function($indicatorSetting) {
        var indicatorObject = new Object();

        indicatorObject.short = $indicatorSetting.find('#short').val();
        indicatorObject.long = $indicatorSetting.find('#long').val();
        indicatorObject.signal = $indicatorSetting.find('#signal').val();
        indicatorObject.comparator = $indicatorSetting.find('.position').find('.comparator').text();
        indicatorObject.weight = $indicatorSetting.find('.weight').find('#weight').val();

        return indicatorObject;
    },

    getSettingContent : function() {
        var indicatorSettingContent = '';

        indicatorSettingContent +=
            '                <div class="indicator-setting">\n' +
            '                  <div class="box">\n' +
            '                    <div class="box-header with-border">\n' +
            '                      <h6 class="box-title"><span class="name">' + this.name + '</span></h6>\n' +
            '                    </div>\n' +
            '                    <div class="box-body">\n' +
            '                      <div class="options">\n';

        $.each(this.options, function(key, data) {
            if(data.domain instanceof Array) {
                indicatorSettingContent +=
                    '                        <div class="form-group">\n' +
                    '                          <label>' + data.name + '</label>\n';

                indicatorSettingContent +=
                    '                        <select id="' + key + '" class="w-100 pull-right">\n';

                for(var i=0;i<data.domain.length;++i) {
                    if(data.domain[i] === data.value) {
                        indicatorSettingContent +=
                            '                          <option value="' + data.domain[i] + '" selected>' + data.domain[i] + '</option>\n';
                    }
                    else {
                        indicatorSettingContent +=
                            '                          <option value="' + data.domain[i] + '">' + data.domain[i] + '</option>\n';
                    }
                }

                indicatorSettingContent +=
                    '                        </select>\n' +
                    '                        </div>\n';
            }
            else if(data.domain instanceof Object) {
                indicatorSettingContent +=
                    '                        <div class="form-group">\n' +
                    '                          <label>' + data.name + ' (' + data.domain.min + '~' + data.domain.max + ')' + '</label>\n' +
                    '                          <input class="w-50 text-center pull-right" id="' + key + '" type="text" value="' + data.value + '"">\n' +
                    '                        </div>\n';
            }
            else {
                indicatorSettingContent +=
                    '                        <div class="form-group">\n' +
                    '                          <label>' + data.name + '</label>\n' +
                    '                          <input class="w-50 text-center pull-right" id="' + key + '" type="text" value="' + data.value + '"">\n' +
                    '                        </div>\n';
            }
        });

        indicatorSettingContent +=
            '                        </div>\n' +
            '                        <div class="position">\n' +
            '                          <div class="text-center">\n' +
            '                            <span class="left">' + this.position.left + '</span>\n' +
            '                            <button type="button" class="btn btn-info btn-circle comparator">' + this.position.comparator + '</button>\n' +
            '                            <span class="right">' + this.position.right + '</span>\n' +
            '                          </div>\n' +
            '                        </div>\n';

        indicatorSettingContent +=
            '                        <div class="weight">\n' +
            '                          <div class="form-group">\n' +
            '                            <label>이 지표의 가중치</label>\n' +
            '                            <input class="w-50 text-center" type="number" value="' + this.weight + '" id="weight">\n' +
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
    },

    getDescriptionContent : function() {
        var indicatorDescriptionContent = '';

        indicatorDescriptionContent +=
            '                <div class="indicator-description">\n' +
            '                  <div class="box">\n' +
            '                    <div class="box-header with-border">\n' +
            '                      <h6 class="box-title"><span class="name">' + this.name + '</span></h6>\n' +
            '                    </div>\n' +
            '                    <div class="box-body">\n';

        indicatorDescriptionContent += '<p>Trigger : ' + this.position.left + ' ' + this.position.comparator + ' ' + this.position.right + '</p>';

        indicatorDescriptionContent += '<div class="options">';

        indicatorDescriptionContent += '<p>' + this.options.short.name + ' : ' + this.options.short.value + ' / ' + this.options.long.name + ' : ' + this.options.long.value + ' / ' + this.options.signal.name + ' : ' + this.options.signal.value + '</p>';

        indicatorDescriptionContent +=
            '                      </div>\n' +
            '                    </div>\n' +
            '                    <div class="box-footer">\n' +
            '                      <span>이 지표의 가중치</span>\n' +
            '                      <span class="badge badge-pill badge-info weight">' + this.weight + '</span>\n' +
            '                    </div>\n' +
            '                  </div>\n' +
            '                </div>\n' +
            '              </div>\n';

        return indicatorDescriptionContent;
    },

    getSerialized : function() {
        var obj = new Object();

        $.each(this.options, function(key, data) {
            obj[key] = String(data.value);
        });

        obj['comparator'] = this.position.comparator;
        obj['strength'] = this.weight;

        return JSON.stringify(obj);
    },

    checkValidation : function() {
        if(this.options.shortTerm.value < this.options.shortTerm.min || this.options.shortTerm.max < this.options.shortTerm.value)
            return false;
    }
}


var parabolic_sar = {
    name : 'Parabolic Sar',
    options : {
        minAf : {
            name : 'Min Af',
            domain : {
                min : 0.005,
                max : 0.05
            },
            value : 0.01
        },
        maxAf : {
            name : 'Max Af',
            domain : {
                min : 0.02,
                max : 0.5
            },
            value : 0.2
        }
    },
    position : {
        left: '기준 종가',
        right: 'SAR',
        comparator: '>'
    },

    weight : 1,

    init : function(signalConfig) {
        this.options.minAf.value = signalConfig['minAf'];
        this.options.maxAf.value = signalConfig['maxAf'];
        this.position.comparator = signalConfig['comparator'];
        this.weight = signalConfig['weight'];
    },

    updateIndicatorData : function(newIndicatorData) {
        this.options.minAf.value = newIndicatorData.minAf;
        this.options.maxAf.value = newIndicatorData.maxAf;
        this.position.comparator = newIndicatorData.comparator;
        this.weight = newIndicatorData.weight;
    },

    parseSettingContent : function($indicatorSetting) {
        var indicatorObject = new Object();

        indicatorObject.minAf = $indicatorSetting.find('#minAf').val();
        indicatorObject.maxAf = $indicatorSetting.find('#maxAf').val();
        indicatorObject.comparator = $indicatorSetting.find('.position').find('.comparator').text();
        indicatorObject.weight = $indicatorSetting.find('.weight').find('#weight').val();

        return indicatorObject;
    },

    getSettingContent : function() {
        var indicatorSettingContent = '';

        indicatorSettingContent +=
            '                <div class="indicator-setting">\n' +
            '                  <div class="box">\n' +
            '                    <div class="box-header with-border">\n' +
            '                      <h6 class="box-title"><span class="name">' + this.name + '</span></h6>\n' +
            '                    </div>\n' +
            '                    <div class="box-body">\n' +
            '                      <div class="options">\n';

        $.each(this.options, function(key, data) {
            if(data.domain instanceof Array) {
                indicatorSettingContent +=
                    '                        <div class="form-group">\n' +
                    '                          <label>' + data.name + '</label>\n';

                indicatorSettingContent +=
                    '                        <select id="' + key + '" class="w-100 pull-right">\n';

                for(var i=0;i<data.domain.length;++i) {
                    if(data.domain[i] === data.value) {
                        indicatorSettingContent +=
                            '                          <option value="' + data.domain[i] + '" selected>' + data.domain[i] + '</option>\n';
                    }
                    else {
                        indicatorSettingContent +=
                            '                          <option value="' + data.domain[i] + '">' + data.domain[i] + '</option>\n';
                    }
                }


                indicatorSettingContent +=
                    '                        </select>\n' +
                    '                        </div>\n';
            }
            else if(data.domain instanceof Object) {
                indicatorSettingContent +=
                    '                        <div class="form-group">\n' +
                    '                          <label>' + data.name + ' (' + data.domain.min + '~' + data.domain.max + ')' + '</label>\n' +
                    '                          <input class="w-50 text-center pull-right" id="' + key + '" type="text" value="' + data.value + '"">\n' +
                    '                        </div>\n';
            }
            else {
                indicatorSettingContent +=
                    '                        <div class="form-group">\n' +
                    '                          <label>' + data.name + '</label>\n' +
                    '                          <input class="w-50 text-center pull-right" id="' + key + '" type="text" value="' + data.value + '"">\n' +
                    '                        </div>\n';
            }
        });

        indicatorSettingContent +=
            '                        </div>\n' +
            '                        <div class="position">\n' +
            '                          <div class="text-center">\n' +
            '                            <span class="left">' + this.position.left + '</span>\n' +
            '                            <button type="button" class="btn btn-info btn-circle comparator">' + this.position.comparator + '</button>\n' +
            '                            <span class="right">' + this.position.right + '</span>\n' +
            '                          </div>\n' +
            '                        </div>\n';

        indicatorSettingContent +=
            '                        <div class="weight">\n' +
            '                          <div class="form-group">\n' +
            '                            <label>이 지표의 가중치</label>\n' +
            '                            <input class="w-50 text-center" type="number" value="' + this.weight + '" id="weight">\n' +
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
    },

    getDescriptionContent : function() {
        var indicatorDescriptionContent = '';

        indicatorDescriptionContent +=
            '                <div class="indicator-description">\n' +
            '                  <div class="box">\n' +
            '                    <div class="box-header with-border">\n' +
            '                      <h6 class="box-title"><span class="name">' + this.name + '</span></h6>\n' +
            '                    </div>\n' +
            '                    <div class="box-body">\n';

        indicatorDescriptionContent += '<p>Trigger : ' + this.position.left + ' ' + this.position.comparator + ' ' + this.position.right + '</p>';

        indicatorDescriptionContent += '<div class="options">';

        indicatorDescriptionContent += '<p>' + this.options.minAf.name + ' : ' + this.options.minAf.value + ' / ' + this.options.maxAf.name + ' : ' + this.options.maxAf.value + '</p>';

        indicatorDescriptionContent +=
            '                      </div>\n' +
            '                    </div>\n' +
            '                    <div class="box-footer">\n' +
            '                      <span>이 지표의 가중치</span>\n' +
            '                      <span class="badge badge-pill badge-info weight">' + this.weight + '</span>\n' +
            '                    </div>\n' +
            '                  </div>\n' +
            '                </div>\n' +
            '              </div>\n';

        return indicatorDescriptionContent;
    },

    getSerialized : function() {
        var obj = new Object();

        $.each(this.options, function(key, data) {
            obj[key] = String(data.value);
        });

        obj['comparator'] = this.position.comparator;
        obj['strength'] = this.weight;

        return JSON.stringify(obj);
    },

    checkValidation : function() {
        if(this.options.shortTerm.value < this.options.shortTerm.min || this.options.shortTerm.max < this.options.shortTerm.value)
            return false;
    }
}

var bollinger_bands = {
    name : 'Bollinger Bands',
    options : {
        period : {
            name : 'Period',
            domain : {
                min : 5,
                max : 300
            },
            value : 100
        },
        standardDeviations : {
            name : 'Standard Deviations',
            value : 1.1
        },
        positionIndex : {
            name : 'Position Index',
            domain : {
                min : -200,
                max : 300
            },
            value : 120
        }
    },
    position : {
        left: '기준 종가',
        right: 'Position Index',
        comparator: '>'
    },
    weight : 1,

    init : function(signalConfig) {
        this.options.period.value = signalConfig['period'];
        this.options.standardDeviations.value = signalConfig['standardDeviations'];
        this.options.positionIndex.value = signalConfig['positionIndex'];
        this.position.comparator = signalConfig['comparator'];
        this.weight = signalConfig['weight'];
    },

    updateIndicatorData : function(newIndicatorData) {
        this.options.period.value = newIndicatorData.period;
        this.options.standardDeviations.value = newIndicatorData.standardDeviations;
        this.options.positionIndex.value = newIndicatorData.positionIndex;
        this.position.comparator = newIndicatorData.comparator;
        this.weight = newIndicatorData.weight;
    },

    parseSettingContent : function($indicatorSetting) {
        var indicatorObject = new Object();

        indicatorObject.period = $indicatorSetting.find('#period').val();
        indicatorObject.standardDeviations = $indicatorSetting.find('#standardDeviations').val();
        indicatorObject.positionIndex = $indicatorSetting.find('#positionIndex').val();
        indicatorObject.comparator = $indicatorSetting.find('.position').find('.comparator').text();
        indicatorObject.weight = $indicatorSetting.find('.weight').find('#weight').val();

        return indicatorObject;
    },

    getSettingContent : function() {
        var indicatorSettingContent = '';

        indicatorSettingContent +=
            '                <div class="indicator-setting">\n' +
            '                  <div class="box">\n' +
            '                    <div class="box-header with-border">\n' +
            '                      <h6 class="box-title"><span class="name">' + this.name + '</span></h6>\n' +
            '                    </div>\n' +
            '                    <div class="box-body">\n' +
            '                      <div class="options">\n';

        $.each(this.options, function(key, data) {
            if(data.domain instanceof Array) {
                indicatorSettingContent +=
                    '                        <div class="form-group">\n' +
                    '                          <label>' + data.name + '</label>\n';

                indicatorSettingContent +=
                    '                        <select id="' + key + '" class="w-100 pull-right">\n';

                for(var i=0;i<data.domain.length;++i) {
                    if(data.domain[i] === data.value) {
                        indicatorSettingContent +=
                            '                          <option value="' + data.domain[i] + '" selected>' + data.domain[i] + '</option>\n';
                    }
                    else {
                        indicatorSettingContent +=
                            '                          <option value="' + data.domain[i] + '">' + data.domain[i] + '</option>\n';
                    }
                }


                indicatorSettingContent +=
                    '                        </select>\n' +
                    '                        </div>\n';
            }
            else if(data.domain instanceof Object) {
                indicatorSettingContent +=
                    '                        <div class="form-group">\n' +
                    '                          <label>' + data.name + ' (' + data.domain.min + '~' + data.domain.max + ')' + '</label>\n' +
                    '                          <input class="w-50 text-center pull-right" id="' + key + '" type="text" value="' + data.value + '"">\n' +
                    '                        </div>\n';
            }
            else {
                indicatorSettingContent +=
                    '                        <div class="form-group">\n' +
                    '                          <label>' + data.name + '</label>\n' +
                    '                          <input class="w-50 text-center pull-right" id="' + key + '" type="text" value="' + data.value + '"">\n' +
                    '                        </div>\n';
            }
        });

        indicatorSettingContent +=
            '                        </div>\n' +
            '                        <div class="position">\n' +
            '                          <div class="text-center">\n' +
            '                            <span class="left">' + this.position.left + '</span>\n' +
            '                            <button type="button" class="btn btn-info btn-circle comparator">' + this.position.comparator + '</button>\n' +
            '                            <span class="right">' + this.position.right + '</span>\n' +
            '                          </div>\n' +
            '                        </div>\n';

        indicatorSettingContent +=
            '                        <div class="weight">\n' +
            '                          <div class="form-group">\n' +
            '                            <label>이 지표의 가중치</label>\n' +
            '                            <input class="w-50 text-center" type="number" value="' + this.weight + '" id="weight">\n' +
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
    },

    getDescriptionContent : function() {
        var indicatorDescriptionContent = '';

        indicatorDescriptionContent +=
            '                <div class="indicator-description">\n' +
            '                  <div class="box">\n' +
            '                    <div class="box-header with-border">\n' +
            '                      <h6 class="box-title"><span class="name">' + this.name + '</span></h6>\n' +
            '                    </div>\n' +
            '                    <div class="box-body">\n';

        indicatorDescriptionContent += '<p>Trigger : ' + this.position.left + ' ' + this.position.comparator + ' ' + this.position.right + '</p>';

        indicatorDescriptionContent += '<div class="options">';

        indicatorDescriptionContent += '<p>' + this.options.period.name + ' : ' + this.options.period.value + ' / ' + this.options.standardDeviations.name + ' : ' + this.options.standardDeviations.value + ' / ' + this.options.positionIndex.name + ' : ' + this.options.positionIndex.value + '</p>';

        indicatorDescriptionContent +=
            '                      </div>\n' +
            '                    </div>\n' +
            '                    <div class="box-footer">\n' +
            '                      <span>이 지표의 가중치</span>\n' +
            '                      <span class="badge badge-pill badge-info weight">' + this.weight + '</span>\n' +
            '                    </div>\n' +
            '                  </div>\n' +
            '                </div>\n' +
            '              </div>\n';

        return indicatorDescriptionContent;
    },

    getSerialized : function() {
        var obj = new Object();

        $.each(this.options, function(key, data) {
            obj[key] = String(data.value);
        });

        obj['comparator'] = this.position.comparator;
        obj['strength'] = this.weight;

        return JSON.stringify(obj);
    },

    checkValidation : function() {
        if(this.options.shortTerm.value < this.options.shortTerm.min || this.options.shortTerm.max < this.options.shortTerm.value)
            return false;
    }
}

/*
var rsi = {
    'options' : {
        'Period' : {
            'min' : 5,
            'max' : 300,
            'value' : 25
        },
        'Position Index' : {
            'min' : 0,
            'max' : 100,
            'value' : 60
        }
    },
    'position' : {
        'left': '( Period ' + options['Period']['value'] + ' ) RSI',
        'right': options['Position Index']['value'],
        'comparator': '>='
    }
}

var stochastic_fast = {
    'options' : {
        'Fast K' : {
            'min' : 1,
            'max' : 300,
            'value' : 50
        },
        'Fast D' : {
            'min' : 1,
            'max' : 300,
            'value' : 10
        },
        'K or D' : {
            'class' : ['K', 'D'],
            'value' : 'K'
        },
        'Position Index' : {
            'value' : 80
        }
    },
    'position' : {
        'left': '( Fast K ' + options['Fast K']['value'] + ', Fast D ' + options['Fast D']['value'] + ' ) %' + options['K or D']['value'],
        'right': options['Position Index'] + '%',
        'comparator': '>'
    }
}

//보류...
var price_comparison = {
    'options' : {
        'L-Type' : {
            'class' : ['OPEN', 'HIGH', 'LOW', 'CLOSE', 'Sma', 'Tma', 'Wma', 'Tma', 'Highest', 'Lowest'],
            'value' : 'Sma'
        },
        'L-Period' : {
            'min' : 0,
            'max' : 300,
            'value' : 19
        },
        'R-Type' : {
            'class' : ['OPEN', 'HIGH', 'LOW', 'CLOSE', 'Sma', 'Tma', 'Wma', 'Tma', 'Highest', 'Lowest'],
            'value' : 'Sma'
        },
        'K or D' : {
            'class' : ['K', 'D'],
            'value' : 'K'
        },
        'Position Index' : {
            'value' : 80
        }
    },
    'position' : {
        'left': '( Fast K ' + options['Fast K']['value'] + ', Fast D ' + options['Fast D']['value'] + ' ) %' + options['K or D']['value'],
        'right': options['Position Index'] + '%',
        'comparator': '>'
    }
}
*/

var indicators = {
    'MACD' : macd,
    'MADouble' : ma_double,
    'ParabolicSAR' : parabolic_sar,
    'BollingerBands' : bollinger_bands
//    'RSI' : rsi,
//    'Stochastic(Fast)' : stochastic_fast
}
