function createCopyToExcelButton() {
    try {
        let url;
        try {
            url = window.location.pathname;
            if (url !== "/tools/rechner/") {
                return false;
            }
        } catch (e) {
            console.error("ERROR in QB copyToExcel: ", e.message);
            return false;
        }
        // as plugins are executed in an isolated environment, we have to append our custom functions to the body
        var $functionsToAppend = $('<script type="text/javascript">'
            + 'var orbitLandingDomain = "' + orbitLandingDomain + '";'
            + 'var orbitCommission = "' + orbitCommission + '";'
            + 'var orbitCommissionOnWinnings = "' + orbitCommissionOnWinnings + '";'
            + 'var orbitNameInExcel = "' + orbitNameInExcel + '";'
            + addFragmentToExcelString.toString()
            + copyStringToClipboard.toString()
            + createAndCopyExcelStringToClipboard.toString()
            + translateCommissionForExcel.toString()
            + renameOrbitDomain.toString()
            + "renameOrbitDomain(orbitLandingDomain);" // call to replace the orbit domain
            + '</script>');
        $functionsToAppend.appendTo($("body"));

        // compile out visible copy-Button
        var $copyButton = $('<div style="margin: 0 auto; text-align: center"><a class="qb_button" href="javascript:createAndCopyExcelStringToClipboard()" style="text-decoration:none !important; font-size:1.3em !important;">Werte für Excel kopieren</a></div>');
        $copyButton.appendTo($("#pgc-328-1-0"));
    } catch (e) {
        console.error("ERROR in QB copyToExcel: ", e.message);
    }
}

function copyStringToClipboard(str) {
   // Temporäres Element erzeugen
   var el = document.createElement('textarea');
   // Den zu kopierenden String dem Element zuweisen
   el.value = str;
   // Element nicht editierbar setzen und aus dem Fenster schieben
   el.setAttribute('readonly', '');
   el.style = {position: 'absolute', left: '-9999px'};
   document.body.appendChild(el);
   // Text innerhalb des Elements auswählen
   el.select();
   // Ausgewählten Text in die Zwischenablage kopieren
   document.execCommand('copy');
   // Temporäres Element löschen
   document.body.removeChild(el);
}

function createAndCopyExcelStringToClipboard(orbitLandingDomain) {
    try {
        var date = document.getElementById("calc_date").innerHTML.replace(/\s-\s.*/g, '').replace(/(\d{2})\.(\d{2})\.(\d{2})/g, '$1.$2.20$3');
    } catch {
        var date = "";
    }
    var category = "Pre-Game";
    var sport = "Fußball";
    var league = "";
    try {
        var event = document.getElementById("calc_event").getElementsByTagName('strong')[0].innerHTML;
    } catch {
        var event = "";
    }
    var betType = "1X2";

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

    var dropdownListCommissionBack = document.getElementById("tax_germany");
    var comissionOnWinningsBack = dropdownListCommissionBack.options[dropdownListCommissionBack.selectedIndex].text.includes("vom Nettogewinn") ? "j" : "";

    var comissionOnWinningsLay = orbitCommissionOnWinnings;

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

    var bookie = "";
    var status = "Offen";

    var excelString = "";
    // compile clipboard string
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
    excelString += addFragmentToExcelString(status, false, true);

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
    excelString += addFragmentToExcelString(status, false);

    copyStringToClipboard(excelString);
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

function formatLayStakeLiabilityValues(orbitLandingDomain) {
    try {
        var layStakeValues = [];
        var liabilityValues = [];
        // switch comma to dot in lay stake field to match orbit format
        $("input[id^='input_lay_stake_']").each(function (i, element) {
             layStakeValues[i] = element.value.replace(/(\d*),(\d*)/, "$1.$2");
        });
        $("input[id^='input_liability_']").each(function (i, element) {
             liabilityValues[i] = element.value.replace(/(\d*),(\d*)/, "$1.$2");
        });
        $("input[id^='input_lay_stake_']").each(function (i, element) {
             element.value = layStakeValues[i];
        });
        $("input[id^='input_liability_']").each(function (i, element) {
             element.value = liabilityValues[i];
        });
    } catch (e) {
        console.error("ERROR in QB layStakeFormatter: ", e.message);
        return false;
    }
}

function renameOrbitDomain(orbitLandingDomain) {
    // replace Orbit domain with configured url
    document.getElementById("exchange_type_img").parentNode.outerHTML = document.getElementById("exchange_type_img").parentNode.outerHTML.replace(/(www\.orbitexch\.com)/g, orbitLandingDomain);
}

setTimeout(() => {
    try {
        createCopyToExcelButton();

        if (window.location.pathname === "/tools/kombirechner/") {
            // set listener on input field to trigger formatter after every change
            $("input[id^='input_back_odds_']").on("change paste keyup propertychange input", function() {
                // console.info("event listener triggered");
                formatLayStakeLiabilityValues(orbitLandingDomain);
            });
            $("input[id^='input_lay_odds_']").on("change paste keyup propertychange input", function() {
                // console.info("event listener triggered");
                formatLayStakeLiabilityValues(orbitLandingDomain);
            });

            // trigger initially to format the values after loading page
            formatLayStakeLiabilityValues(orbitLandingDomain);
        }
    } catch (e) {
        console.error("ERROR in QB Linkchanger: ", e.message);
    }
}, 100);