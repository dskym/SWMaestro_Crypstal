$(function () {
    "use strict";

    $('.profit-target-value').text($('#input-profit-target').attr('placeholder'));
    $('.stop-loss-value').text($('#input-stop-loss').attr('placeholder'));
    $('.trailing-stop-high-value').text($('#input-trailing-stop-high').attr('placeholder'));
    $('.trailing-stop-low-value').text($('#input-trailing-stop-low').attr('placeholder'));

    $(document).on('keyup', '#input-profit-target', function () {
        var value = $(this).val();

        if(value !== "")
            $('.profit-target-value').text(value);
    });

    $(document).on('keyup', '#input-stop-loss', function () {
        var value = $(this).val();

        if(value !== "")
            $('.stop-loss-value').text(value);
    });

    $(document).on('keyup', '#input-trailing-stop-high', function () {
        var value = $(this).val();

        if(value !== "")
            $('.trailing-stop-high-value').text(value);
    });

    $(document).on('keyup', '#input-trailing-stop-low', function () {
        var value = $(this).val();

        if(value !== "")
            $('.trailing-stop-low-value').text(value);
    });

    //botSettingInfo.botalarm = $('.bot-list #bot-alarm').is(":checked");
    //botSettingInfo.autotrade = $('.bot-list #auto-trade').is(":checked");
});
