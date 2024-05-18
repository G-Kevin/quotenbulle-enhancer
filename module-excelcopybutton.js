function createAndCopyExcelStringToClipboard(orbitLandingDomain) {
    url = window.location.pathname;
    var status_offen = "Offen";
    var status_todo = "ToDo";
    var excelString = "";
    var category = "Pre-Game";
    var sport = "Fußball";
    var betType = "1X2";
    var league = "";
    try {
        // works in Kombirechner as well, because QB uses invalid HTML5 and reuses the same ID for all the bookie pictures
        var bookie = /[^/]*$/.exec(document.getElementById("bookie_type_img").src)[0];
        bookie = getExcelBookieForQBString(bookie);
    } catch {
        // sometimes, link is not present, use the logo above instead
        try {
            var bookie = /[^/]*$/.exec(document.getElementById("bookie_image").src)[0];
            bookie = getExcelBookieForQBString(bookie);
        } catch {
            var bookie = "";
        }
    }

    var comissionOnWinningsLay = orbitCommissionOnWinnings;

    if (url === "/tools/rechner/") {
        var dropdownListCommissionBack = document.getElementById("tax_germany");
    } else {
        var dropdownListCommissionBack = document.getElementById("select_tax_germany");
    }

    var comissionOnWinningsBack = dropdownListCommissionBack.options[dropdownListCommissionBack.selectedIndex].text.includes("vom Nettogewinn") ? "j" : "";

    switch (dropdownListCommissionBack.options[dropdownListCommissionBack.selectedIndex].value) {
        case "no_tax":
            var commissionBack = "0";
            break;
        case "tax_to_105":
            var commissionBack = "4,77";
            break;
        case "tax_to_100":
            var commissionBack = "5";
            break;
        case "tax_53_to_105":
            var commissionBack = "5,03";
            break;
        case "tax_53_to_100":
            var commissionBack = "5,3";
            break;
        case "tax_to_105_netto":
            var commissionBack = "4,77";
            break;
        case "tax_to_100_netto":
            var commissionBack = "5";
            break;
        default:
            throw "Unknown commission type for back!"
    }
    commissionBack = translateCommissionForExcel(commissionBack);
    var commissionLay = translateCommissionForExcel(orbitCommission);

    if (url === "/tools/rechner/") {
        // handle Bullenrechner
        try {
            var date = document.getElementById("calc_date").innerHTML.replace(/\s-\s.*/g, '').replace(/(\d{2})\.(\d{2})\.(\d{2})/g, '$1.$2.20$3');
        } catch {
            var date = "";
        }

        try {
            var event = document.getElementById("calc_event").getElementsByTagName('strong')[0].innerHTML;
        } catch {
            var event = "";
        }

        try {
            var ergebnis = document.getElementById("calc_outcome").innerHTML;
            var mannschaft1 = event.replace(/\s-\s.*/g, '');
            var tipBack = ergebnis === mannschaft1 ? "1" : ergebnis === "Unentschieden" ? "X" : "2";
            var tipLay = "lay" + tipBack;
        } catch {
            var tipBack = "";
            var tipLay = "";
        }

        var dropdownListBetMode = document.getElementById("bet_mode");
        var selectedDropdownListBetMode = dropdownListBetMode.options[dropdownListBetMode.selectedIndex].text;

        var stakeBack = selectedDropdownListBetMode.includes("Freiwette") ? ("=" + document.getElementById("stake_bookie").value) + "-" + document.getElementById("stake_bookie").value : document.getElementById("stake_bookie").value;
        var stakeLay = document.getElementById("liability_layer").value;
        var oddBack = document.getElementById("odds_bookie").value;
        var oddLay = document.getElementById("odds_layer").value;
        oddLay = "=" + oddLay + "/(" + oddLay + "-1)";

        // first line, back
        excelString += addFragmentToExcelString(date);
        excelString += addFragmentToExcelString("");
        excelString += addFragmentToExcelString(category);
        excelString += addFragmentToExcelString(sport);
        excelString += addFragmentToExcelString(league);
        excelString += addFragmentToExcelString(event);
        excelString += addFragmentToExcelString(betType);
        excelString += addFragmentToExcelString(tipBack);
        excelString += addFragmentToExcelString(stakeBack);
        excelString += addFragmentToExcelString(oddBack);
        excelString += addFragmentToExcelString(comissionOnWinningsBack ? "j" : "");
        excelString += addFragmentToExcelString(commissionBack);
        excelString += addFragmentToExcelString(bookie);
        excelString += addFragmentToExcelString(status_offen, false, true);

        // second line, lay
        excelString += addFragmentToExcelString(date);
        excelString += addFragmentToExcelString("");
        excelString += addFragmentToExcelString(category);
        excelString += addFragmentToExcelString(sport);
        excelString += addFragmentToExcelString(league);
        excelString += addFragmentToExcelString(event);
        excelString += addFragmentToExcelString(betType);
        excelString += addFragmentToExcelString(tipLay);
        excelString += addFragmentToExcelString(stakeLay);
        excelString += addFragmentToExcelString(oddLay);
        excelString += addFragmentToExcelString(comissionOnWinningsLay ? "j" : "");
        excelString += addFragmentToExcelString(commissionLay);
        excelString += addFragmentToExcelString(orbitNameInExcel);
        excelString += addFragmentToExcelString(status_offen, false);
    } else if (url === "/tools/kombirechner/") {
        // handle Kombirechner
        // 
        // Kombirechner is able to handle 2-5 bets
        // No need to test for count of rows, just test if an odd is empty
        // fill an array in reverse order so we can use the information from the latest line
        var latestDate = "";
        var excelLines = [];
        var isLatestLine = true;

        var event = "";
        var tipBack = "";
        var oddBack = "";

        var dropdownListBetMode = document.getElementById("select_acca_bet_mode");
        var selectedDropdownListBetMode = dropdownListBetMode.options[dropdownListBetMode.selectedIndex].text;

        stakeBack = selectedDropdownListBetMode.includes("Freiwette") ? ("=" + document.getElementById("input_back_stake").value) + "-" + document.getElementById("input_back_stake").value : document.getElementById("input_back_stake").value;

        for (let i = 5; i > 0; i--) {
            excelLines[i] = {};
            if (isLatestLine && document.getElementById('input_back_odds_' + i.toString()).value !== '') {
                isLatestLine = false; // block upcoming iterations
                latestDate = document.getElementById('input_date_' + i.toString()).value.replace(/\s-\s.*/g, '').replace(/(\d{2})\.(\d{2})\.(\d{2})/g, '$1.$2.20$3');
            }

            // collect general information from this line
            if (document.getElementById('input_back_odds_' + i.toString()).value !== '') {
                try {
                    excelLines[i].date = document.getElementById('input_date_' + i.toString()).value.replace(/\s-\s.*/g, '').replace(/(\d{2})\.(\d{2})\.(\d{2})/g, '$1.$2.20$3');
                } catch {
                    excelLines[i].date = "";
                }

                try {
                    excelLines[i].event = document.getElementById("input_event_" + i.toString()).value;
                } catch {
                    excelLines[i].event = "";
                }

                try {
                    var ergebnis = document.getElementById("input_outcome_" + i.toString()).value;
                    var mannschaft1 = excelLines[i].event.replace(/\s-\s.*/g, '');
                    excelLines[i].tipBack = ergebnis === mannschaft1 ? "1" : ergebnis === "Unentschieden" ? "X" : "2";
                    excelLines[i].tipLay = "lay" + excelLines[i].tipBack;
                } catch {
                    excelLines[i].tipBack = "";
                    excelLines[i].tipLay = "";
                }

                excelLines[i].stakeLay = document.getElementById("input_liability_" + i.toString()).value.replace(/\./g, ",");

                excelLines[i].oddBack = document.getElementById("input_back_odds_" + i.toString()).value;
                excelLines[i].oddLay = document.getElementById("input_lay_odds_" + i.toString()).value;
                excelLines[i].oddLay = "=" + excelLines[i].oddLay + "/(" + excelLines[i].oddLay + "-1)";

                if (event === "") {
                    event = excelLines[i].event;
                } else {
                    event = excelLines[i].event + " + " + event;
                }

                if (tipBack === "") {
                    tipBack = excelLines[i].tipBack;
                } else {
                    tipBack = excelLines[i].tipBack + " + " + tipBack;
                }

                if (oddBack === "") {
                    oddBack = "=" + excelLines[i].oddBack;
                } else {
                    oddBack += "*" + excelLines[i].oddBack;
                }
            }
        }

        // first line, back
        excelString += addFragmentToExcelString(latestDate);
        excelString += addFragmentToExcelString("");
        excelString += addFragmentToExcelString(category);
        excelString += addFragmentToExcelString(sport);
        excelString += addFragmentToExcelString(league);
        excelString += addFragmentToExcelString(event);
        excelString += addFragmentToExcelString("Kombi");
        excelString += addFragmentToExcelString(tipBack);
        excelString += addFragmentToExcelString(stakeBack);
        excelString += addFragmentToExcelString(oddBack);
        excelString += addFragmentToExcelString(comissionOnWinningsBack ? "j" : "");
        excelString += addFragmentToExcelString(commissionBack);
        excelString += addFragmentToExcelString(bookie);
        excelString += addFragmentToExcelString(status_offen, false, true);

        for (let i = 1; i < 6; i++) {
            // lay: all other lines
            if (excelLines[i].oddLay !== undefined) {
                excelString += addFragmentToExcelString(excelLines[i].date);
                excelString += addFragmentToExcelString("");
                excelString += addFragmentToExcelString(category);
                excelString += addFragmentToExcelString(sport);
                excelString += addFragmentToExcelString(league);
                excelString += addFragmentToExcelString(excelLines[i].event);
                excelString += addFragmentToExcelString(betType);
                excelString += addFragmentToExcelString(excelLines[i].tipLay);
                excelString += addFragmentToExcelString(excelLines[i].stakeLay);
                excelString += addFragmentToExcelString(excelLines[i].oddLay);
                excelString += addFragmentToExcelString(comissionOnWinningsLay ? "j" : "");
                excelString += addFragmentToExcelString(commissionLay);
                excelString += addFragmentToExcelString(orbitNameInExcel);
                excelString += addFragmentToExcelString(i == 1 ? status_offen : status_todo, false, true);
            }
        }
    }

    copyToClipboard(excelString);
}

