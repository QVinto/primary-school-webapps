# Codex CLI Guidelines

1. **Najprv si prečítaj dokumentáciu** – otvoriť `README.md` a súbory v priečinku `docs/`, aby si pochopil účel aplikácie a aktuálne konvencie.
2. **Aktualizuj MD po zmenách** – ak úpravy kódu menia správanie, UI alebo štruktúru, uprav súvisiace Markdown súbory v rámci rovnakej úlohy.
3. **Zachovaj jednoduchosť** – projekt je navrhnutý bez build nástrojov, preto uprednostňuj riešenia v čistom HTML/CSS/JS.
4. **Rešpektuj animácie** – Anime.js je načítané z CDN; pri refaktoringu zabezpeč, aby helper funkcie fungovali aj bez knižnice (fallbacky už existujú).
5. **Testuj v prehliadači** – po väčších úpravách spusti `index.html` a manuálne otestuj generovanie príkladov, animácie a prepínanie výsledkov.
6. **Dodržuj slovenské texty** – UI aj dokumentácia používajú slovenčinu; pri rozšíreniach sa drž tohto jazyka.

> Dokument si prečítaj vždy, keď začneš pracovať na projekte.
