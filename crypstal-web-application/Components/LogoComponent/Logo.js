$(function () {
    "use strict";

    function makeLogoComponent() {
        let content = `
                  <div class="logo pl-0">
                        <a href="index.html" class="logo">
                            <b class="logo-mini">
                                <img src="../images/logo.png" alt="logo"/>
                            </b>
                            <span class="logo-lg">
                            <h2>Crypstal</h2>
                            </span>
                        </a>
                    </div>
        `;

        return content;
    }

    function drawLogoComponent() {
        let component = makeLogoComponent();

        let $mainHeader = $('header.main-header');
        $mainHeader.find('#logo').append(component);
    }

    drawLogoComponent();
});