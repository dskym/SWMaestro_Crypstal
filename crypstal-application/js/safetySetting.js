$(function () {
    "use strict";

    $(document).on('click', '.safety', function () {
        $('#modal-safety').modal();
    });

    /*
    * Set safety data.
    */
    $('#modal-safety').on('show.bs.modal', function() {
        var $safety = $('#safety');

        //value setting
        $safety.find('.profit-target-value').text($('#input-profit-target').attr('placeholder'));
        $safety.find('.stop-loss-value').text($('#input-stop-loss').attr('placeholder'));
        $safety.find('.trailing-stop-high-value').text($('#input-trailing-stop-high').attr('placeholder'));
        $safety.find('.trailing-stop-low-value').text($('#input-trailing-stop-low').attr('placeholder'));

        $safety.find('#checkbox-profit-target').attr('checked', false);
        $safety.find('#checkbox-stop-loss').attr('checked', false);
        $safety.find('#checkbox-trailing-stop').attr('checked', false);
        $safety.find('#checkbox-position-change').attr('checked', false);
        $safety.find('#checkbox-sell-exit').attr('checked', false);
        $safety.find('#checkbox-safety-exit').attr('checked', false);
    });

    /*
    * Reset safety data.
    */
    $('#modal-safety').on('hide.bs.modal', function() {
        var $safety = $('#safety');

        $safety.find('.profit-target-value').text('');
        $safety.find('.stop-loss-value').text('');
        $safety.find('.trailing-stop-high-value').text('');
        $safety.find('.trailing-stop-low-value').text('');

        $safety.find('#checkbox-profit-target').attr('checked', false);
        $safety.find('#checkbox-stop-loss').attr('checked', false);
        $safety.find('#checkbox-trailing-stop').attr('checked', false);
        $safety.find('#checkbox-position-change').attr('checked', false);
        $safety.find('#checkbox-sell-exit').attr('checked', false);
        $safety.find('#checkbox-safety-exit').attr('checked', false);
    });

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

    $(document).on('click', '#modal-safety button[type="submit"]', function () {

        $('#modal-safety').modal('hide');
    });
});
