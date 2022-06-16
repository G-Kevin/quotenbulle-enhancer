setTimeout(() => {
  try {
    // set listener on input field to trigger formatter after every change
    $("input[id^='input_back_odds_']").on("change paste keyup propertychange input", function() {
        // console.info("event listener triggered");
        renameOrbitAndFormatlayStakeLiabilityValues(orbitLandingDomain);
    });
    $("input[id^='input_lay_odds_']").on("change paste keyup propertychange input", function() {
        // console.info("event listener triggered");
        renameOrbitAndFormatlayStakeLiabilityValues(orbitLandingDomain);
    });

    // trigger initially to format the values after loading page
    renameOrbitAndFormatlayStakeLiabilityValues(orbitLandingDomain);
  } catch (e) {
    console.error("ERROR in QB Linkchanger: ", e.message);
  }
}, 200);


function renameOrbitAndFormatlayStakeLiabilityValues(orbitLandingDomain) {
  var layStakeValues = [];
  var liabilityValues = [];
  // switch comma to dot in lay stake field to match orbit format
  $("input[id^='input_lay_stake_']").each(function (i, element) {
       layStakeValues[i] = element.value.replace(/(\d*),(\d*)/, "$1.$2");
  });
  $("input[id^='input_liability_']").each(function (i, element) {
       liabilityValues[i] = element.value.replace(/(\d*),(\d*)/, "$1.$2");
  });

  // replace Orbit domain
  var domainReplaced = $("body").html().replace(/(www\.orbitexch\.com)/g, orbitLandingDomain);
  $("body").html(domainReplaced);

  // switch comma to dot in lay stake field to match orbit format
  $("input[id^='input_lay_stake_']").each(function (i, element) {
       element.value = layStakeValues[i];
  });
  $("input[id^='input_liability_']").each(function (i, element) {
       element.value = liabilityValues[i];
  });
}