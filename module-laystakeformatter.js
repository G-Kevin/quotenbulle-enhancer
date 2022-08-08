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