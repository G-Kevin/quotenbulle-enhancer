setTimeout(() => {
    try {
        // as plugins are executed in an isolated environment, we have to append our custom functions to the body
        var $functionsToAppend = $('<script type="text/javascript">'
            + 'var lookupBookiesExcel = ' + JSON.stringify(lookupBookiesExcel) + ';'
            + 'var orbitCommission = "' + orbitCommission + '";'
            + 'var orbitCommissionOnWinnings = "' + orbitCommissionOnWinnings + '";'
            + 'var orbitLandingDomain = "' + orbitLandingDomain + '";'
            + 'var orbitNameInExcel = "' + orbitNameInExcel + '";'
            + addFragmentToExcelString.toString()
            + copyToClipboard.toString()
            + createAndCopyExcelStringToClipboard.toString()
            + getExcelBookieForQBString.toString()
            + renameOrbitDomain.toString()
            + translateCommissionForExcel.toString()
            + "renameOrbitDomain(orbitLandingDomain);" // call to replace the orbit domain
            + '</script>');
        $functionsToAppend.appendTo($("body"));

        // button to copy all game information to the clipboard
        createCopyToExcelButton();

        if (window.location.pathname === "/tools/kombirechner/") {
            // set listener on input fields to trigger formatter after every change
            $("input[id^='input_back_odds_']").on("change paste keyup propertychange input", function() {
                formatLayStakeLiabilityValues(orbitLandingDomain);
            });
            $("input[id^='input_lay_odds_']").on("change paste keyup propertychange input", function() {
                formatLayStakeLiabilityValues(orbitLandingDomain);
            });

            // trigger initially to format the values after loading page
            formatLayStakeLiabilityValues(orbitLandingDomain);
        }
    } catch (e) {
        console.error("ERROR in QB Enhancer: ", e.message);
    }
}, 100);