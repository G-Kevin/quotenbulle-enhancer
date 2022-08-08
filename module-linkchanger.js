function renameOrbitDomain(orbitLandingDomain) {
    // replace Orbit domain with configured url
    document.getElementById("exchange_type_img").parentNode.outerHTML = document.getElementById("exchange_type_img").parentNode.outerHTML.replace(/(www\.orbitexch\.com)/g, orbitLandingDomain);
}