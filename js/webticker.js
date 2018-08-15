$(function () {
    "use strict";

    if ($('#webticker-6').length) {
        $("#webticker-6").webTicker({
            height:'auto',
            duplicate:true,
            startEmpty:false,
            rssfrequency:5,
            direction: 'right'
        });
    }
});