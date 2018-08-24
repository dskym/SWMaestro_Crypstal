$(function () {
    "use strict";

    $(document).on('click', '.safety', function () {
        $('#modal-safety').modal();
    });

    $('#modal-safety').on('show.bs.modal', function() {
        var $safety = $('#safety');

        //value setting
        $safety.find('.profit-target-value').text($('#input-profit-target').attr('placeholder'));
        $safety.find('.stop-loss-value').text($('#input-stop-loss').attr('placeholder'));
        $safety.find('.trailing-stop-high-value').text($('#input-trailing-stop-high').attr('placeholder'));
        $safety.find('.trailing-stop-low-value').text($('#input-trailing-stop-low').attr('placeholder'));
    });

    /*
    * Need to thinking more.
    */
    $('#modal-safety').on('hide.bs.modal', function() {
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
});
