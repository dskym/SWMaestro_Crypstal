$(function () {
    "use strict";

    /*
    * If user want to change asset assigned to bot, click asset area.
    * Appear asset setting modal.
    */
    $(document).on('click', 'div.asset', function () {
        $('#modal-asset').modal();
    });

    /*
    * If user decide to asset assigned to bot, user press submit button.
    * Then, send change request to server.
    */
    $('#modal-asset').on('show.bs.modal', function() {
        var asset = $('div.bot-list').find('div.tab-pane.active').find('div.asset').find('label').text();

        var reg = /[^0-9]/g;

        asset = asset.replace(reg, '');
        asset = Number(asset).toLocaleString('en');

        $('#modal-asset').find('input[name="asset"]').val(asset);
    });

    /*
    * Clear asset input.
    */
    $('#modal-bot-step').on('hide.bs.modal', function() {
        $('#modal-asset').find('input[name="asset"]').val(0);
    });

    /*
    * If user decide to asset assigned to bot, user press submit button.
    * Then, send change request to server.
    */
    $(document).on('click', '#modal-asset button[type="submit"]', function () {
        var $currentBot = $('div.bot-list').find('div.tab-pane.active')
        var newAsset = $('#modal-asset').find('input[name="asset"]').val();

        var reg = /[^0-9]/g;
        newAsset = newAsset.replace(reg, '');

        //send change request to server.

        //draw UI
        var $asset = $currentBot.find('div.asset').find('label');
        $asset.text(Number(newAsset).toLocaleString('en') + ' KRW');

        $currentBot.find('div.box-save').css('display', 'block');

        $('#modal-asset').modal('hide');
    });
});
