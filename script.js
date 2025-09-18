const innerCircle = document.getElementById('inner-circle');
const outerCircle = document.getElementById('outer-circle');
const centerNumberEl = document.getElementById('center-number');
const shuffleBtn = document.getElementById('shuffle-btn');
const resultsBtn = document.getElementById('results-btn');
const rangeForm = document.getElementById('range-form');
const rangeMinInput = document.getElementById('range-min');
const rangeMaxInput = document.getElementById('range-max');
const resultCircle = document.getElementById('result-circle');

let baseNumber = null;
let rangeMin = 0;
let rangeMax = 12;
let rangeNumbers = [];

function init() {
  applyRangeFromInputs();
}

function renderInnerCircle() {
  innerCircle.innerHTML = '';
  const numbers = Array.from({ length: 12 }, (_, i) => i + 1);
  const container = innerCircle.parentElement;
  const containerSize = container ? container.clientWidth : 400;

  numbers.forEach((num, idx) => {
    const angle = (2 * Math.PI * idx) / numbers.length;
    const div = document.createElement('div');
    div.className = 'inner-number';
    div.textContent = num;
    innerCircle.appendChild(div);

    const itemSize = div.offsetWidth || 80;
    const radius = containerSize / 2 - itemSize / 2 - 36;
    const x = containerSize / 2 + radius * Math.cos(angle) - itemSize / 2;
    const y = containerSize / 2 + radius * Math.sin(angle) - itemSize / 2;
    div.style.left = `${x}px`;
    div.style.top = `${y}px`;
    div.addEventListener('click', () => selectBaseNumber(num));
  });

  requestAnimationFrame(() => animateInnerNumbers());
}

function selectBaseNumber(num) {
  baseNumber = num;
  innerCircle.style.display = 'none';
  centerNumberEl.textContent = num;
  centerNumberEl.style.display = 'flex';
  animateCenterNumber();
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
  outerCircle.classList.add('is-visible');
  resultsBtn.textContent = 'Ukáž výsledky';
  outerCircle.innerHTML = '';
  resultCircle.innerHTML = '';
  resultCircle.classList.remove('is-visible');

  const container = outerCircle.parentElement;
  const containerSize = container ? container.clientWidth : 400;

  shuffled.forEach((num, idx) => {
    const angle = (2 * Math.PI * idx) / shuffled.length;
    const div = document.createElement('div');
    div.className = 'outer-number';
    div.innerHTML = `${num}<span class="result">${num * baseNumber}</span>`;
    outerCircle.appendChild(div);

    const itemSize = div.offsetWidth || 90;
    const radius = containerSize / 2 - itemSize / 2 - 12;
    const x = containerSize / 2 + radius * Math.cos(angle) - itemSize / 2;
    const y = containerSize / 2 + radius * Math.sin(angle) - itemSize / 2;
    div.style.left = `${x}px`;
    div.style.top = `${y}px`;

    const resultDiv = document.createElement('div');
    resultDiv.className = 'result-number';
    resultDiv.textContent = num * baseNumber;
    resultCircle.appendChild(resultDiv);

    const resultSize = resultDiv.offsetWidth || itemSize;
    const resultRadius = containerSize / 2 - resultSize / 2 + 48;
    const rx = containerSize / 2 + resultRadius * Math.cos(angle) - resultSize / 2;
    const ry = containerSize / 2 + resultRadius * Math.sin(angle) - resultSize / 2;
    resultDiv.style.left = `${rx}px`;
    resultDiv.style.top = `${ry}px`;
  });

  requestAnimationFrame(() => animateOuterNumbers());
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
  if (!resultCircle.childElementCount) {
    return;
  }
  const show = resultCircle.classList.toggle('is-visible');
  resultsBtn.textContent = show ? 'Skry výsledky' : 'Ukáž výsledky';
  if (show) {
    animateResultNumbers();
  }
});

rangeForm.addEventListener('submit', (event) => {
  event.preventDefault();
  applyRangeFromInputs();
});

function applyRangeFromInputs() {
  const parsedMin = parseInt(rangeMinInput.value, 10);
  const parsedMax = parseInt(rangeMaxInput.value, 10);

  if (Number.isNaN(parsedMin) || Number.isNaN(parsedMax)) {
    rangeMin = 0;
    rangeMax = 12;
  } else if (parsedMin > parsedMax) {
    rangeMin = parsedMax;
    rangeMax = parsedMin;
  } else {
    rangeMin = parsedMin;
    rangeMax = parsedMax;
  }

  rangeMinInput.value = rangeMin;
  rangeMaxInput.value = rangeMax;

  rangeNumbers = [];
  for (let i = rangeMin; i <= rangeMax; i++) {
    rangeNumbers.push(i);
  }

  resetState();
  renderInnerCircle();
}

function resetState() {
  baseNumber = null;
  innerCircle.style.display = 'block';
  centerNumberEl.textContent = '';
  centerNumberEl.style.display = 'none';
  shuffleBtn.disabled = true;
  resultsBtn.disabled = true;
  resultsBtn.textContent = 'Ukáž výsledky';
  outerCircle.innerHTML = '';
  outerCircle.classList.remove('show-results');
  outerCircle.classList.remove('is-visible');
  resultCircle.innerHTML = '';
  resultCircle.classList.remove('is-visible');
}

function animateInnerNumbers() {
  if (typeof anime === 'undefined') {
    return;
  }
  anime.remove('.inner-number');
  anime({
    targets: '.inner-number',
    scale: [0, 1],
    rotate: ['-1turn', '0turn'],
    opacity: [0, 1],
    easing: 'easeOutBack',
    duration: 900,
    delay: anime.stagger(60, { from: 'center' })
  });
}

function animateOuterNumbers() {
  if (typeof anime === 'undefined') {
    return;
  }
  anime.remove('#outer-circle');
  anime({
    targets: '#outer-circle',
    rotate: [0, 360],
    easing: 'easeInOutSine',
    duration: 2400
  });

  anime.remove('.outer-number');
  anime({
    targets: '.outer-number',
    scale: [0, 1],
    opacity: [0, 1],
    translateY: [10, 0],
    easing: 'easeOutBack',
    duration: 800,
    delay: anime.stagger(80)
  });
}

function animateCenterNumber() {
  if (typeof anime === 'undefined') {
    return;
  }
  anime.remove('#center-number');
  anime({
    targets: '#center-number',
    scale: [0.4, 1],
    rotate: ['-0.25turn', '0turn'],
    easing: 'easeOutElastic(1, .6)',
    duration: 1200
  });
}

function animateResultNumbers() {
  if (typeof anime === 'undefined') {
    return;
  }
  anime.remove('.result-number');
  anime({
    targets: '.result-number',
    scale: [0, 1],
    opacity: [0, 1],
    easing: 'easeOutBack',
    duration: 700,
    delay: anime.stagger(70)
  });
}

init();
