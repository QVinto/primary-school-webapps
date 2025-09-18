# App Flow a logika hry

1. **Init (`init`)**
   - Číta hodnoty z formulára (polia *Od* a *Do*).
   - Normalizuje ich (v prípade potreby prehodí poradie) a uloží do `rangeMin / rangeMax`.
   - Naplní `rangeNumbers` hodnotami od minima po maximum.
   - Zavolá `resetState()` a `renderInnerCircle()`.

2. **Vnútorný kruh (`renderInnerCircle`)**
   - Generuje čísla 1–12 do kruhu (po 30°).
   - Každá položka má `click` handler, ktorý spustí `selectBaseNumber(n)`.
   - `animateInnerNumbers()` spustí anime.js animáciu (scale + rotácia).

3. **Výber čísla (`selectBaseNumber`)**
   - Uloží `baseNumber`.
   - Skryje vnútorný kruh a zobrazí vybrané číslo v strede.
   - Aktivuje tlačidlá *Generuj* a *Výsledky*.
   - Zavolá `generateOuterNumbers()` a `animateCenterNumber()`.

4. **Generovanie príkladov (`generateOuterNumbers`)**
   - Zamieša čísla z intervalu (`shuffle`).
   - Sleduje, aby výsledný zoznam nebol striktne vzostupný (`isAscending`).
   - Vykreslí vonkajší kruh s číslami, aktivuje ho triedou `.is-visible` a pripraví skryté výsledky (`<span class="result">`).
   - Spustí `animateOuterNumbers()` (rotácia kruhu + „pop“ efekt na číslach).

5. **Zobrazenie výsledkov**
   - Tlačidlo *Výsledky* prepína triedu `.show-results` na `#outer-circle`.
   - CSS odhaľuje/skrýva `span.result`.

## Dôležité funkcie

| Funkcia        | Účel |
| -------------- | ---- |
| `shuffle(arr)` | Kopíruje a zamieša pole (Fisher–Yates). |
| `isAscending(arr)` | Deteguje čisto rastúcu postupnosť. |
| `animateInnerNumbers()` / `animateOuterNumbers()` / `animateCenterNumber()` | Obal nad anime.js, animuje jednotlivé fázy hry. |

## Potenciálne rozšírenia

- Validácia vstupu (napr. zobraziť upozornenie pri neplatnom intervale).
- Zvuková spätná väzba pri klikoch.
- Možnosť voľby iného počtu pozícií (nielen 12).
- Herný režim so stopkami alebo počítaním správnych odpovedí.
