$(function () {
    "use strict";

    /*
    * If user want to set trading strategy, click setting area.
    */
    $(document).on('click', '.strategy-setting', function () {
        $('#modal-bot-strategy').modal();
    });

    /*
    * Show Strategy selector content.
    */
    $('#modal-bot-strategy').on('show.bs.modal', function () {
        //load before data.
    });

    /*
    * Reset bot description data in bot step modal.
    */
    $('#modal-bot-step').on('hide.bs.modal', function () {
        //clear UI data.
    });

    /*
    * Redraw UI.
    */
    $(document).on('change', 'div.strategyList', function () {
        var $strategyList = $(this);

        var strategyName = $strategyList.find(":selected").val();

        console.log(strategyName);

        // Redraw UI
        var $botStrategy = $('#modal-bot-strategy').find('div.strategySetting');
        var data = makeHighLowStrategyUI();

        $botStrategy.append(data);
    });

    /*
    * Save Strategy in Bot.
    */
    $(document).on('click', '#modal-bot-strategy button[type="submit"]', function () {
        // Submit

        $('#modal-bot-step').modal('hide');
    });

    function makeHighLowStrategyUI() {
        var strategyContent = '';

        strategyContent +=
            '            <div class="HighLowStrategy">\n' +
            '               <div class="box">\n' +
            '                   <div class="box-body">\n' +
            '                       <div class="form-group">\n' +
            '                           <label>매도 가격</label>\n' +
            '                           <input class="w-100 text-center" type="text">\n' +
            '                       </div>\n' +
            '                       <div class="form-group">\n' +
            '                           <label>매수 가격</label>\n' +
            '                           <input class="w-100 text-center" type="text">\n' +
            '                       </div>\n' +
            '                   </div>\n'+
            '               </div>\n' +
            '            </div>\n';

        return strategyContent;
    };
});