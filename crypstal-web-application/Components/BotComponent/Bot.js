$(function () {
    "use strict";

    $(document).on('click', 'div.bot-list-component .bot-setting', function () {
        $('#modal-bot-setting').modal();
    });

    function makeBotAddComponent() {
        let content = `
            <div class="box bot-setting">
                <div class="box-body text-center">
                    <img src="../images/bot-add.png">
                </div>
            </div>
        `;

        return content;
    }

    function makeBotComponent(bot) {
        let content = `
                <div class="box bot-setting">
                    <div class="box-header">
                        <ul class="box-controls pull-right">
                          <li><a class="box-btn-close" href="#" /></li>
                        </ul>
                    </div>
                    <div class="blog-container">
                        <div class="blog-header">
                            <div class="blog-author--no-cover text-center">
                                <h3>${bot['name']}</h3>
                            </div>
                        </div>
    
                        <div class="blog-body">
                            <div class="blog-title text-center">
                                <h4>수익률 +100%</h4>
                            </div>
                            
                            <div class="blog-summary text-center">
                                <span>1,100,000 원</span>
                            </div>
                                                                        
                            <div class="blog-tags">
                                <ul>
                                    <li>${bot['exchange']}</li>
                                    <li>${bot['coin']}</li>
                                    <li>${bot['period']}</li>
                                </ul>
                            </div>
                            
                            <div class="blog-buttons">
                                <button class="btn btn-info backtest">백테스팅</button>
                                <button class="btn btn-info report">결과보기</button>
                            </div>
                        </div>
    
                        <div class="blog-footer">
                            <ul>
                                <li>
                                    <label>챗봇 알림</label>
                                    <button type="button" class="btn btn-sm btn-toggle btn-success active" data-toggle="button" aria-pressed="true" />
                                </li>
                                <li>
                                    <label>자동 거래</label>
                                    <button type="button" class="btn btn-sm btn-toggle btn-success active" data-toggle="button" aria-pressed="true" />
                                </li>
                            </ul>					  
                        </div>
                    </div>
                </div>
        `;

        return content;
    }

    function makeBotListComponent() {
        let botsComponent = '<div class="box-deck">';

        $.each(botListData, function(index, botData) {
            if(index !== 0 && index % 4 === 0) {
                botsComponent += '</div>';
                botsComponent += '<div class="box-deck">';
                botsComponent += makeBotComponent(botData);
            } else {
                botsComponent += makeBotComponent(botData);
            }

        });

        if(botListData.length % 4 !== 0)
            botsComponent += makeBotAddComponent();

        botsComponent += '</div>';

        if(botListData.length % 4 === 0) {
            botsComponent += '<div class="box-deck">';
            botsComponent += makeBotAddComponent();
            botsComponent += '</div>';
        }

        let content = `
            <div class="bot-list-component">
                ${botsComponent}
            </div>
        `;

        return content;
    }

    function drawBotListComponent() {
        let component = makeBotListComponent();

        let $content = $('div.content');
        $content.append(component);
    }

    drawBotListComponent();
});