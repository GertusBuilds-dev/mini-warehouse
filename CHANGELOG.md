## v0.5.6-dev

- backend connection indicator toegevoegd
- scanner controleert of API bereikbaar is
- visuele status indicator (connected / offline)
- helpt debuggen bij gebruik van ngrok of externe backend

## v0.5.5-dev

- DEBUG configuratie toegevoegd
- SCAN_COOLDOWN verplaatst naar config.js
- scanner instellingen centraal configureerbaar

## v0.5.4-dev

- config.js toegevoegd voor frontend configuratie
- API_URL verplaatst uit app.js naar config.js
- frontend configuratie losgekoppeld van scanner logica
- voorbereiding voor meerdere configuraties (localhost / ngrok / production)

## v0.5.3-dev

- frontend projectstructuur bevestigd
- API endpoint configuratie voorbereid
- backend communicatie voorbereid voor gescheiden frontend/backend architectuur

## v0.5.2-dev

- projectstructuur opgesplitst in frontend en backend folders
- backend API communicatie gecontroleerd
- CORS ondersteuning voorbereid voor cross-origin requests

## v0.4.8-dev

- Excel export functie toegevoegd
- scanner transacties kunnen nu als .xlsx bestand worden gedownload
- eerste test van scanner → Excel workflow

## v0.4.7-dev

- pause/resume knop verbeterd
- icoon wisselt tussen ⏸ en ▶
- betere feedback voor scanner status
- iOS Safari compatibiliteit verbeterd

## v0.4.6-dev

- pause scanner knop verbeterd
- knop verandert nu naar Resume Scanner
- visuele indicator wanneer scanner gepauzeerd is
- scanbox kleurt oranje bij pauze

## v0.4.5-dev

- fix: showReleaseNotes functie ontbrak
- release notes viewer werkt weer

## v0.4.4-dev

- pause / resume scanner button toegevoegd
- auto scan en manual scan mode
- confirm scan knop voor manual mode
- scanner UX verbeterd voor dicht op elkaar staande barcodes

## v0.4.3-dev

- scanner cooldown toegevoegd
- scan lock voorkomt dubbele scans
- scanbox visuele status (ready / locked)
- stabielere scanner flow voor iOS

## v0.4.2-dev

- debug console toegevoegd
- scan lock verbeterd
- scanner overlay gefixt
- release notes viewer toegevoegd

## v0.4.1-dev

- scan loop bug opgelost
- alerts vervangen door debug logger

## v0.4.0-dev

- debug console toegevoegd
- scan lock toegevoegd

## v0.3.0-dev

- warehouse transacties geïntroduceerd
