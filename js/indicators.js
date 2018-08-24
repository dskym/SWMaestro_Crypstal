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

var ma_double = {
    'options' : {
        'Short length' : {
            'min' : 5,
            'max' : 300,
            'value' : 55
        },
        'Short MA Type' : {
            'class' : ['Sma', 'Ema', 'Wma', 'Tma'],
            'value' : 'Sma'
        },
        'Long length' : {
            'min' : 5,
            'max' : 300,
            'value' : 130
        },
        'Long MA Type' : {
            'class' : ['Sma', 'Ema', 'Wma', 'Tma'],
            'value' : 'Sma'
        }
    },
    'position' : {
        'left': 'Short',
        'right': 'Long',
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

var indicators = {
    'MACD' : macd,
    'MA Double' : ma_double,
    'Parabolic SAR' : parabolic_sar,
    'Bollinger Bands' : bollinger_bands,
    'RSI' : rsi,
    'Stochastic(Fast)' : stochastic_fast
}
