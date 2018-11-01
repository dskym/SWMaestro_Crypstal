$(function () {
    "use strict";

    $(document).on('change', 'div.strategy-selector', function () {
        const botStrategyName = $(this).find(":selected").val();
        let component;

        switch(botStrategyName) {
            case 'HighLowStrategy':
                component = makeHighLowStrategyComponent();
                break;
            default:
                break;
        }

        let $strategySetting = $('div.strategy-setting');
        $strategySetting.append(component);
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
});