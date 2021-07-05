# Quotenbulle.de Orbit linkchanger

A chrome extension to change the Orbit Exchange URL on Quotenbulle.de if you have an account through another broker (e.g. bet-football) and don't want to change the domain in Bullenrechner all the time.

## Features

- on https://\*.quotenbulle.de/tools/rechner/\* pages: checks with a delay of half a second for links to Orbit Exchange and and changes the link to the configured value (e.g. 'orbitxch.com').

## Installation

first: configure
- open config.js and change the configured url to your desires

second: normal chrome debug install

- go to the extensions menu
- enable development mode
- load unzipped extension
- navigate to cloned repo and load

third: update
- git pull
- go to extensions menu in browser
- click refresh at this extension
- reload Bullenrechner

## Browsers working

checked with
- Chrome
- Vivaldi

# Disclaimer

I am not in touch with Quotenbulle or Orbitexchange at all.
