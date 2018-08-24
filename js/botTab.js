$(function () {
    "use strict";

    var botListUrl = 'http://crypstal-env.7xcrjvhg9m.ap-northeast-2.elasticbeanstalk.com/v1/bots/';

    $.getJSON(botListUrl, function () {
        console.log('Success Load Bot List');
    }).done(function (botLists) {

    });
});