// Excel needs a special format for percentages...
function translateCommissionForExcel(data) {
    var translatedData = parseFloat(data.replace(/,/g, "."));
    translatedData = translatedData / 100;
    translatedData = translatedData.toString().replace(/\./g, ",");

    return translatedData;
}

function addFragmentToExcelString(data, useTabStop = true, useLinebreak = false) {
    var tabStop = "	";
    var lineBreak = "\n";
    var returnFragment = data;
    if (useTabStop) returnFragment += tabStop;
    if (useLinebreak) returnFragment += lineBreak;

    return returnFragment;
}

function getExcelBookieForQBString(qbstring) {
    // translate image-prefix of QB to local Excel documentation
    var bookie = "";
    Object.entries(lookupBookiesExcel).forEach(([key, value]) => {
        if (qbstring.toLowerCase().startsWith(key.toLowerCase())) {
            bookie = value;
            return true;
        }
    });

    return bookie;
}

function copyToClipboard(strToCopy) {
    // Temporäres Element erzeugen
    var el = document.createElement('textarea');

    el.value = strToCopy;

    // Element nicht editierbar setzen und aus dem Fenster schieben
    el.setAttribute('readonly', '');
    el.style = { position: 'absolute', left: '-9999px' };
    document.body.appendChild(el);

    el.select();
    document.execCommand('copy');

    // Temporäres Element löschen
    document.body.removeChild(el);
}

function createCopyToExcelButton() {
    try {
        let url;
        try {
            url = window.location.pathname;
            if (url !== "/tools/rechner/" && url !== "/tools/kombirechner/") {
                return false;
            }
        } catch (e) {
            console.error("ERROR in QB copyToExcel: ", e.message);
            return false;
        }

        // compile out visible copy-Button
        var $copyButton = $('<div style="margin: 0 auto; text-align: center"><a class="qb_button" href="javascript:createAndCopyExcelStringToClipboard()" style="text-decoration:none !important; font-size:1.3em !important;">Werte für Excel kopieren</a></div>');
        $copyButton.appendTo($("#pgc-328-1-0")); // Bullenrechner
        $copyButton.appendTo($("#pgc-47791-1-0")); // Kombirechner
    } catch (e) {
        console.error("ERROR in QB copyToExcel: ", e.message);
    }
}