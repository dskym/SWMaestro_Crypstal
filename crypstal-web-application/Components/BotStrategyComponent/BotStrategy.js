$(function () {
    "use strict";

    $(document).on('change', 'div.strategy-selector', function () {
        const botStrategyName = $(this).find(":selected").val();
        let strategyComponent;

        switch(botStrategyName) {
            case 'HighLowStrategy':
                strategyComponent = makeHighLowStrategyComponent();
                break;
            case 'ReinforceLearningStrategy':
                strategyComponent = makeReinforceLearningStrategyComponent();
                break;
            default:
                break;
        }

        let $strategySetting = $('div.strategy-setting');
        $strategySetting.empty();
        $strategySetting.append(strategyComponent);
    });

    function makeHighLowStrategyComponent() {
        let content = `
            <div class="form-group">
                <label>구입 금액</label>
                <input class="form-control" type="text" placeholder="구입 금액을 입력해주세요." />
            </div>
            <div class="form-group">
                <label>판매 금액</label>
                <input class="form-control" type="text" placeholder="판매 금액을 입력해주세요"/>
            </div>
        `;

        return content;
    }

    function makeReinforceLearningStrategyComponent() {
        let content = `
            <div class="form-group">
                <label>구입 금액</label>
                <input class="form-control" type="text" placeholder="구입 금액을 입력해주세요." />
            </div>
            <div class="form-group">
                <label>판매 금액</label>
                <input class="form-control" type="text" placeholder="판매 금액을 입력해주세요"/>
            </div>
        `;

        return content;
    }});