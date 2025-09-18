const innerCircle = document.getElementById('inner-circle');
const outerCircle = document.getElementById('outer-circle');
const centerNumberEl = document.getElementById('center-number');
const shuffleBtn = document.getElementById('shuffle-btn');
const resultsBtn = document.getElementById('results-btn');

let baseNumber = null;
let rangeMin = 0;
let rangeMax = 12;
let rangeNumbers = [];

function init() {
  rangeMin = parseInt(prompt('Začni od čísla:', '0'), 10);
  rangeMax = parseInt(prompt('Po číslo:', '12'), 10);
  if (isNaN(rangeMin) || isNaN(rangeMax) || rangeMin > rangeMax) {
    rangeMin = 0;
    rangeMax = 12;
  }
  rangeNumbers = [];
  for (let i = rangeMin; i <= rangeMax; i++) {
    rangeNumbers.push(i);
  }
  renderInnerCircle();
}

function renderInnerCircle() {
  innerCircle.innerHTML = '';
  const numbers = Array.from({ length: 12 }, (_, i) => i + 1);
  const radius = 120;
  const center = 200;
  numbers.forEach((num, idx) => {
    const angle = (2 * Math.PI * idx) / numbers.length;
    const x = center + radius * Math.cos(angle) - 20;
    const y = center + radius * Math.sin(angle) - 20;
    const div = document.createElement('div');
    div.className = 'inner-number';
    div.textContent = num;
    div.style.left = x + 'px';
    div.style.top = y + 'px';
    div.addEventListener('click', () => selectBaseNumber(num));
    innerCircle.appendChild(div);
  });
}

function selectBaseNumber(num) {
  baseNumber = num;
  innerCircle.style.display = 'none';
  centerNumberEl.textContent = num;
  centerNumberEl.style.display = 'block';
  shuffleBtn.disabled = false;
  resultsBtn.disabled = false;
  generateOuterNumbers();
}

function generateOuterNumbers() {
  let shuffled = shuffle(rangeNumbers);
  while (isAscending(shuffled)) {
    shuffled = shuffle(rangeNumbers);
  }
  outerCircle.classList.remove('show-results');
  resultsBtn.textContent = 'Výsledky';
  outerCircle.innerHTML = '';
  const radius = 180;
  const center = 200;
  shuffled.forEach((num, idx) => {
    const angle = (2 * Math.PI * idx) / shuffled.length;
    const x = center + radius * Math.cos(angle) - 20;
    const y = center + radius * Math.sin(angle) - 20;
    const div = document.createElement('div');
    div.className = 'outer-number';
    div.style.left = x + 'px';
    div.style.top = y + 'px';
    div.innerHTML = `${num}<span class="result">${num * baseNumber}</span>`;
    outerCircle.appendChild(div);
  });
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function isAscending(arr) {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] <= arr[i - 1]) {
      return false;
    }
  }
  return true;
}

shuffleBtn.addEventListener('click', generateOuterNumbers);
resultsBtn.addEventListener('click', () => {
  const show = outerCircle.classList.toggle('show-results');
  resultsBtn.textContent = show ? 'Skry výsledky' : 'Výsledky';
});

init();
