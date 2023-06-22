# Quotenbulle.de Enhancer

An extension to add some extra non-exististing functionality to Quotenbulle.de.

Initially this add-on was made to change the Orbit Exchange URL on Quotenbulle.de if you have an account through another broker (e.g. bet-football) and don't want to change the domain in Bullenrechner all the time.

## Features

- on https://\*.quotenbulle.de/tools/rechner/\* pages: checks with a delay of 200ms for links to Orbit Exchange and and changes the link to the configured value (e.g. 'orbitxch.com').
- on https://\*.quotenbulle.de/tools/kombirechner/\* pages: checks with a delay of 200ms for links to Orbit Exchange and and changes the link to the configured value (e.g. 'orbitxch.com').
- on https://\*.quotenbulle.de/tools/rechner/\* pages: adds a button to the website for easy copy of all the information to the Wettmanager Excel (worksheet Übersicht)
- on https://\*.quotenbulle.de/tools/kombirechner/\* pages: adds a button to the website for easy copy of all the information to the Wettmanager Excel (worksheet Übersicht)
- on https://\*.quotenbulle.de/tools/kombirechner/\* pages: changed format of euro values to orbit compatible format for easy copy&paste

## Installation

first: configure
- open config.js and change the configured values to your desires

second: normal chrome debug install

- go to the extensions menu
- enable development mode
- load unzipped extension
- navigate to cloned repo and load

second: great expense firefox install

- install firefox development version, no chance in normal version
- zip the folder, take care there is no root folder in the zip
- rename zip to xpi
- go to Addons, click gear, install from file and select xpi

OR

- go to Addons, click gear, install from file and select xpi in firefox folder from this repository or drag&drop this xpi

third: update
- git pull
- go to extensions menu in browser
- click refresh at this extension (chrome)
- go to Addons, click gear, install from file and select xpi or drag&drop xpi (firefox)

## Browsers working

checked with
- Chrome
- Vivaldi
- Firefox Developer Edition

# Disclaimer

I am not in touch with Quotenbulle.de or Orbit Exchange at all.

# Other
## add jQuery to developer console
    var script = document.createElement('script');
    script.src = "https://code.jquery.com/jquery-3.6.0.min.js";document.getElementsByTagName('head')[0].appendChild(script);