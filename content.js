setTimeout(() => {
  try {
     var replaced = $("body").html().replace(/(www\.orbitexch\.com)/, orbitLandingDomain);
     $("body").html(replaced);
  } catch (e) {
  }
}, 200);
