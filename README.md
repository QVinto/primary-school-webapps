# Primary School Webapps – Malá násobilka

Jednoduchá webová aplikácia na precvičenie malej násobilky. Aplikácia beží kompletne v prehliadači, bez backendu alebo build procesu.

## Funkcie

- Výber rozsahu čísel cez formulár priamo na stránke (polia **Od/Do**).
- Animovaný kruh s 12 číslami (1–12) na voľbu základného čísla.
- Náhodné rozloženie príkladov okolo kruhu s prevenciou vzostupného poradia a rotujúcou animáciou.
- Prepínanie zobrazenia výsledkov ako ďalší kruh bubliniek okolo násobku, s jemnou animáciou.
- Štýl vhodný pre deti (1.–4. ročník) aj dospelých, s hravými farbami a „sparkle“ pozadím.

## Použitie

1. Otvorte `index.html` v ľubovoľnom modernom prehliadači.
2. V paneli hore nastavte polia **Od / Do** a kliknite na **Nastav interval** (predvolene 0–12).
3. Kliknite na vybrané číslo vo vnútornom kruhu.
4. Použite tlačidlo **Generuj** na premiešanie príkladov.
5. Tlačidlom **Výsledky** zobrazíte alebo skryjete správne odpovede.

## Štruktúra

```
primary-school-webapps-main/
├── index.html      # HTML šablóna a layout
├── style.css       # Vizuál a rozmiestnenie prvkov
├── script.js       # Herná logika a interakcie
├── package.json    # Meta-informácie (bez závislostí)
└── docs/           # Dokumentácia projektu
```

## Vývoj

- Žiadne build kroky; stačí otvoriť HTML súbor alebo spustiť ľahký server: `python3 -m http.server`.
- Testy nie sú definované (`npm test` vypíše iba „No tests“).
- Upravte `style.css` pre vzhľad a `script.js` pre logiku.
- Animácie využívajú knižnicu [Anime.js](https://animejs.com) načítanú z CDN (pozri `<script>` v `index.html`).

## Licencia

Projekt je licencovaný pod MIT (pozri `LICENSE`).
