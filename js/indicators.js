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
    init : function(signalConfig) {
        this.options.shortTerm.value = signalConfig['shortTerm'];
        this.options.longTerm.value = signalConfig['longTerm'];
        this.position.comparator = signalConfig['comparator'];
        this.weight = signalConfig['strength'];
    },
    getSettingContent : function() {

    },
    getDescriptionContent : function() {
        var indicatorDescriptionContent = '';

        var index = 0;

        indicatorDescriptionContent +=
            '                <div class="indicator-description">\n' +
            '                  <div class="box">\n' +
            '                    <div class="box-header with-border">\n' +
            '                      <h6 class="box-title"><span class="name">' + this.name + '</span></h6>\n' +
            '                    </div>\n' +
            '                    <div class="box-body">\n';

        indicatorDescriptionContent += '<p>Trigger : ';

        $.each(this.position, function(key, value) {
            indicatorDescriptionContent += '<span class="' + key + '">' + value + '</span>' + ' ';
        });

        var setting = '';

        indicatorDescriptionContent += '</p>';
        indicatorDescriptionContent += '<div class="options">';

        $.each(this.options, function(key, value) {
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
            '                      <span class="badge badge-pill badge-info weight">' + this.weight + '</span>\n' +
            '                    </div>\n' +
            '                  </div>\n' +
            '                </div>\n' +
            '              </div>\n';

        return indicatorDescriptionContent;
    },
    checkValidation : function() {
        if(this.options.shortTerm.value < this.options.shortTerm.min || this.options.shortTerm.max < this.options.shortTerm.value)
            return false;
    }
}

/*

var macd = {
    'options' : {
        'short' : {
            'min' : 5,
            'max' : 120,
            'value' : 12
        },
        'long' : {
            'min' : 5,
            'max' : 120,
            'value' : 26
        },
        'signal' : {
            'min' : 5,
            'max' : 90,
            'value' : 9
        }
    },
    'position' : {
        'left': 'MACD',
        'right': 'Signal',
        'comparator': '>'
    }


}


var parabolic_sar = {
    'options' : {
        'Min Af' : {
            'min' : 0.005,
            'max' : 0.05,
            'value' : 0.01
        },
        'Max Af' : {
            'min' : 0.02,
            'max' : 0.5,
            'value' : 0.2
        }
    },
    'position' : {
        'left': '기준 종가',
        'right': 'SAR',
        'comparator': '>'
    }
}

var bollinger_bands = {
    'options' : {
        'Period' : {
            'min' : 5,
            'max' : 300,
            'value' : 100
        },
        'Standard Deviations' : {
            'value' : 1.1
        },
        'Position Index' : {
            'min' : -200,
            'max' : 300,
            'value' : 120
        }
    },
    'position' : {
        'left': '기준 종가',
        'right': 'Position Index',
        'comparator': '>'
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
//    'MACD' : macd,
    'MADouble' : ma_double
//    'ParabolicSAR' : parabolic_sar,
//    'BollingerBands' : bollinger_bands,
//    'RSI' : rsi,
//    'Stochastic(Fast)' : stochastic_fast
}
