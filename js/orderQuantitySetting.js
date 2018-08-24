$(function () {
    "use strict";

    /*
    * Need to thinking more.
    */
    $(document).on('click', '.order-quantity', function () {
        var coinName = $('#bot-coin option:selected').val();

        $('#modal-order-quantity .order-quantity-coin').text(coinName);

        $('input[name="buy-krw"]').attr('placeholder', '100,000 KRW');
        $('input[name="sell-krw"]').attr('placeholder', '100,000 KRW');
        $('input[name="buy-coin"]').attr('placeholder', '1.1 ' + coinName);
        $('input[name="sell-coin"]').attr('placeholder', '1.1 ' + coinName);

        $('#modal-order-quantity').modal();
    });

    /*
    * If user decide to order quantit data to set, user press submit button.
    * Then, send data to server. and change bot status.
    */
    $(document).on('click', '#modal-order-quantity button[type="submit"]', function () {
        var coinName = $('#bot-coin option:selected').val();
        var $orderQuantity = $('div.bot-list').find('div.tab-pane.active').find('div.order-quantity');

        //setting buy part.
        $('.buy li').each( function (index) {
            var selectedTab = $(this).children().hasClass('active');

            if(selectedTab === true && index === 0) {
                $orderQuantity.find('.order-quantity-buy').text('100% (All-in)');
            }
            else if(selectedTab === true && index === 1) {
                var buykrw = $('input[name="buy-krw"]').val();

                $orderQuantity.find('.order-quantity-buy').text(Number(buykrw).toLocaleString('en') + ' KRW');
            }
            else if(selectedTab === true && index === 2) {
                var buycoin = $('input[name="buy-coin"]').val();

                $orderQuantity.find('.order-quantity-buy').text(Number(buycoin).toLocaleString('en') + ' ' + coinName);
            }
        });

        //setting sell part.
        $('.sell li').each( function (index) {
            var selectedtab = $(this).children().hasClass('active');

            if(selectedtab === true && index === 0) {
                $orderQuantity.find('.order-quantity-sell').text('100% (All-in)');
            }
            else if(selectedtab === true && index === 1) {
                var sellkrw = $('input[name="sell-krw"]').val();

                $orderQuantity.find('.order-quantity-sell').text(Number(sellkrw).toLocaleString('en') + ' KRW');
            }
            else if(selectedtab === true && index === 2) {
                var sellcoin = $('input[name="sell-coin"]').val();

                $orderQuantity.find('.order-quantity-sell').text(Number(sellcoin).toLocaleString('en') + ' ' + coinName);
            }
        });

        //appear to bot status save button.
        $('.box-save').css('display', 'block');

        $('#modal-order-quantity').modal('hide');
    });
});